import { css } from "@emotion/css";

export const themeSpacing = {
    small: "0.5rem",
    default: "1rem",
    large: "2rem",
};

export const containerWithGap = {
    row: css({
        ">*": {
          marginLeft: themeSpacing.small,
        },
        ">*:first-child": {
          marginLeft: 0,
        },
      }),
      rowLarge: css({
        ">*": {
          marginLeft: themeSpacing.default,
        },
        ">*:first-child": {
          marginLeft: 0,
        },
      }),
      column: css({
        ">*": { marginTop: themeSpacing.small },
        ">*:first-child": { marginTop: 0 },
      }),
}