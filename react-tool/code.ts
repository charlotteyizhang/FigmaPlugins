// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 400, height: 600 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.

type QueryKind = "lunarCustomer" | "WL";
interface Generate {
  type: "generate";
  value: QueryKind;
}
interface GenerateTextEN {
  type: "generateTextEN";
}
interface AddSpacing {
  type: "addSpacing";
  value: string | undefined;
}
interface AddVerticalPadding {
  type: "addVerticalPadding";
  value: string | undefined;
}
interface AddHorizontalPadding {
  type: "addHorizontalPadding";
  value: string | undefined;
}
interface AddBorderRadius {
  type: "addBorderRadius";
  value: string | undefined;
}
interface AddIconSize {
  type: "addIconSize";
  value: string | undefined;
}

type Message =
  | Generate
  | GenerateTextEN
  | AddSpacing
  | AddVerticalPadding
  | AddHorizontalPadding
  | AddBorderRadius
  | AddIconSize;

figma.ui.onmessage = async (msg: Message) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
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

    figma.ui.postMessage({
      data: str,
      kind: "msg",
    });
  } else if (msg.type === "generateTextEN") {
    let str = "";
    for (const node of figma.currentPage.selection) {
      if (node.type === "TEXT") {
        str += getText(node, str, true);
      }
    }

    figma.ui.postMessage({
      data: str,
      kind: "msg",
    });
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
    } else {
      const variables =
        await figma.teamLibrary.getVariablesInLibraryCollectionAsync(
          lunarSpacingKey
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
        } else {
          const importedVariable =
            await figma.variables.importVariableByKeyAsync(spacingVariable.key);
          if (msg.type === "addSpacing") {
            for (const node of figma.currentPage.selection) {
              if (node.type === "FRAME" || node.type === "COMPONENT") {
                node.setBoundVariable("itemSpacing", importedVariable);
              }
            }
          } else {
            for (const node of figma.currentPage.selection) {
              if (node.type === "FRAME" || node.type === "COMPONENT") {
                if (msg.type === "addHorizontalPadding") {
                  node.setBoundVariable("paddingLeft", importedVariable);
                  node.setBoundVariable("paddingRight", importedVariable);
                } else {
                  node.setBoundVariable("paddingTop", importedVariable);
                  node.setBoundVariable("paddingBottom", importedVariable);
                }
              }
            }
          }
        }
      }
    }
  } else if (msg.type === "addBorderRadius") {
    const libraryCollections =
      await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();

    const lunarBorderRadius = libraryCollections.find(
      (c) => c.name === "borderRadius"
    );

    const lunarBorderRadiusKey = lunarBorderRadius?.key;

    if (lunarBorderRadiusKey === undefined) {
      figma.ui.postMessage({
        data: "Lunar Design System Border Radius collection not found.",
        kind: "msg",
      });
    } else {
      const variables =
        await figma.teamLibrary.getVariablesInLibraryCollectionAsync(
          lunarBorderRadiusKey
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
        } else {
          const importedVariable =
            await figma.variables.importVariableByKeyAsync(
              borderRadiusVariable.key
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
      }
    }
  } else if (msg.type === "addIconSize") {
    const libraryCollections =
      await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();

    console.log({ libraryCollections });
    const lunarIconSize = libraryCollections.find(
      (c) => c.name === "iconSizes"
    );

    const lunarIconSizeKey = lunarIconSize?.key;

    if (lunarIconSizeKey === undefined) {
      figma.ui.postMessage({
        data: "Lunar Design System Icon Size collection not found.",
        kind: "msg",
      });
    } else {
      const variables =
        await figma.teamLibrary.getVariablesInLibraryCollectionAsync(
          lunarIconSizeKey
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
          console.log({ variables });

          figma.ui.postMessage({
            data: `Icon Size variable "${msg.value}" not found.`,
            kind: "msg",
          });
        } else {
          const importedVariable =
            await figma.variables.importVariableByKeyAsync(
              iconSizeVariable.key
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
    }
  }
  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin();
};
const findTextNode = (node: SceneNode): TextNode | null => {
  if (node.type === "TEXT") {
    return node as TextNode;
  }

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
  const recurse = async (x: ChildViewProps) => {
    if (!x.node.visible) {
      return x.acc;
    }

    if (
      (x.node.type === "FRAME" || x.node.type === "COMPONENT") &&
      "children" in x.node
    ) {
      const variableId = await figma.variables.getVariableByIdAsync(
        x.node.boundVariables?.itemSpacing?.id ?? ""
      );
      const spacingId = x.node.boundVariables?.itemSpacing?.id;
      const gapStr =
        spacingId !== undefined
          ? `gap: ${variableId?.name.replace("/", ".")},`
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

      const el =
        containerStyle === undefined
          ? x.firstElement
            ? `<View>${content}</View>`
            : content
          : `<View style={{${containerStyle ?? ""}}}>${content}</View>`;

      const env =
        x.queryKind === "lunarCustomer"
          ? "appAppearanceCtx={appAppearanceCtx}"
          : "appCtx={appCtx}";

      if (firstElementIsCard) {
        const textNode = firstChild.findChild((n) => n.type === "TEXT");
        if (textNode !== null && textNode.type === "TEXT") {
          const translation = getTranslationByLayername(textNode as TextNode);
          return (
            x.acc +
            `<Card ${env} title={{text:${translation}, showIconRight:${firstChild.componentProperties?.["isLink"]?.value}}}>${content}</Card>`
          );
        }

        return (
          x.acc +
          `<Card ${env} title={{text:translations[userLocale.userLanguage].${toLowercaseFirstLetterCamelCase(
            firstChild.componentProperties?.["Text#3945:0"]?.value.toString() ??
              ""
          )}, showIconRight:${
            firstChild.componentProperties?.["isLink"]?.value
          }}}>${content}</Card>`
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

          content = `<Icon color={textColors[theme].default} icon="${replaceIconWord(
            x.node.name
          )}" size={${iconSize ?? undefined}}/>`;
        } else if (x.node.name.includes("Button")) {
          const buttonKind = x.node.componentProperties?.["Type"]?.value ?? "";

          const textNode = findTextNode(x.node);

          if (textNode !== null && textNode.type === "TEXT") {
            const translation = getTranslationByLayername(textNode);

            const env =
              x.queryKind === "lunarCustomer"
                ? "theme={theme} responsive={responsive}"
                : "theme={appCtx.theme}";

            content = `<${x.node.name} ${env} ${
              buttonKind === undefined ? "" : `kind="${buttonKind}"`
            } text={${translation}} onPress={()=>undefined}/>`;
          } else {
            const icon = x.node.findChild((n) =>
              n.name.toLocaleLowerCase().includes("icon")
            );
            if (icon !== null) {
              content = ` <IconButton theme={theme} onPress={() =>undefined} icon="Close" />`;
            }
          }
        } else {
          console.log("component", x.node.name);

          const nodeName = x.node.name;

          const env =
            x.queryKind === "lunarCustomer"
              ? "appAppearanceCtx={appAppearanceCtx}"
              : "appCtx={appCtx}";
          content = `<${
            nodeName.charAt(0).toUpperCase() + nodeName.slice(1)
          } ${env} />`;
        }
      } else {
        console.log("others", x.node.name, x.node.type);
        content = `<>${x.node.name}, ${x.node.type}</>`;
      }

      return x.acc + content;
    }
  };

  return recurse(props);
};

const getTranslationByLayername = (node: TextNode): string => {
  let translation: string;
  if (node.name[0] === "#") {
    const layerName = node.name.substring(1).replace(/\//g, "_"); // Remove the leading '#' and translate to code

    translation = `translationsCommon[userLocale.userLanguage].${layerName}`;
  } else {
    translation = `translations[userLocale.userLanguage].${toLowercaseFirstLetterCamelCase(
      node.characters
    )}`;
  }
  return translation;
};

const getTextKind = async (
  node: TextNode,
  queryKind: QueryKind
): Promise<string | undefined> => {
  const styleId = node.textStyleId;

  const figmaStyle = await figma.getStyleByIdAsync(`${styleId as string}`);
  const textKind = figmaStyle?.name;
  const nodeColorIds = node.boundVariables?.fills;

  let colorName: string | undefined;
  if (nodeColorIds !== undefined && nodeColorIds.length > 0) {
    const variable = await figma.variables.getVariableByIdAsync(
      nodeColorIds[0].id
    );
    colorName = variable?.name ?? undefined;
  }

  const env =
    queryKind === "lunarCustomer"
      ? "responsive={responsive}"
      : "appCtx={appCtx}";

  if (textKind === undefined) {
    console.warn("textKind===undefined");
    return `<P ${env} kind={undefined} />`;
  } else if (colorName === undefined) {
    console.warn("colorName===undefined");
    return `<P ${env} color={undefined} />`;
  } else {
    const texts = textKind.split("/");
    const text = texts[0];
    const text2 = texts[1];
    const color = colorName.split("/");

    const translation = getTranslationByLayername(node);

    if (text.includes("Heading")) {
      return `<${text2} color={${color[0]}[theme].${color[1]}}>{${translation}}</${text2}>`;
    } else {
      console.log({ text });

      const kind =
        text2.toLowerCase() === "medium"
          ? undefined
          : text.charAt(0).toLowerCase() +
            text.slice(1) +
            toCapitalFirstLetterCamelCase(texts[1]);
      return `<P ${env} ${kind === undefined ? "" : `kind="${kind}"`} color={${
        color[0]
      }[theme].${color[1]}}>{${translation}}</P>`;
    }
  }
};

const toCapitalFirstLetterCamelCase = (text: string): string => {
  const words = text
    .replace(/^[\d:]+/, "") // replace numbers and special symbols
    .replace(/[^a-zA-Z0-9]/g, " ")
    .split(" ");

  const camelCaseWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  const camelCaseText = camelCaseWords.join("");

  return camelCaseText;
};
const toLowercaseFirstLetterCamelCase = (text: string): string => {
  const words = text
    .replace(/^[\d:]+/, "") // replace numbers and special symbols
    .replace(/[^a-zA-Z0-9]/g, " ")
    .split(" ");

  const camelCaseWords = words.map((word, idx) =>
    idx === 0
      ? word.toLowerCase()
      : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  const camelCaseText = camelCaseWords.join("").slice(0, 18);

  return camelCaseText;
};

const hasIconWord = (text: string): boolean => {
  const regex = /\bicon\b/i;
  return regex.test(text);
};
const hasCardTitleWord = (text: string): boolean => {
  const lowercaseText = text.toLowerCase();
  return lowercaseText.includes("card title");
};
const replaceIconWord = (text: string): string => {
  const regex = /icon\//gi;
  return text.replace(regex, "");
};
const getIconSize = async (node: SceneNode): Promise<string> => {
  const nodeWidthId = node.boundVariables?.width?.id;

  if (nodeWidthId === undefined) {
    return "iconSizes.default";
  } else {
    const sizeVariable = await figma.variables.getVariableByIdAsync(
      nodeWidthId
    );

    const sizeName = sizeVariable?.name;

    console.log({ sizeName });

    if (sizeName === undefined) {
      console.warn("sizeName===undefined");
      return "iconSizes.default";
    } else {
      return `iconSizes.${sizeName}`;
    }
  }
};

const getText = (node: TextNode, str: string, isEn: boolean): string => {
  const content = node.characters;

  const text = `${toLowercaseFirstLetterCamelCase(content)}: ${
    isEn ? `"${content}"` : "i18n.TODO_TRANSLATE"
  },`;

  return str + text;
};
