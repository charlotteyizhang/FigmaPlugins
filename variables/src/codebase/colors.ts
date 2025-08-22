export const baseColors = {
  primaryBlue: {
    lighter: "#c3d5e7",
    light: "#3773af",
    base: "#264d74",
    dark: "#14273a",
    darkModePrimary: "#4FA0F0",
  },
  green: {
    light: "#15EBA6",
    lighter: "#A8E5D1",
    base: "#0FBE86",
    dark: "#007759",
  },
  twilight: {
    light: "#6F7678",
    base: "#172939",
    dark: "#021526",
    darkModePrimary: "#313B44",
    darkModeBase: "#162837",
  },
  skyBlue: {
    dark: "#186383",
    base: "#43B4E4",
    light: "#C7E9F7",
  },
  purple: {
    light: "#7981DC",
    lighter: "#cdd0ef",
    base: "#3F51CF",
    dark: "#26317F",
  },
  violet: {
    lighter: "#ECD2F8",
    light: "#D9A6F0",
    base: "#C57CE8",
    dark: "#9E29D5",
  },
  red: {
    dark: "#953838",
    base: "#FF5E5E",
    light: "#FF8A8A",
    lighter: "#FFABAB",
  },
  yellow: {
    dark: "#906E05",
    base: "#F3B30B",
    light: "#F5C954",
    lighter: "#FBE9BB",
  },
  black: {
    pure: "#000000",
    high: "#2D2D2C",
    medium: "#5A5A58",
    disabled: "#828381",
    inactive: "#C7C8C7",
  },
  white: {
    high: "#FFFFFF",
    medium: "#FFFFFFB3",
    disabled: "#838383",
    inactive: "#FFFFFF99",
  },
  grey: {
    dark: "#E1E3DF",
    light: "#FAFAFA",
    divider: "#ECEDEB",
  },
};

export interface Color {
  r: number;
  g: number;
  b: number;
}

export const hexToRgb = (hexcolor: string): Color => {
  const str = hexcolor.slice(1);
  const indent = 2;
  const r = parseInt(str.substring(0, 0 + indent), 16);
  const g = parseInt(str.substring(2, 2 + indent), 16);
  const b = parseInt(str.substring(4, 4 + indent), 16);
  return {
    r,
    g,
    b,
  };
};

interface HexAlpha {
  hexcolor: string;
  alpha: Alpha;
}

type Alpha = "high" | "mid" | "low";
export const alphaArray = {
  high: 0.6,
  mid: 0.45,
  low: 0.2,
} as const;

export const getRgbaFromHexcolor = ({ hexcolor, alpha }: HexAlpha): string => {
  const rgb = hexToRgb(hexcolor);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alphaArray[alpha]})`;
};
