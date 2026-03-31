import { createCode, createColor } from "./helper";

export type QueryKind = "lunarCustomer" | "WL" | "webApp";

interface GenerateMsg {
  type: "generate";
  value: QueryKind;
}
interface GenerateTextENMsg {
  type: "generateTextEN";
}
interface AddSpacingMsg {
  type: "addSpacing";
  value: string | undefined;
}
interface AddVerticalPaddingMsg {
  type: "addVerticalPadding";
  value: string | undefined;
}
interface AddHorizontalPaddingMsg {
  type: "addHorizontalPadding";
  value: string | undefined;
}
interface AddBorderRadiusMsg {
  type: "addBorderRadius";
  value: string | undefined;
}
interface AddIconSizeMsg {
  type: "addIconSize";
  value: string | undefined;
}

export type ReactMessage =
  | GenerateMsg
  | GenerateTextENMsg
  | AddSpacingMsg
  | AddVerticalPaddingMsg
  | AddHorizontalPaddingMsg
  | AddBorderRadiusMsg
  | AddIconSizeMsg;

export const REACT_MESSAGE_TYPES = new Set<string>([
  "generate",
  "generateTextEN",
  "addSpacing",
  "addVerticalPadding",
  "addHorizontalPadding",
  "addBorderRadius",
  "addIconSize",
]);

