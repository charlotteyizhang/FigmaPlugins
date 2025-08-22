// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

import {
  baseColorsToVariables,
  colorsToVariables,
} from "./toVariables/colorsToVariables";
import { colorsVisualDisplay } from "./visualDisplay/colorsVisualDisplay";
import { borderToVariables } from "./toVariables/borderToVariables";
import { spacingsToVariables } from "./toVariables/spacingsToVariables";
import { spacingVisualDisplay } from "./visualDisplay/spacingVisualDisplay";
import { matchColorVariables } from "./toVariables/matchingLibrary";
// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

console.clear();
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 400, height: 600 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async (msg) => {
  if (msg.type === "colorToVariables") {
    const localCollections =
      await figma.variables.getLocalVariableCollectionsAsync();
    colorsToVariables(localCollections);
  } else if (msg.type === "drawBaseColor") {
    colorsVisualDisplay();
  } else if (msg.type === "spacingToVariables") {
    const localCollections =
      await figma.variables.getLocalVariableCollectionsAsync();
    spacingsToVariables(localCollections);
  } else if (msg.type === "borderRadiusVariable") {
    const localCollections =
      await figma.variables.getLocalVariableCollectionsAsync();
    borderToVariables(localCollections);
  } else if (msg.type === "drawSpacing") {
    spacingVisualDisplay();
  } else if (msg.type === "baseColorsVariable") {
    const localCollections =
      await figma.variables.getLocalVariableCollectionsAsync();
    await figma.variables.getLocalVariableCollectionsAsync();
    if (localCollections !== undefined) {
      baseColorsToVariables(localCollections);
    }
  } else if (msg.type === "matchColorVariables") {
    const localCollections =
      await figma.variables.getLocalVariableCollectionsAsync();
    matchColorVariables(localCollections);
  }
};
