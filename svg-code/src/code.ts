// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

import {
  findOrCreateCollection,
  generateErrorTemplateFn,
  generateTemplateFn,
  modeName,
} from "./helper";

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 500, height: 600 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.

interface Create {
  type: "convert";
}

type Message = Create;
figma.ui.onmessage = async (msg: Message) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === "convert") {
    const list: Record<string, string> = {};
    const promises = figma.currentPage.selection.map(async (node) => {
      await mutateList(node, list);
    });
    Promise.all(promises).then(() => {
      console.log({ done: list });

      const str = Object.entries(list)
        .map(([name, value]) => {
          const names = name.split("/");
          return `${value}={${
            names[0].charAt(0).toLowerCase() + names[0].slice(1)
          }${names[1].charAt(0).toUpperCase() + names[1].slice(1)}[theme].${
            names[2]
          }}`;
        })
        .join(",");

      console.log({ str });

      if (str !== undefined) {
        figma.ui.postMessage(str);
      }
    });
  }
};

const get = async (
  v: VariableAlias,
  list: Record<string, string>
): Promise<{ color: string; name: string } | undefined> => {
  const varId = v.id;
  const variable = await figma.variables.getVariableByIdAsync(varId);
  if (variable === null) {
    return undefined;
  } else {
    const variableName = variable.name;
    const variableValue = Object.values(variable.valuesByMode).map((v) => v);

    if (
      variableName !== undefined &&
      list[variableName] === undefined &&
      variableValue !== undefined
    ) {
      return {
        color: rgbaToHex(variableValue[0] as RGBA),
        name: variableName,
      };
    }
    return undefined;
  }
};

const mutateList = async (node: SceneNode, list: Record<string, string>) => {
  // recurse children
  if ("children" in node) {
    await Promise.all(node.children.map((child) => mutateList(child, list)));
    return undefined;
  } else {
    if ("fills" in node && node.boundVariables?.fills) {
      // console.log({ fills: node.boundVariables.fills });

      const promises = node.boundVariables.fills.map(async (v) => {
        const result = await get(v, list);
        if (result !== undefined && list[result.name] === undefined) {
          list[result.name] = result.color;
        }
        console.log({ list });
      });
      await Promise.all(promises);
      return undefined;
    }
  }
};
const rgbaToHex = (v: RGBA): string => {
  // Clamp values between 0–255 for RGB
  const R = Math.round(v.r * 255);
  const G = Math.round(v.g * 255);
  const B = Math.round(v.b * 255);

  // Clamp alpha between 0–255
  const A = Math.round(v.a * 255);

  // Convert each to 2-digit hex
  const hex = (n: number) => n.toString(16).padStart(2, "0").toUpperCase();

  // If alpha = 255 (fully opaque), return #RRGGBB
  if (A === 255) {
    return `#${hex(R)}${hex(G)}${hex(B)}`;
  }

  // Otherwise return #RRGGBBAA
  return `#${hex(R)}${hex(G)}${hex(B)}${hex(A)}`;
};
