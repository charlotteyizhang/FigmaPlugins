interface ConvertMsg {
  type: "convertSvgColors";
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

export const handleSvgMessage = async (msg: SvgMessage): Promise<void> => {
  if (msg.type === "convertSvgColors") {
    const list: Record<string, string> = {};
    await Promise.all(
      figma.currentPage.selection.map((node) => collectColors(node, list)),
    );

    const str = Object.entries(list)
      .map(([name, value]) => {
        const names = name.split("/");
        return `${value}={${names[0]}[theme].${names[1]}}`;
      })
      .join(",");

    figma.ui.postMessage({ data: str, kind: "svg" });
  }
};
