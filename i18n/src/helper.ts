export const findOrCreateCollection = (
  localCollections: Array<VariableCollection>,
  targetName: string,
) => {
  const collection = localCollections.find((v) => {
    return v.name.match(targetName);
  });
  if (collection === undefined) {
    return figma.variables.createVariableCollection(targetName);
  } else {
    return collection;
  }
};

export const modeName = {
  en: "en",
  ja: "ja",
} as const;
export type Mode = keyof typeof modeName;

const patterns = [
  {
    paramName: "number+unit",
    displayVariableName: "unit",
    p: /(?:\b\d+(?:\.\d+)?\s?(?:w|wh|kwh|kw)\b|\d+(?:\.\d+)?%)/i,
  }, // number + unit
  {
    paramName: "timestamp",
    displayVariableName: "timestamp",
    p: /\b\d{1,2}:\d{2}(?:\s?(?:AM|PM))?\b/i,
  }, // timestamp (12, 4:30, 3 AM)
];
export const getParamMatchingPattern = (input: string) => {
  const regex = /\[\[(.*?)\]\]/g;
  return [...input.matchAll(regex)].map((m) => m[1]);
};
export const generateTemplateFn = (input: string): string => {
  let matchStr = input;

  const specialInputs = getParamMatchingPattern(input);

  const params: Array<string> = [];
  let idx = 0;

  for (const specialInput of specialInputs) {
    let matchFlag = false;
    for (const pattern of patterns) {
      const match = specialInput.match(pattern.p);

      if (match) {
        const displayName = pattern.displayVariableName + idx;
        const replaced = matchStr.replace(
          "[[" + specialInput + "]]",
          "${" + displayName + "}",
        );
        idx += 1;
        params.push(displayName + ":string");
        matchFlag = true;
        matchStr = replaced;
      }
    }

    if (!matchFlag) {
      const paramName = "param" + idx;
      const replaced = matchStr.replace(
        "[[" + specialInput + "]]",
        "${" + paramName + "}",
      );
      params.push(paramName + ":string");
      matchStr = replaced;
      idx += 1;
    }
  }

  const hasQuote = /"/.test(matchStr);

  return matchStr !== input
    ? "(" + params.join(",") + ")=>" + "`" + matchStr + "`"
    : hasQuote
      ? `\`${input}\``
      : `"${input}"`;
};

export const generateErrorTemplateFn = (input: string): string => {
  let matchStr = input;

  const params: Array<string> = [];
  const displayName = "statusCode";

  const match = input.match(/\b\d+(\.\d+)?\b/);

  if (match) {
    const replaced = input.replace(match[0], "${" + displayName + "}");
    params.push(displayName + ":number");
    matchStr = replaced;
  }

  return matchStr !== input
    ? "(" + params.join(",") + ")=>" + "`" + matchStr + "`"
    : `"${input}"`;
};

export const renameLayersToVariableName = async (node: SceneNode) => {
  const boundVariableCharacter = node.boundVariables?.characters;

  if (boundVariableCharacter !== undefined) {
    const variable = await figma.variables.getVariableByIdAsync(
      boundVariableCharacter.id,
    );
    if (variable !== null) {
      const variableName = `#${variable.name}`;
      node.name = variableName;
      figma.ui.postMessage(`successfully renamed layer to ${variableName} `);
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
      figma.ui.postMessage(`successfully renamed layer to ${variableName} `);
    } else {
      figma.ui.postMessage(
        `no variable found for layer ${node.name}, skipping rename`,
      );
    }
  }
};

export const createOrUpdateVariable = async (
  varName: string,
  text: string,
  i18nCollection: VariableCollection,
  targetModeId: string,
) => {
  let variable: Variable | undefined = undefined;

  for (const variableId of i18nCollection.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(variableId);
    if (v?.name === varName) {
      variable = v;
      break;
    }
  }

  if (variable === undefined) {
    variable = figma.variables.createVariable(
      varName,
      i18nCollection,
      "STRING",
    );
    if (variable !== undefined) {
      console.log({ node: text });

      variable.setValueForMode(targetModeId, text);
      const specialInputs = getParamMatchingPattern(text);

      const paramStr = specialInputs.reduce(
        (acc, s) => acc + "[[" + s + "]]",
        "",
      );

      variable.setValueForMode(
        i18nCollection.modes[1].modeId,
        paramStr + "TODO_TRANSLATE",
      );
      figma.ui.postMessage("successfully created translation variables");
    } else {
      figma.ui.postMessage(`error generate variable layer name: ${varName}`);
    }
  } else {
    const variableValue = variable.valuesByMode[targetModeId];

    if (variableValue !== undefined && text !== variableValue) {
      variable.setValueForMode(targetModeId, text);
      figma.ui.postMessage(
        `layer name already exists in i18n collection, replaced ${variableValue} with ${text}`,
      );
    } else {
      figma.ui.postMessage(
        `layer name already exists in i18n collection, associated to: ${varName}`,
      );
    }
  }

  return variable;
};

export const createCode = (
  formatType: "native" | "react",
  type: string,
  node: TextNode,
): string => {
  const isNative = formatType === "native";
  let str = "";
  const layerName = node.name.substring(1).replace(/\//g, "_");
  const nodeText = node.characters;
  const lines = nodeText.split("\n");
  const isMultiParagraph = lines.length > 1;

  if (isMultiParagraph) {
    for (let i = 0; i < lines.length; i++) {
      if (isNative) {
        str += `<P>{'\\"\\u2022\\"'} {translationsCommon[${type}].${layerName}_p${i + 1}}</P>`;
      } else {
        str += `<li><P>{translationsCommon[${type}].${layerName}_p${i + 1}}</P></li>`;
      }
    }
  } else {
    str += `translationsCommon[${type}].${layerName}`;
  }

  return str;
};
