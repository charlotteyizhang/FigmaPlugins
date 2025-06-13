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
