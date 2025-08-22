export const matchColorVariables = async (
  localCollections: Array<VariableCollection>
) => {
  const libraryCollections =
    await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();

  const libraryColors = libraryCollections.find((c) => c.name === "colors");
  const libraryColorsKey = libraryColors ? libraryColors.key : undefined;

  if (libraryColorsKey === undefined) {
    throw Error("Lunar Design System Colors collection not found");
  } else {
    const libraryVariables =
      await figma.teamLibrary.getVariablesInLibraryCollectionAsync(
        libraryColorsKey
      );

    console.log({ variables: libraryVariables });

    const libraryVariablesArray = await getLibraryVariablesArray(
      libraryVariables
    );

    const localColors = localCollections.find((c) => c.name === "colors");
    const localColorsKey = localColors ? localColors.key : undefined;
    if (localColorsKey === undefined) {
      throw Error("Local Colors collection not found, import first");
    } else {
      const localVaribles = await figma.variables.getLocalVariablesAsync();
      localVaribles.forEach((localVarible) => {
        Object.entries(localVarible.valuesByMode).forEach(
          async ([mode, value]) => {
            for (let index = 0; index < libraryVariablesArray.length; index++) {
              const element = await libraryVariablesArray[index];
              if (sameColor(value as RGBA, element[0].rgba as RGBA)) {
                console.log("match", {
                  localVarible,
                  local: localVarible.name,
                  library: element[0].name,
                });
                break;
              }
            }
          }
        );
      });
    }
  }
};

const getLibraryVariablesArray = (libraryVariables: Array<LibraryVariable>) =>
  libraryVariables.map(async (libraryVariable) => {
    const importedVariable = await figma.variables.importVariableByKeyAsync(
      libraryVariable.key
    );
    return Object.values(importedVariable.valuesByMode).map((v) => ({
      rgba: v,
      name: libraryVariable.name,
    }));
  });

const sameColor = (a: RGBA, b: RGBA) =>
  Math.abs(a.r - b.r) < 0.001 &&
  Math.abs(a.g - b.g) < 0.001 &&
  Math.abs(a.b - b.b) < 0.001 &&
  Math.abs(a.a - b.a) < 0.001;
