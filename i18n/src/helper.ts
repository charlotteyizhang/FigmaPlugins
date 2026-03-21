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
  console.log({ match });

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
