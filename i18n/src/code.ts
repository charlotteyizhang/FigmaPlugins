// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

import {
  findOrCreateCollection,
  generateErrorTemplateFn,
  generateTemplateFn,
  getParamMatchingPattern,
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

interface Generate {
  type: "generateTranslationVariables";
}
interface Rename {
  type: "renameLayersToVariableName";
}
interface Create {
  type: "createVariables";
  language: "en" | "ja";
}
interface CreateCode {
  type: "createCode";
}

type Message = Generate | Rename | Create | CreateCode;
figma.ui.onmessage = async (msg: Message) => {
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
          const variable =
            await figma.variables.getVariableByIdAsync(translationKey);
          if (variable === null) {
            console.warn(`Variable with id ${translationKey} not found.`);
            return;
          } else {
            const name = variable.name.replace(/\//g, "_");

            const value =
              variable.valuesByMode[modes[i].modeId] ?? "i18n.TODO_TRANSLATE";

            if (variable.name.includes("error")) {
              str += `"${name}": ${generateErrorTemplateFn(value.toString())},`;
            } else {
              str += `"${name}": ${generateTemplateFn(value.toString())},`;
            }
          }
        }

        str += "};\n";
      }
    }

    figma.ui.postMessage(str);
  } else if (msg.type === "renameLayersToVariableName") {
    const localCollections =
      await figma.variables.getLocalVariableCollectionsAsync();

    const i18nCollection = localCollections.find((c) => c.name === "i18n");
    console.log({ i18nCollection });

    if (i18nCollection === undefined) {
      return figma.ui.postMessage("No i18nCollection found.");
    } else {
      for (const node of figma.currentPage.selection) {
        if (node.type === "TEXT") {
          const boundVariableCharacter = node.boundVariables?.characters;

          if (boundVariableCharacter !== undefined) {
            const variable = await figma.variables.getVariableByIdAsync(
              boundVariableCharacter.id,
            );
            if (variable !== null) {
              const variableName = `#${variable.name}`;
              node.name = variableName;
              figma.ui.postMessage(
                `successfully renamed layer to ${variableName} `,
              );
            } else {
              figma.ui.postMessage(
                `bound variable not found for layer ${node.name}, skipping rename`,
              );
            }
          } else {
            const inferredVariables = node.inferredVariables?.characters;
            const variableId =
              inferredVariables !== undefined && inferredVariables.length > 0
                ? ((await figma.variables.getVariableByIdAsync(
                    inferredVariables[0].id,
                  )) ?? undefined)
                : undefined;
            if (variableId !== undefined) {
              const variableName = `#${variableId.name}`;
              node.name = variableName;
              figma.ui.postMessage(
                `successfully renamed layer to ${variableName} `,
              );
            } else {
              figma.ui.postMessage(
                `no variable found for layer ${node.name}, skipping rename`,
              );
            }
          }
        }
      }
    }
  } else if (msg.type === "createVariables") {
    const targetName = "i18n";
    const localCollections =
      await figma.variables.getLocalVariableCollectionsAsync();

    const i18nCollection = findOrCreateCollection(localCollections, targetName);
    // creating a collection will have 1 default mode therefore we are checking this
    if (i18nCollection.modes.length === 1) {
      i18nCollection.renameMode(i18nCollection.modes[0].modeId, modeName.en);
      i18nCollection.addMode(modeName.ja);
    }

    const targetModeId =
      msg.language === "en"
        ? i18nCollection.modes[0].modeId
        : i18nCollection.modes[1].modeId;

    for (const node of figma.currentPage.selection) {
      if (node.type === "TEXT" && node.visible && node.name.startsWith("#")) {
        const layerName = node.name.substring(1); // Remove the leading '#'
        const nodeText = node.characters;

        let variable: Variable | undefined = undefined;

        for (const variableId of i18nCollection.variableIds) {
          const v = await figma.variables.getVariableByIdAsync(variableId);
          if (v?.name === layerName) {
            variable = v;
            break;
          }
        }

        if (variable === undefined) {
          variable = await figma.variables.createVariable(
            layerName,
            i18nCollection,
            "STRING",
          );
          if (variable !== undefined) {
            console.log({ node: nodeText });

            variable.setValueForMode(targetModeId, nodeText);
            const specialInputs = getParamMatchingPattern(nodeText);

            const paramStr = specialInputs.reduce(
              (acc, s) => acc + "[[" + s + "]]",
              "",
            );

            variable.setValueForMode(
              i18nCollection.modes[1].modeId,
              paramStr + "TODO_TRANSLATE",
            );
            node.setBoundVariable("characters", variable);
            figma.ui.postMessage("successfully created translation variables");
          } else {
            figma.ui.postMessage(
              `error generate variable layer name: ${layerName}`,
            );
          }
        } else {
          const variableValue = variable.valuesByMode[targetModeId];

          if (variableValue !== undefined && nodeText !== variableValue) {
            variable.setValueForMode(targetModeId, nodeText);
            node.setBoundVariable("characters", variable);
            figma.ui.postMessage(
              `layer name already exists in i18n collection, replaced ${variableValue} with ${nodeText}`,
            );
          } else {
            node.setBoundVariable("characters", variable);
            figma.ui.postMessage(
              `layer name already exists in i18n collection, associated to: ${layerName}`,
            );
          }
        }
      }
    }
  } else if (msg.type === "createCode") {
    let str = "";
    for (const node of figma.currentPage.selection) {
      if (node.type === "TEXT") {
        const layerName = node.name.substring(1).replace(/\//g, "_"); // Remove the leading '#' and translate to code

        str += `translationsCommon[userLocale.userLanguage].${layerName}`;
      }
    }

    figma.ui.postMessage(str);
  }
};
