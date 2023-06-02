import * as Colors from "./colors";
// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

console.clear();
// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => {
  if (msg.type === "designTokenToVariables") {
    const localCollections = figma.variables.getLocalVariableCollections();
    console.log({ localCollections });

    const targetName = "Colors";
    const colorCollection = localCollections.find((v) => {
      return v.name.match(targetName);
    });
    if (colorCollection === undefined) {
      const c = figma.variables.createVariableCollection(targetName);
      c.renameMode(c.modes[0].modeId, modeName.light);
      c.addMode(modeName.dark);
      c.modes.map((mode) => {
        if (mode.name === modeName.light || mode.name === modeName.dark) {
          createColorToken(
            "backgroundColors",
            Colors.backgroundColors,
            c,
            mode.name,
            mode.modeId
          );
        }
      });
    } else {
      colorCollection.modes.map((mode) => {
        if (mode.name === modeName.light || mode.name === modeName.dark) {
          // console.log({ mode });
          createColorToken(
            "backgroundColors",
            Colors.backgroundColors,
            colorCollection,
            mode.name,
            mode.modeId
          );
          createColorToken(
            "batteryModeColors",
            Colors.batteryModeColors,
            colorCollection,
            mode.name,
            mode.modeId
          );
          createColorToken(
            "illustrationColors",
            Colors.illustrationColors,
            colorCollection,
            mode.name,
            mode.modeId
          );
        }
      });
    }

    // const tsCode = msg.text;
    // const jsonResult = convertTsToJson(tsCode);

    // console.log("Converted to JSON:", jsonResult);

    // const obj = JSON.parse(jsonResult);
    // console.log({ obj });

    // Do something with the JSON result if needed
  }
};
// const createCollection = (
//   name: string
// ): { collection: VariableCollection; modeId: string } => {
//   const collection = figma.variables.createVariableCollection(name);
//   const modeId = collection.modes[0].modeId;
//   return { collection, modeId };
// };

// const createToken = (
//   collection: VariableCollection,
//   modeId: string,
//   type: VariableResolvedDataType,
//   name: string,
//   value: string
// ): Variable => {
//   const token = figma.variables.createVariable(name, collection.id, type);
//   token.setValueForMode(modeId, value);
//   return token;
// };
// const convertTsToJson = (tsCode: string): string => {
//   const tsCode1 = tsCode.split("export const").reduce((acc, s) => {
//     if (s.length > 0) {
//       const newS = s.replace(/\s/g, "");
//       const x = newS.split("={");
//       return { ...acc, [`${x[0]}`]: x[1] };
//     } else {
//       return acc;
//     }
//   }, {});
//   console.log({ tsCode1 });

//   const jsonOutput = JSON.stringify(tsCode1, null, 2);

//   return jsonOutput;
// };
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
  console.log({ prefix });
  const x = getColorToken(prefix, obj);
  const theme = x[modeName];
  if (theme !== undefined) {
    const variables = figma.variables.getLocalVariables();

    theme.map((v) => {
      Object.entries(v).forEach(([key, value]) => {
        let token = variables.find((v) => v.name === key);
        if (token === undefined) {
          token = figma.variables.createVariable(key, collection.id, "COLOR");
        }
        const rgb = Colors.hexToRgb(value);
        token.setValueForMode(modeId, {
          b: rgb.b / 255,
          g: rgb.g / 255,
          r: rgb.r / 255,
        });
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
      acc[key] = x.map((v) => ({ [`${prefix}/${v.name}`]: v.value }));
    }
    return acc;
  }, init);

  return x;
};

interface ReturnType {
  name: string;
  value: string;
}
const flattenObjKey = (
  prefix: string,
  value: NestedObject<string>
): Array<ReturnType> => {
  const init: Array<ReturnType> = [];
  const x = Object.entries(value).reduce((acc, [key2, value]) => {
    if (typeof value === "string") {
      acc.push({ name: prefix === "" ? key2 : `${prefix}/${key2}`, value });
      return acc;
    } else {
      const x = flattenObjKey(`${prefix}/${key2}`, value);
      acc.concat(x);
      return acc;
    }
  }, init);

  return x;
};
