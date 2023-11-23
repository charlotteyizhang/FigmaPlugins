import * as Colors from "./colors";
import { flattenObjKey } from "./common";

export const createColor = (localCollections: Array<VariableCollection>) => {
  const targetName = "Colors";

  const colorCollection = localCollections.find((v) => {
    return v.name.match(targetName);
  });
  if (colorCollection !== undefined) {
    colorCollection.remove();
  }

  const c = figma.variables.createVariableCollection(targetName);
  c.renameMode(c.modes[0].modeId, modeName.light);
  c.addMode(modeName.dark);

  c.modes.map((mode) => {
    if (mode.name === modeName.light || mode.name === modeName.dark) {
      // Loop through all exports in the Colors module
      for (const key in Colors) {
        if (Object.prototype.hasOwnProperty.call(Colors, key)) {
          //@ts-expect-error
          const colorName = Colors[key];
          if (typeof colorName === "object" && /color|colour/i.test(key)) {
            createColorToken(key, colorName, c, mode.name, mode.modeId);
          }
        }
      }
    }
  });
};

const modeName = {
  dark: "dark",
  light: "light",
} as const;
type Mode = keyof typeof modeName;

const init: Record<Mode, Array<Record<string, string>>> = {
  light: [],
  dark: [],
};
interface NestedObject<A> {
  [key: string]: NestedObject<A> | string;
}

const createColorToken = (
  prefix: string,
  obj: NestedObject<string>,
  collection: VariableCollection,
  modeName: "light" | "dark",
  modeId: string
): void => {
  const x = getColorToken(prefix, obj);

  const theme = x[modeName];
  if (theme !== undefined) {
    const variables = figma.variables.getLocalVariables();

    theme.map((v) => {
      Object.entries(v).forEach(([key, value]) => {
        const rgb = Colors.hexToRgb(value);
        if (
          !Number.isNaN(rgb.r) &&
          !Number.isNaN(rgb.g) &&
          !Number.isNaN(rgb.b)
        ) {
          let token = variables.find((v) => v.name === key);
          if (token === undefined) {
            token = figma.variables.createVariable(key, collection.id, "COLOR");
          }
          token.setValueForMode(modeId, {
            b: rgb.b / 255,
            g: rgb.g / 255,
            r: rgb.r / 255,
          });
        }
      });
    });
  }
};

const getColorToken = (
  prefix: string,
  obj: NestedObject<string>
): Record<Mode, Array<Record<string, string>>> => {
  const x = Object.entries(obj).reduce((acc, [key, value]) => {
    if (
      typeof value !== "string" &&
      (key === modeName.dark || key === modeName.light)
    ) {
      const x = flattenObjKey("", value);
      const newArray = x.map((v) => ({ [`${prefix}/${v.name}`]: v.value }));

      const newKey = acc[key].concat(newArray);
      acc[key] = newKey;
    }
    return acc;
  }, init);

  return x;
};
