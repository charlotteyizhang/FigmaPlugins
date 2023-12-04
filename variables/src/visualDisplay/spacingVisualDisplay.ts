import * as Spacing from "../codebase/spacings";
import * as Colors from "../codebase/colors";
export const spacingVisualDisplay = () => {
  const visibleArea = figma.viewport.bounds;
  const initialX = visibleArea.x;
  const initialY = visibleArea.y;
  const rectangles: Array<GroupNode> = [];

  Object.entries(Spacing.spacing).reduce((acc, [key, value], index) => {
    if (value === 0) {
      return acc;
    }
    const rect = drawRect(key, value, {
      x: initialX,
      y: initialY + index * 164,
    });
    rect !== undefined && acc.push(rect);
    return acc;
  }, rectangles);

  const group = figma.group(rectangles, figma.currentPage);
  group.name = "spacing";
  figma.viewport.scrollAndZoomIntoView([group]);
  figma.currentPage.selection = [group];
};

const fontSize = 12;
const textGap = 164;

const drawRect = (
  spacingName: string,
  spacing: number,
  position: {
    x: number;
    y: number;
  }
): GroupNode | undefined => {
  const rgb = Colors.hexToRgb(Colors.backgroundColors.light.primary);
  if (!Number.isNaN(rgb.r) && !Number.isNaN(rgb.g) && !Number.isNaN(rgb.b)) {
    const rectShape = figma.createRectangle();
    const textName = figma.createText();
    const textValue = figma.createText();
    const divider = figma.createRectangle();
    rectShape.x = position.x;
    rectShape.y = position.y;

    divider.x = position.x - 16;
    divider.y = position.y + 64;

    const textOffsetY = position.y - fontSize * 0.5;
    textName.x = position.x + textGap;
    textName.y = textOffsetY;
    textValue.x = position.x + textGap * 2;
    textValue.y = textOffsetY;

    figma.loadFontAsync({ family: "Inter", style: "Regular" }).then(() => {
      textName.fontSize = fontSize;
      textName.textAlignHorizontal = "CENTER";
      textName.characters = spacingName;
      textName.fills = [
        {
          type: "SOLID",
          color: {
            b: 0,
            g: 0,
            r: 0,
          },
        },
      ];
      textValue.fontSize = fontSize;
      textValue.textAlignHorizontal = "CENTER";
      textValue.characters = spacingName;
      textValue.fills = [
        {
          type: "SOLID",
          color: {
            b: 0,
            g: 0,
            r: 0,
          },
        },
      ];
    });

    rectShape.resize(spacing, spacing);
    divider.resize(textGap * 3, 2);

    rectShape.fills = [
      {
        type: "SOLID",
        color: {
          b: rgb.b / 255,
          g: rgb.g / 255,
          r: rgb.r / 255,
        },
      },
    ];

    divider.fills = [
      {
        type: "SOLID",
        color: {
          b: 0.8,
          g: 0.8,
          r: 0.8,
        },
      },
    ];

    const group = figma.group(
      [textName, rectShape, textValue, divider],
      figma.currentPage
    );
    group.name = spacingName;
    return group;
  }
};