export const handleReactMessage = async (msg: ReactMessage): Promise<void> => {
  if (msg.type === "generate") {
    let str = "";
    const queryKind = msg.value;
    const localCollections =
      await figma.variables.getLocalVariableCollectionsAsync();

    for (const node of figma.currentPage.selection) {
      str += await getChildrenView({
        node,
        acc: str,
        localCollections,
        firstElement: true,
        queryKind,
      });
    }

    figma.ui.postMessage({ data: str, kind: "msg" });
  } else if (msg.type === "generateTextEN") {
    let str = "";
    for (const node of figma.currentPage.selection) {
      if (node.type === "TEXT") {
        str += getText(node, str, true);
      }
    }
    figma.ui.postMessage({ data: str, kind: "msg" });
  } else if (
    msg.type === "addSpacing" ||
    msg.type === "addVerticalPadding" ||
    msg.type === "addHorizontalPadding"
  ) {
    const libraryCollections =
      await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();

    const lunarSpacing = libraryCollections.find((c) => c.name === "spacing");
    const lunarSpacingKey = lunarSpacing?.key;

    if (lunarSpacingKey === undefined) {
      figma.ui.postMessage({
        data: "Lunar Design System Spacing collection not found.",
        kind: "msg",
      });
      return;
    }

    const variables =
      await figma.teamLibrary.getVariablesInLibraryCollectionAsync(
        lunarSpacingKey,
      );

    if (msg.value === undefined) {
      figma.ui.postMessage({
        data: variables,
        type: msg.type,
        kind: "variables",
      });
    } else {
      const spacingVariable = variables.find((v) => v.key === msg.value);
      if (spacingVariable === undefined) {
        figma.ui.postMessage({
          data: `Spacing variable "${msg.value}" not found.`,
          kind: "msg",
        });
        return;
      }

      const importedVariable = await figma.variables.importVariableByKeyAsync(
        spacingVariable.key,
      );

      for (const node of figma.currentPage.selection) {
        if (node.type === "FRAME" || node.type === "COMPONENT") {
          if (msg.type === "addSpacing") {
            node.setBoundVariable("itemSpacing", importedVariable);
          } else if (msg.type === "addHorizontalPadding") {
            node.setBoundVariable("paddingLeft", importedVariable);
            node.setBoundVariable("paddingRight", importedVariable);
          } else {
            node.setBoundVariable("paddingTop", importedVariable);
            node.setBoundVariable("paddingBottom", importedVariable);
          }
        }
      }
    }
  } else if (msg.type === "addBorderRadius") {
    const libraryCollections =
      await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();

    const lunarBorderRadius = libraryCollections.find(
      (c) => c.name === "borderRadius",
    );
    const lunarBorderRadiusKey = lunarBorderRadius?.key;

    if (lunarBorderRadiusKey === undefined) {
      figma.ui.postMessage({
        data: "Lunar Design System Border Radius collection not found.",
        kind: "msg",
      });
      return;
    }

    const variables =
      await figma.teamLibrary.getVariablesInLibraryCollectionAsync(
        lunarBorderRadiusKey,
      );

    if (msg.value === undefined) {
      figma.ui.postMessage({
        data: variables,
        type: msg.type,
        kind: "variables",
      });
    } else {
      const borderRadiusVariable = variables.find((v) => v.key === msg.value);
      if (borderRadiusVariable === undefined) {
        figma.ui.postMessage({
          data: `Border Radius variable "${msg.value}" not found.`,
          kind: "msg",
        });
        return;
      }

      const importedVariable = await figma.variables.importVariableByKeyAsync(
        borderRadiusVariable.key,
      );

      for (const node of figma.currentPage.selection) {
        node.setBoundVariable("topLeftRadius", importedVariable);
        node.setBoundVariable("topRightRadius", importedVariable);
        node.setBoundVariable("bottomRightRadius", importedVariable);
        node.setBoundVariable("bottomLeftRadius", importedVariable);
      }

      figma.ui.postMessage({
        data: `Border Radius variable "${msg.value}" is set.`,
        kind: "msg",
      });
    }
  } else if (msg.type === "addIconSize") {
    const libraryCollections =
      await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();

    const lunarIconSize = libraryCollections.find(
      (c) => c.name === "iconSizes",
    );
    const lunarIconSizeKey = lunarIconSize?.key;

    if (lunarIconSizeKey === undefined) {
      figma.ui.postMessage({
        data: "Lunar Design System Icon Size collection not found.",
        kind: "msg",
      });
      return;
    }

    const variables =
      await figma.teamLibrary.getVariablesInLibraryCollectionAsync(
        lunarIconSizeKey,
      );

    if (msg.value === undefined) {
      figma.ui.postMessage({
        data: variables,
        type: msg.type,
        kind: "variables",
      });
    } else {
      const iconSizeVariable = variables.find((v) => v.key === msg.value);
      if (iconSizeVariable === undefined) {
        figma.ui.postMessage({
          data: `Icon Size variable "${msg.value}" not found.`,
          kind: "msg",
        });
        return;
      }

      const importedVariable = await figma.variables.importVariableByKeyAsync(
        iconSizeVariable.key,
      );

      for (const node of figma.currentPage.selection) {
        node.setBoundVariable("width", importedVariable);
        node.setBoundVariable("height", importedVariable);
      }

      figma.ui.postMessage({
        data: `Icon Size variable "${msg.value}" is set.`,
        kind: "msg",
      });
    }
  }
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const findTextNode = (node: SceneNode): TextNode | null => {
  if (node.type === "TEXT") return node as TextNode;
  if ("children" in node) {
    for (const child of node.children) {
      const found = findTextNode(child);
      if (found) return found;
    }
  }
  return null;
};

interface ChildViewProps {
  node: SceneNode;
  acc: string;
  localCollections: Array<VariableCollection>;
  firstElement: boolean;
  queryKind: QueryKind;
}

const getChildrenView = (props: ChildViewProps): Promise<string> => {
  const recurse = async (x: ChildViewProps): Promise<string> => {
    if (!x.node.visible) return x.acc;

    if (
      (x.node.type === "FRAME" || x.node.type === "COMPONENT") &&
      "children" in x.node
    ) {
      const variableId = await figma.variables.getVariableByIdAsync(
        x.node.boundVariables?.itemSpacing?.id ?? "",
      );
      const spacingId = x.node.boundVariables?.itemSpacing?.id;

      const gapStr =
        spacingId !== undefined
          ? `gap: spacing.${variableId?.name ?? "default"},`
          : "";

      const containerStyle =
        x.node.inferredAutoLayout?.layoutMode === "HORIZONTAL"
          ? `flexDirection: "row",${
              x.node.inferredAutoLayout?.primaryAxisAlignItems ===
              "SPACE_BETWEEN"
                ? `justifyContent: "space-between",`
                : ""
            } alignItems: "center", ${gapStr}`
          : gapStr;

      const firstChild = x.node.children[0];
      const firstElementIsCard =
        hasCardTitleWord(firstChild.name) && firstChild.type === "INSTANCE";

      let content = "";
      for (
        let idx = firstElementIsCard ? 1 : 0;
        idx < x.node.children.length;
        idx++
      ) {
        content = await recurse({
          node: x.node.children[idx],
          acc: content,
          localCollections: x.localCollections,
          firstElement: idx === 0,
          queryKind: x.queryKind,
        });
      }

      const isWeb = x.queryKind === "webApp";

      // Web defaults to flex-direction: row, so always inject display+column.
      // For HORIZONTAL nodes the containerStyle already has flexDirection: "row"
      // which overrides the column default.
      const webStyle =
        x.node.inferredAutoLayout?.layoutMode === "HORIZONTAL"
          ? `display: "flex", ${containerStyle}`
          : `display: "flex", flexDirection: "column"${containerStyle ? `, ${containerStyle}` : ""}`;

      const el = isWeb
        ? `<div className={css({${webStyle}})}>${content}</div>`
        : containerStyle === undefined
          ? x.firstElement
            ? `<View>${content}</View>`
            : content
          : `<View style={{${containerStyle ?? ""}}}>${content}</View>`;

      const env =
        x.queryKind === "lunarCustomer"
          ? "appAppearanceCtx={appAppearanceCtx}"
          : x.queryKind === "WL"
            ? "appCtx={appCtx}"
            : "";

      if (firstElementIsCard) {
        const textNode = findTextNode(firstChild);
        if (textNode !== null && textNode.type === "TEXT") {
          const translation = getTranslationByLayername(
            textNode,
            x.queryKind === "webApp" ? "react" : "native",
          );
          return (
            x.acc +
            `<Card${env ? ` ${env}` : ""} title={{text:${translation}, showIconRight:${firstChild.componentProperties?.["isLink"]?.value}}}>${content}</Card>`
          );
        }
        const formatStr =
          x.queryKind === "webApp" ? "language" : "userLocale.userLanguage";
        return (
          x.acc +
          `<Card${env ? ` ${env}` : ""} title={{text:translations[${formatStr}].${toLowercaseFirstLetterCamelCase(
            firstChild.componentProperties?.["Text#3945:0"]?.value.toString() ??
              "",
          )}, showIconRight:${firstChild.componentProperties?.["isLink"]?.value}}}>${content}</Card>`
        );
      } else {
        return x.acc + el;
      }
    } else {
      let content = "";

      if (x.node.type === "TEXT") {
        content = (await getTextKind(x.node, x.queryKind)) ?? "";
      } else if (x.node.type === "INSTANCE") {
        if (hasIconWord(x.node.name)) {
          const iconSize = await getIconSize(x.node);
          const colorStr = createColor(
            x.queryKind === "webApp" ? "react" : "native",
            "textColors",
            "default",
          );
          content = `<Icon ${colorStr} icon="${replaceIconWord(x.node.name)}" size={${iconSize ?? undefined}}/>`;
        } else if (x.node.name.includes("Button")) {
          const buttonKind = x.node.componentProperties?.["Type"]?.value ?? "";
          const textNode = findTextNode(x.node);

          if (textNode !== null && textNode.type === "TEXT") {
            const translation = getTranslationByLayername(
              textNode,
              x.queryKind === "webApp" ? "react" : "native",
            );
            const env =
              x.queryKind === "lunarCustomer"
                ? "theme={theme} responsive={responsive}"
                : x.queryKind === "WL"
                  ? "theme={appCtx.theme}"
                  : "";
            content = `<${x.node.name}${env ? ` ${env}` : ""} ${buttonKind === undefined ? "" : `kind="${buttonKind}"`} text={${translation}} onPress={()=>undefined}/>`;
          } else {
            const icon = x.node.findChild((n) =>
              n.name.toLocaleLowerCase().includes("icon"),
            );
            if (icon !== null) {
              content = ` <IconButton theme={theme} onPress={() =>undefined} icon="Close" />`;
            }
          }
        } else {
          const nodeName = x.node.name;
          const env =
            x.queryKind === "lunarCustomer"
              ? "appAppearanceCtx={appAppearanceCtx}"
              : x.queryKind === "WL"
                ? "appCtx={appCtx}"
                : "";

          // Use exposed component properties (TEXT type) for prop names.
          // For each, find the matching text node inside to check for a variable binding.
          const componentTextProps = Object.entries(
            x.node.componentProperties ?? {},
          ).filter(([, prop]) => prop.type === "TEXT");

          const allTextNodes = x.node.findAllWithCriteria({
            types: ["TEXT"],
          }) as TextNode[];

          const resolvedProps = componentTextProps.map(([key, prop]) => {
            // "Label#1234:0" → "label"
            const propName = toLowercaseFirstLetterCamelCase(
              key.replace(/#.*$/, ""),
            );
            const value = prop.value as string;

            // Find the text node whose current content matches this property value
            const textNode = allTextNodes.find((n) => n.characters === value);
            if (textNode !== undefined) {
              const translationStr = createCode(
                x.queryKind === "webApp" ? "react" : "native",
                textNode,
              );
              return `${propName}={${translationStr}}`;
            }
            return `${propName}="${value}"`;
          });

          const propsStr =
            resolvedProps.length > 0 ? ` ${resolvedProps.join(" ")}` : "";
          content = `<${nodeName.charAt(0).toUpperCase() + nodeName.slice(1)}${env ? ` ${env}` : ""}${propsStr} />`;
        }
      } else {
        content = `<>${x.node.name}, ${x.node.type}</>`;
      }

      return x.acc + content;
    }
  };

  return recurse(props);
};

const getTranslationByLayername = (
  node: TextNode,
  formatType: "native" | "react",
): string => {
  if (node.name[0] === "#") {
    return createCode(formatType, node);
  }
  const formatStr =
    formatType === "react" ? "language" : "userLocale.userLanguage";
  return `translations[${formatStr}].${toLowercaseFirstLetterCamelCase(node.characters)}`;
};

const getTextKind = async (
  node: TextNode,
  queryKind: QueryKind,
): Promise<string | undefined> => {
  const styleId = node.textStyleId;
  let figmaStyle: BaseStyle | null = null;
  if (typeof styleId === "string") {
    figmaStyle = await figma.getStyleByIdAsync(`${styleId}`);
  }
  const textKind = figmaStyle?.name;
  const nodeColorIds = node.boundVariables?.fills;

  let colorName: string | undefined;
  if (nodeColorIds !== undefined && nodeColorIds.length > 0) {
    const variable = await figma.variables.getVariableByIdAsync(
      nodeColorIds[0].id,
    );
    colorName = variable?.name ?? undefined;
  }

  const env =
    queryKind === "lunarCustomer"
      ? "responsive={responsive}"
      : queryKind === "WL"
        ? "appCtx={appCtx}"
        : "";

  if (textKind === undefined) {
    console.warn("textKind===undefined");
    return `<P${env ? ` ${env}` : ""} kind={undefined} />`;
  } else if (colorName === undefined) {
    console.warn("colorName===undefined");
    return `<P${env ? ` ${env}` : ""} color={undefined} />`;
  } else {
    const texts = textKind.split("/");
    const text = texts[0];
    const text2 = texts[1];
    const color = colorName.split("/");
    const translation = createCode(
      queryKind === "webApp" ? "react" : "native",
      node,
    );

    const colorStr = createColor(
      queryKind === "webApp" ? "react" : "native",
      color[0],
      color[1],
    );

    if (text.includes("Heading")) {
      return `<${text2} ${colorStr}>{${translation}}</${text2}>`;
    } else {
      const kind =
        text2.toLowerCase() === "medium"
          ? undefined
          : text.charAt(0).toLowerCase() +
            text.slice(1) +
            toCapitalFirstLetterCamelCase(texts[1]);
      return `<P${env ? ` ${env}` : ""} ${kind === undefined ? "" : `kind="${kind}"`} ${colorStr}>{${translation}}</P>`;
    }
  }
};

const toCapitalFirstLetterCamelCase = (text: string): string => {
  const words = text
    .replace(/^[\d:]+/, "")
    .replace(/[^a-zA-Z0-9]/g, " ")
    .split(" ");
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
};

const toLowercaseFirstLetterCamelCase = (text: string): string => {
  const words = text
    .replace(/^[\d:]+/, "")
    .replace(/[^a-zA-Z0-9]/g, " ")
    .split(" ");
  return words
    .map((word, idx) =>
      idx === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join("")
    .slice(0, 18);
};

const hasIconWord = (text: string): boolean => /\bicon\b/i.test(text);

const hasCardTitleWord = (text: string): boolean =>
  text.toLowerCase().includes("card title");

const replaceIconWord = (text: string): string => text.replace(/icon\//gi, "");

const getIconSize = async (node: SceneNode): Promise<string> => {
  const nodeWidthId = node.boundVariables?.width?.id;
  if (nodeWidthId === undefined) return "iconSizes.default";

  const sizeVariable = await figma.variables.getVariableByIdAsync(nodeWidthId);
  const sizeName = sizeVariable?.name;
  if (sizeName === undefined) {
    console.warn("sizeName===undefined");
    return "iconSizes.default";
  }
  return `iconSizes.${sizeName}`;
};

const getText = (node: TextNode, str: string, isEn: boolean): string => {
  const content = node.characters;
  const text = `${toLowercaseFirstLetterCamelCase(content)}: ${
    isEn ? `"${content}"` : "i18n.TODO_TRANSLATE"
  },`;
  return str + text;
};
