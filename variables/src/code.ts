// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

import { createColor } from "./colorsToVariables";
import { colorsVisualDisplay } from "./colorsVisualDisplay";
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
    createColor(localCollections);
  } else if (msg.type === "drawBaseColor") {
    colorsVisualDisplay();
  }
};
