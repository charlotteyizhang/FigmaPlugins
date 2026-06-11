interface ConvertMsg {
  type: "convertSvgColors";
  native: boolean;
}

export type SvgMessage = ConvertMsg;

export const SVG_MESSAGE_TYPES = new Set<string>(["convertSvgColors"]);

const rgbaToHex = (v: RGBA): string => {
  const R = Math.round(v.r * 255);
  const G = Math.round(v.g * 255);
  const B = Math.round(v.b * 255);
  const A = Math.round(v.a * 255);
  const hex = (n: number) => n.toString(16).padStart(2, "0").toUpperCase();
  if (A === 255) return `#${hex(R)}${hex(G)}${hex(B)}`;
  return `#${hex(R)}${hex(G)}${hex(B)}${hex(A)}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resolveColor = async (value: any): Promise<string | undefined> => {
  if (typeof value === "object" && value !== null && "r" in value) {
    return rgbaToHex(value as RGBA);
  }
  if (
    typeof value === "object" &&
    value !== null &&
    (value as VariableAlias).type === "VARIABLE_ALIAS"
  ) {
    const alias = value as VariableAlias;
    const variable = await figma.variables.getVariableByIdAsync(alias.id);
    if (variable) {
      const firstValue = Object.values(variable.valuesByMode)[0];
      return resolveColor(firstValue);
    }
  }
  return undefined;
};

const getColorVariable = async (
  v: VariableAlias,
  list: Record<string, string>,
): Promise<{ color: string; name: string } | undefined> => {
  const variable = await figma.variables.getVariableByIdAsync(v.id);
  if (variable === null) return undefined;

  const variableName = variable.name;
  const variableValue = Object.values(variable.valuesByMode);

  if (list[variableName] !== undefined || variableValue.length === 0)
    return undefined;

  const color = await resolveColor(variableValue[0]);
  if (color === undefined) return undefined;

  return { color, name: variableName };
};

const collectColors = async (
  node: SceneNode,
  list: Record<string, string>,
): Promise<void> => {
  if ("children" in node) {
    await Promise.all(node.children.map((child) => collectColors(child, list)));
    return;
  }
  if ("fills" in node && node.boundVariables?.fills) {
    await Promise.all(
      node.boundVariables.fills.map(async (v) => {
        const result = await getColorVariable(v, list);
        if (result !== undefined && list[result.name] === undefined) {
          list[result.name] = result.color;
        }
      }),
    );
  }
};

// Figma exports hex colors as lowercase 6-digit (#rrggbb); alpha is emitted as a
// separate fill-opacity attribute, so drop any 8-digit alpha suffix for matching.
const normalizeHex = (hex: string): string => {
  const h = hex.toLowerCase();
  return h.length === 9 ? h.slice(0, 7) : h;
};

const toPascalCase = (name: string): string => {
  const words = name
    .replace(/[^a-zA-Z0-9]/g, " ")
    .split(" ")
    .filter((w) => w.length > 0);
  const pascal = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
  // JSX component names must start with a letter.
  return /^[A-Za-z]/.test(pascal) ? pascal : `SvgComponent`;
};

export const handleSvgMessage = async (msg: SvgMessage): Promise<void> => {
  if (msg.type === "convertSvgColors") {
    const node = figma.currentPage.selection[0];
    if (node === undefined) {
      figma.ui.postMessage({
        kind: "svg",
        error: "Select a node to convert.",
      });
      return;
    }

    // Build variable-name -> hex map from the node being exported.
    const list: Record<string, string> = {};
    await collectColors(node, list);

    // Turn the color map into SVGR's replaceAttrValues option:
    //   { "#1a1a1a": "{color[theme].iconPrimary}" }
    // SVGR's replaceAttrValues matching is case-sensitive. Figma exports
    // lowercase hex, but emit both cases to be robust across export variations.
    const replaceAttrValues: Record<string, string> = {};
    for (const [name, hex] of Object.entries(list)) {
      const names = name.split("/");
      const token = msg.native
        ? `${names[0]}[theme].${names[1]}`
        : `${names[0]}.${names[1]}`;
      const lower = normalizeHex(hex);
      replaceAttrValues[lower] = `{${token}}`;
      replaceAttrValues[lower.toUpperCase()] = `{${token}}`;
    }

    const svg = await node.exportAsync({ format: "SVG_STRING" });
    const componentName = toPascalCase(node.name);

    figma.ui.postMessage({
      kind: "svg",
      svg,
      replaceAttrValues,
      native: msg.native,
      componentName,
    });
  }
};
