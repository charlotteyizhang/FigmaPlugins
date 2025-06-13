// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 500, height: 600 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async (msg: { type: string; count: number }) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === "generateTranslationVariables") {
    let str = "";
    const localCollections =
      await figma.variables.getLocalVariableCollectionsAsync();

    const i18nCollection = localCollections.find((c) => c.name === "i18n");
    console.log({ i18nCollection });

    if (i18nCollection === undefined) {
      return figma.ui.postMessage("No i18nCollection found.");
    } else {
      const modes = i18nCollection?.modes;
      for (let i = 0; i < modes.length; i++) {
        const modeName = modes[i].name;
        str += `const i18n_${modeName} = {`;

        for (const translationKey of i18nCollection.variableIds) {
          const variable = await figma.variables.getVariableByIdAsync(
            translationKey
          );
          if (variable === null) {
            console.warn(`Variable with id ${translationKey} not found.`);
            return;
          } else {
            const name = variable.name;

            // const value = variable.valuesByMode;
            str += `"${name}": "${
              variable.valuesByMode[modes[i].modeId] ?? "i18n.TODO_TRANSLATE"
            }",`;
          }
        }

        str += "};\n";
      }
    }

    figma.ui.postMessage(str);
  } else if (msg.type === "assignTranslationVariables") {
    const localCollections =
      await figma.variables.getLocalVariableCollectionsAsync();

    const i18nCollection = localCollections.find((c) => c.name === "i18n");
    console.log({ i18nCollection });

    if (i18nCollection === undefined) {
      return figma.ui.postMessage("No i18nCollection found.");
    } else {
      for (const node of figma.currentPage.selection) {
        if (node.type === "TEXT") {
          const layerName = node.name;

          let variable: Variable | undefined = undefined;

          for (const variableId of i18nCollection.variableIds) {
            const v = await figma.variables.getVariableByIdAsync(variableId);
            if (v?.name === layerName) {
              variable = v;
              break;
            }
          }

          if (variable === undefined) {
            figma.ui.postMessage(
              `layer name does not match any variable in i18n collection, please check the layer name: ${layerName}`
            );
          } else {
            console.log({ variable });
            node.setBoundVariable("characters", variable);
            console.log({ nodeAfter: node, variable });
            figma.ui.postMessage("successfully assigned translation variables");
          }
        }
      }
    }
  }
};
