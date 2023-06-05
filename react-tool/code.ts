// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { height: 600 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.

figma.ui.onmessage = (msg) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === "generate") {
    let str = "";
    for (const node of figma.currentPage.selection) {
      str += getChildrenView(node, str);
    }

    figma.ui.postMessage(str);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin();
};

const getChildrenView = (
  node: SceneNode,
  acc: string,
  parentLayout?: "horizontal" | "vertical"
): string => {
  const marginStyle =
    parentLayout !== undefined
      ? parentLayout === "horizontal"
        ? "marginTop:spacing.small,"
        : "marginLeft:spacing.small,"
      : undefined;

  if (node.type === "FRAME" && "children" in node) {
    const isHorizontal = node.layoutMode === "HORIZONTAL";
    const containerStyle = parentLayout
      ? `flexDirection: "row", justifyContent: "space-between", alignItems: "center",`
      : undefined;

    const firstChild = node.children[0];
    const firstElementIsCard =
      hasCardTitleWord(firstChild.name) && firstChild.type === "INSTANCE";

    const content = node.children.reduce(
      (_acc, v, idx) =>
        firstElementIsCard && idx === 0
          ? _acc
          : getChildrenView(
              v,
              _acc,
              idx === 0 || (idx === 1 && firstElementIsCard)
                ? undefined
                : isHorizontal
                ? "horizontal"
                : "vertical"
            ),
      ""
    );

    const el =
      marginStyle === undefined && containerStyle === undefined
        ? content
        : `<View style={{${containerStyle ?? ""} ${
            marginStyle ?? ""
          }}}>${content}</View>`;

    return firstElementIsCard
      ? acc +
          `<Card theme={theme} title={{text:translations[userLocale.userLanguage].${toCamelCase(
            firstChild.componentProperties["Text#3945:0"].value.toString() ?? ""
          )}, showRightIcon:${
            firstChild.componentProperties["isLink"].value
          }}}>${content}</Card>`
      : acc + el;
  } else {
    let content = "";
    if (node.type === "TEXT") {
      content = `<P kind="" color={textColors[theme].default}>${node.name}</P>`;
    } else if (node.type === "INSTANCE" || node.type === "COMPONENT") {
      if (hasIconWord(node.name)) {
        content = `<Icon color={textColors[theme].default} icon="${replaceIconWord(
          node.name
        )}" size={${getIconSizeByWidth(node.width)}}/>`;
      } else {
        content = `<${toCamelCase(node.name)} theme={theme} />`;
      }
    } else {
      console.log("others", node.name, node.type);
      content = `<></>`;
    }

    const el =
      marginStyle === undefined
        ? content
        : `<View style={{${marginStyle ?? ""}}}>${content}</View>`;

    return acc + el;
  }
};

const toCamelCase = (text: string): string => {
  const words = text.replace(/[^a-zA-Z0-9]/g, " ").split(" ");

  const camelCaseWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  const camelCaseText = camelCaseWords.join("");

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
const getIconSizeByWidth = (w: number): string => {
  return `fontSize[${w === 24 ? 6 : w === 20 ? 5 : w === 16 ? 4 : 0}]`;
};
