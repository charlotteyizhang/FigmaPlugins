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

  const isComponent = node.type === "INSTANCE" || node.type === "COMPONENT";

  if (!isComponent && node.type === "FRAME" && "children" in node) {
    console.log("fram", node.name, node.type);

    const isHorizontal = node.layoutMode === "HORIZONTAL";
    const containerStyle = isHorizontal
      ? `flexDirection: "row", justifyContent: "space-between", alignItems: "center",`
      : undefined;

    const content = node.children.reduce(
      (_acc, v, idx) =>
        getChildrenView(
          v,
          _acc,
          idx === 0 ? undefined : isHorizontal ? "horizontal" : "vertical"
        ),
      ""
    );

    const style =
      marginStyle === undefined && containerStyle === undefined
        ? ""
        : `style={{${containerStyle ?? ""} ${marginStyle ?? ""}}}`;

    return acc + `<View ${style}>${content}</View>`;
  } else {
    let content = "";
    if (node.type === "TEXT") {
      content = `<P color="${node.getStyledTextSegments(["fills"])}">${
        node.name
      }</P>`;
    } else if (node.type === "INSTANCE" || node.type === "COMPONENT") {
      if (hasIconWord(node.name)) {
        console.log("icon", node.name, node.type);
        content = `<Icon color={textColors[theme].default} icon="${replaceIconWord(
          node.name
        )}" size={${getIconSizeByWidth(node.width)}}/>`;
      } else {
        console.log("component", node.name, node.type);
        content = `<${toCamelCase(node.name)} theme={theme} />`;
      }
    } else {
      console.log("others", node.name, node.type);
      content = `<></>`;
    }

    const style =
      marginStyle === undefined ? "" : `style={{${marginStyle ?? ""}}}`;

    return acc + `<View ${style}>${content}</View>`;
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
const replaceIconWord = (text: string): string => {
  const regex = /icon\//gi;
  return text.replace(regex, "");
};
const getIconSizeByWidth = (w: number): string => {
  return `fontSize[${w === 24 ? 6 : w === 20 ? 5 : w === 16 ? 4 : 0}]`;
};
