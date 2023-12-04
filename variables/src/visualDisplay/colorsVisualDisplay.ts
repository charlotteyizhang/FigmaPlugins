import * as Colors from "../codebase/colors";

import { flattenObjKey, getContrastRGB } from "../common";

export const colorsVisualDisplay = () => {
  const visibleArea = figma.viewport.bounds;
  const initialX = visibleArea.x;
  const initialY = visibleArea.y;
  const rectangles: Array<GroupNode> = [];
  Object.entries(Colors.baseColors).reduce((acc, [key, value], index) => {
    const x = flattenObjKey(key, value);

    x.map((v, idx) => {
      const rect = drawRect(v.name, v.value, {
        x: initialX + index * rectSize.w + 100 * index,
        y: initialY + idx * rectSize.h,
      });
      rect !== undefined && acc.push(rect);
    });
    return acc;
  }, rectangles);

  const group = figma.group(rectangles, figma.currentPage);
  group.name = "colorPalette";
  figma.viewport.scrollAndZoomIntoView([group]);
  figma.currentPage.selection = [group];
};

const rectSize = {
  w: 200,
  h: 300,
};
const fontSize = 12;
const drawRect = (
  colorName: string,
  color: string,
  position: {
    x: number;
    y: number;
  }
): GroupNode | undefined => {
  const rgb = Colors.hexToRgb(color);
  if (!Number.isNaN(rgb.r) && !Number.isNaN(rgb.g) && !Number.isNaN(rgb.b)) {
    const rect = figma.createRectangle();
    const text = figma.createText();
    rect.x = position.x;
    rect.y = position.y;
    text.x = position.x + rectSize.w * 0.5;
    text.y = position.y + rectSize.h * 0.5;
    figma.loadFontAsync({ family: "Inter", style: "Regular" }).then(() => {
      text.fontSize = fontSize;
      text.textAlignHorizontal = "CENTER";
      text.characters = colorName;
      text.fills = [{ type: "SOLID", color: getContrastRGB(rgb) }];
    });

    rect.resize(rectSize.w, rectSize.h);

    // Set solid red fill
    rect.fills = [
      {
        type: "SOLID",
        color: {
          b: rgb.b / 255,
          g: rgb.g / 255,
          r: rgb.r / 255,
        },
      },
    ];
    const group = figma.group([text, rect], figma.currentPage);
    group.name = colorName;
    return group;
  }
};
