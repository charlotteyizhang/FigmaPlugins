export const findOrCreateCollection = (
  localCollections: Array<VariableCollection>,
  targetName: string
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
    paramName: "n",
    displayVariableName: "unit",
    p: /\b\d+(?:\.\d+)?\s?(?:w|wh|kwh|kw|%)\b/i,
  }, // number + unit
  {
    paramName: "timestamp",
    displayVariableName: "timestamp",
    p: /\b\d{1,2}:\d{2}(?:\s?(?:AM|PM))?\b/i,
  }, // timestamp (12, 4:30, 3 AM)
];
export const generateTemplateFn = (input: string): string => {
  let matchStr = input;

  const params: Array<string> = [];
  let idx = 0;

  for (const pattern of patterns) {
    const match = input.match(pattern.p);
    console.log({ match });

    if (match) {
      const displayName = pattern.displayVariableName + idx;
      const replaced = input.replace(match[0], "${" + displayName + "}");
      params.push(displayName + ":string");
      matchStr = replaced;
    }
  }

  return matchStr !== input
    ? "(" + params.join(",") + ")=>" + "`" + matchStr + "`"
    : input;
};
