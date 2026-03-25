import {
  createCode,
  createOrUpdateVariable,
  findOrCreateCollection,
  generateErrorTemplateFn,
  generateTemplateFn,
  modeName,
  renameLayersToVariableName,
} from "./helper";

interface GenerateMsg {
  type: "generateTranslationVariables";
}
interface RenameMsg {
  type: "renameLayersToVariableName";
}
interface CreateMsg {
  type: "createVariables";
  language: "en" | "ja";
}
interface CreateCodeMsg {
  type: "createCode";
  formatType: "native" | "react";
}

export type I18nMessage = GenerateMsg | RenameMsg | CreateMsg | CreateCodeMsg;

export const I18N_MESSAGE_TYPES = new Set<string>([
  "generateTranslationVariables",
  "renameLayersToVariableName",
  "createVariables",
  "createCode",
]);

export const handleI18nMessage = async (msg: I18nMessage): Promise<void> => {
  if (msg.type === "generateTranslationVariables") {
    let str = "";
    const localCollections =
      await figma.variables.getLocalVariableCollectionsAsync();

    const i18nCollection = localCollections.find((c) => c.name === "i18n");

    if (i18nCollection === undefined) {
      return figma.ui.postMessage("No i18nCollection found.");
    }

    const modes = i18nCollection.modes;
    for (let i = 0; i < modes.length; i++) {
      const name = modes[i].name;
      str += `const i18n_${name} = {`;

      const variables = (
        await Promise.all(
          i18nCollection.variableIds.map((id) =>
            figma.variables.getVariableByIdAsync(id),
          ),
        )
      ).filter((v): v is Variable => {
        if (v === null) {
          console.warn(`Variable not found.`);
          return false;
        }
        return true;
      });

      variables.sort((a, b) => a.name.localeCompare(b.name));

      for (const variable of variables) {
        const varName = variable.name.replace(/\//g, "_");
        const value =
          variable.valuesByMode[modes[i].modeId] ?? "i18n.TODO_TRANSLATE";
        const escapedValue = value.toString().replace(/\n/g, "\\n");

        if (variable.name.includes("error")) {
          str += `"${varName}": ${generateErrorTemplateFn(escapedValue)},`;
        } else {
          str += `"${varName}": ${generateTemplateFn(escapedValue)},`;
        }
      }

      str += "};\n";
    }

    figma.ui.postMessage(str);
  } else if (msg.type === "renameLayersToVariableName") {
    const localCollections =
      await figma.variables.getLocalVariableCollectionsAsync();

    const i18nCollection = localCollections.find((c) => c.name === "i18n");

    if (i18nCollection === undefined) {
      return figma.ui.postMessage("No i18nCollection found.");
    }

    for (const node of figma.currentPage.selection) {
      if (node.type === "TEXT") {
        renameLayersToVariableName(node);
      } else if (node.type === "INSTANCE") {
        const textNodes = node.findAllWithCriteria({ types: ["TEXT"] });
        for (const textNode of textNodes) {
          renameLayersToVariableName(textNode);
        }
      }
    }
  } else if (msg.type === "createVariables") {
    const targetName = "i18n";
    const localCollections =
      await figma.variables.getLocalVariableCollectionsAsync();

    const i18nCollection = findOrCreateCollection(localCollections, targetName);
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
        const layerName = node.name.substring(1);
        const nodeText = node.characters;
        const lines = nodeText.split("\n");
        const isMultiParagraph = lines.length > 1;

        if (!isMultiParagraph) {
          const variable = await createOrUpdateVariable(
            layerName,
            nodeText,
            i18nCollection,
            targetModeId,
          );
          if (variable !== undefined) {
            node.setBoundVariable("characters", variable);
          }
        } else {
          let n = 0;
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim() !== "") {
              const varName = `${layerName}/p${n + 1}`;
              n++;
              await createOrUpdateVariable(
                varName,
                lines[i],
                i18nCollection,
                targetModeId,
              );
            }
          }
        }
      }
    }
  } else if (msg.type === "createCode") {
    let str = "";
    const type =
      msg.formatType === "native" ? "userLocale.userLanguage" : "language";

    for (const node of figma.currentPage.selection) {
      if (node.type === "TEXT") {
        str += createCode(msg.formatType, type, node);
        // const layerName = node.name.substring(1).replace(/\//g, "_");
        // const nodeText = node.characters;
        // const lines = nodeText.split("\n");
        // const isMultiParagraph = lines.length > 1;

        // if (isMultiParagraph) {
        //   const isNative = msg.formatType === "native";
        //   for (let i = 0; i < lines.length; i++) {
        //     if (isNative) {
        //       str += `<P>{'\\"\\u2022\\"'} {translationsCommon[${type}].${layerName}_p${i + 1}}</P>`;
        //     } else {
        //       str += `<li><P>{translationsCommon[${type}].${layerName}_p${i + 1}}</P></li>`;
        //     }
        //   }
        // } else {
        //   str += `translationsCommon[${type}].${layerName}`;
        // }
      }
    }

    figma.ui.postMessage(str);
  }
};
