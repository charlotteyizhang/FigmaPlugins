export const baseColors = {
  primaryBlue: {
    lighter: "#c3d5e7",
    light: "#3773af",
    base: "#264d74",
    dark: "#14273a",
    darkModePrimary: "#4FA0F0",
    darkModeGrey: "#49617A",
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
    medium: "#F9F9F9",
    disabled: "#838383",
  },
  grey: {
    dark: "#E1E3DF",
    light: "#FAFAFA",
    divider: "#ECEDEB",
  },
};

export const backgroundColors = {
  light: {
    overlay: baseColors.black.high,
    loadingSkeletonDark: baseColors.black.medium,
    medium: baseColors.grey.dark,
    screen: baseColors.grey.light,
    card: baseColors.white.high,
    primary: baseColors.primaryBlue.base,
    primaryLighter: baseColors.primaryBlue.lighter,
    tips: baseColors.primaryBlue.lighter,
    brand: baseColors.twilight.base,
    disabled: baseColors.black.disabled,
    disabledLighter: baseColors.grey.divider,
    tabBar: baseColors.grey.light,
    highlight: baseColors.white.high,
    shadow: baseColors.black.high,
  },
  dark: {
    overlay: baseColors.twilight.light,
    loadingSkeletonDark: baseColors.grey.light,
    medium: baseColors.twilight.light,
    screen: baseColors.twilight.dark,
    card: baseColors.twilight.darkModeBase,
    primary: baseColors.primaryBlue.darkModePrimary,
    primaryLighter: baseColors.primaryBlue.lighter,
    tips: baseColors.primaryBlue.base,
    brand: baseColors.twilight.base,
    disabled: baseColors.white.disabled,
    disabledLighter: baseColors.twilight.darkModePrimary,
    tabBar: baseColors.twilight.dark,
    highlight: baseColors.white.high,
    shadow: baseColors.twilight.light,
  },
};

export const textColors = {
  light: {
    primary: baseColors.primaryBlue.base,
    primaryLunarPower: baseColors.primaryBlue.light,
    primaryGrid: baseColors.violet.base,
    secondary: baseColors.twilight.light,
    highlight: baseColors.white.high,
    default: baseColors.black.high,
    overlayLabel: baseColors.white.high,
    segmentControlActive: baseColors.white.high,
  },
  dark: {
    primary: baseColors.primaryBlue.darkModePrimary,
    primaryLunarPower: baseColors.primaryBlue.darkModePrimary,
    primaryGrid: baseColors.violet.base,
    secondary: baseColors.white.medium,
    highlight: baseColors.white.high,
    default: baseColors.white.high,
    overlayLabel: baseColors.white.high,
    segmentControlActive: baseColors.white.high,
  },
};

export const chartColors = {
  light: {
    gridLine: baseColors.grey.divider,
    zeroLine: baseColors.black.medium,
    support: baseColors.primaryBlue.light,
    production: {
      base: baseColors.yellow.base,
      light: baseColors.yellow.lighter,
      area: baseColors.yellow.light,
    },
    solar: {
      base: baseColors.yellow.base,
      light: baseColors.yellow.lighter,
    },
    grid: {
      base: baseColors.purple.light,
      light: baseColors.purple.lighter,
      offGrid: baseColors.red.base,
      background: baseColors.black.inactive,
      vpp: baseColors.green.base,
      area: baseColors.purple.light,
    },
    offGridEvent: baseColors.black.inactive,
    consumption: {
      base: baseColors.skyBlue.base,
      light: baseColors.skyBlue.light,
      area: baseColors.skyBlue.light,
    },
    home: {
      lunarPower: baseColors.primaryBlue.light,
      lunarPowerPredicted: baseColors.primaryBlue.lighter,
      grid: baseColors.violet.base,
      gridPredicted: baseColors.violet.lighter,
      export: baseColors.primaryBlue.base,
      exportPredicted: baseColors.black.inactive,
    },
    storage: {
      base: baseColors.green.base,
      light: baseColors.green.lighter,
      area: baseColors.green.lighter,
    },
    inverter: {
      base: baseColors.green.dark,
    },
    inactive: baseColors.black.inactive,
    savings: {
      selected: baseColors.primaryBlue.base,
      unselected: baseColors.primaryBlue.lighter,
      energyFromGrid: baseColors.purple.light,
      energyFromLunar: baseColors.green.base,
      energyFromGridPrediction: baseColors.purple.lighter,
      energyFromLunarPrediction: baseColors.green.lighter,
      eco: baseColors.green.dark,
    },
    tariff: {
      high: baseColors.red.base,
      mid: baseColors.primaryBlue.light,
      low: baseColors.skyBlue.light,
      lowest: baseColors.green.light,
      general: baseColors.primaryBlue.dark,
    },
    devices: [
      baseColors.violet.base,
      baseColors.yellow.base,
      baseColors.green.base,
      baseColors.purple.base,
      baseColors.skyBlue.base,
      baseColors.red.dark,
    ],
  },
  dark: {
    gridLine: baseColors.black.disabled,
    zeroLine: baseColors.white.high,
    support: baseColors.primaryBlue.darkModePrimary,
    production: {
      base: baseColors.yellow.base,
      light: baseColors.yellow.lighter,
      area: baseColors.yellow.light,
    },
    solar: {
      base: baseColors.yellow.base,
      light: baseColors.yellow.lighter,
    },
    grid: {
      base: baseColors.purple.light,
      light: baseColors.purple.lighter,
      offGrid: baseColors.red.base,
      background: baseColors.black.inactive,
      vpp: baseColors.green.base,
      area: baseColors.purple.base,
    },
    offGridEvent: baseColors.black.inactive,
    consumption: {
      base: baseColors.skyBlue.base,
      light: baseColors.skyBlue.light,
      area: baseColors.skyBlue.base,
    },
    home: {
      lunarPower: baseColors.primaryBlue.light,
      lunarPowerPredicted: baseColors.primaryBlue.darkModePrimary,
      grid: baseColors.violet.base,
      gridPredicted: baseColors.violet.light,
      export: baseColors.primaryBlue.base,
      exportPredicted: baseColors.primaryBlue.darkModeGrey,
    },
    storage: {
      base: baseColors.green.base,
      light: baseColors.green.lighter,
      area: baseColors.green.light,
    },
    inverter: {
      base: baseColors.green.lighter,
    },
    inactive: baseColors.twilight.light,
    savings: {
      selected: baseColors.primaryBlue.darkModePrimary,
      unselected: baseColors.primaryBlue.lighter,
      energyFromGrid: baseColors.purple.light,
      energyFromLunar: baseColors.green.base,
      energyFromGridPrediction: baseColors.purple.lighter,
      energyFromLunarPrediction: baseColors.green.lighter,
      eco: baseColors.green.dark,
    },
    tariff: {
      high: baseColors.red.base,
      mid: baseColors.primaryBlue.light,
      low: baseColors.skyBlue.light,
      lowest: baseColors.green.light,
      general: baseColors.primaryBlue.lighter,
    },
    devices: [
      baseColors.violet.base,
      baseColors.yellow.base,
      baseColors.green.base,
      baseColors.purple.base,
      baseColors.skyBlue.base,
      baseColors.red.light,
    ],
  },
};

export const meterColors = {
  light: {
    background: baseColors.black.inactive,
    base: baseColors.primaryBlue.base,
  },
  dark: {
    background: baseColors.black.inactive,
    base: baseColors.primaryBlue.base,
  },
};
export const sliderColors = {
  light: {
    reserve: baseColors.green.base,
    mode: baseColors.primaryBlue.base,
    battery: baseColors.primaryBlue.base,
  },
  dark: {
    reserve: baseColors.green.light,
    mode: baseColors.primaryBlue.darkModePrimary,
    battery: baseColors.primaryBlue.darkModePrimary,
  },
};

export const gridRecordColors = {
  light: {
    imported: baseColors.purple.light,
    exported: baseColors.green.base,
    base: baseColors.grey.dark,
  },
  dark: {
    imported: baseColors.purple.light,
    exported: baseColors.green.base,
    base: baseColors.grey.dark,
  },
};
export const batteryModeColors = {
  light: {
    smartMode: baseColors.purple.dark,
    backupMode: baseColors.primaryBlue.dark,
    selfConsumptionMode: baseColors.green.dark,
    timeOfUseMode: baseColors.twilight.base,
    planner: {
      idle: baseColors.black.inactive,
      balance: baseColors.green.base,
      charge: baseColors.skyBlue.base,
      discharge: baseColors.purple.base,
    },
  },
  dark: {
    smartMode: baseColors.purple.dark,
    backupMode: baseColors.primaryBlue.dark,
    selfConsumptionMode: baseColors.green.dark,
    timeOfUseMode: baseColors.twilight.base,
    planner: {
      idle: baseColors.black.inactive,
      balance: baseColors.green.base,
      charge: baseColors.skyBlue.base,
      discharge: baseColors.purple.base,
    },
  },
};

export const stateColors = {
  light: {
    inactive: baseColors.black.inactive,
    idle: baseColors.twilight.light,
    interactive: baseColors.primaryBlue.light,
    success: baseColors.green.base,
    warning: baseColors.yellow.base,
    error: baseColors.red.base,
    emphasis: baseColors.black.medium,
    info: baseColors.skyBlue.base,
    offGridTip: {
      success: baseColors.green.lighter,
      error: baseColors.red.lighter,
      inactive: baseColors.grey.divider,
      warning: baseColors.yellow.lighter,
    },
  },
  dark: {
    inactive: baseColors.black.inactive,
    idle: baseColors.twilight.light,
    interactive: baseColors.primaryBlue.darkModePrimary,
    success: baseColors.green.base,
    warning: baseColors.yellow.base,
    error: baseColors.red.base,
    emphasis: baseColors.white.medium,
    info: baseColors.skyBlue.base,
    offGridTip: {
      success: baseColors.green.base,
      error: baseColors.red.base,
      inactive: baseColors.grey.dark,
      warning: baseColors.yellow.base,
    },
  },
};

export const defaultEmphasisColors = {
  light: {
    backgroundColors: baseColors.primaryBlue.lighter,
    emphasis: baseColors.primaryBlue.base,
  },
  dark: {
    backgroundColors: baseColors.primaryBlue.lighter,
    emphasis: baseColors.primaryBlue.base,
  },
};

export const borderColors = {
  light: {
    primary: baseColors.primaryBlue.lighter,
    divider: baseColors.grey.divider,
    widgets: "transparent",
  },
  dark: {
    primary: baseColors.primaryBlue.lighter,
    divider: baseColors.grey.divider,
    widgets: baseColors.twilight.darkModePrimary,
  },
};

export const moonColors = {
  light: {
    moon: baseColors.primaryBlue.base,
    moonDarkSide: baseColors.grey.divider,
    moonPrediction: baseColors.primaryBlue.lighter,
  },
  dark: {
    moon: baseColors.primaryBlue.darkModePrimary,
    moonDarkSide: baseColors.black.inactive,
    moonPrediction: baseColors.primaryBlue.lighter,
  },
};

export const illustrationColors = {
  generic: {
    light: {
      white: "#FFFFFF",
      offWhite: "#FBFBFB",
      blueDark: "#2C75C0",
      blueBase: "#264D74",
      blueLight: "#3773AF",
      blueLighter: "#C3D5E7",
      greyDarkest: "#5A5A58",
      greyDark: "#C4CBCF",
      greyMid: "#C7C8C7",
      greyLight: "#D6DEE1",
      greyLighter: "#EEEEEE",
      red: "#FF5E5E",
      gold: "#F3B30B",
      green: "#0FBE86",
      black: "#2D2D2C",
      bgDark: "#174268",
    },
    dark: {
      white: "#FFFFFF",
      offWhite: "#FBFBFB",
      blueDark: "#1C5FA3",
      blueBase: "#4485C7",
      blueLight: "#92C0EE",
      blueLighter: "#C3D5E7",
      greyDarkest: "#5A5A58",
      greyDark: "#C4CBCF",
      greyMid: "#C7C8C7",
      greyLight: "#D6DEE1",
      greyLighter: "#EEEEEE",
      red: "#FF5E5E",
      gold: "#F3B30B",
      green: "#0FBE86",
      black: "#2D2D2C",
      bgDark: "#062E52",
    },
  },
  house: {
    light: {
      blue: {
        front: "#99C3FF",
        side: "#739CDB",
        top: "#7AB0F4",
        window: "#739CDB",
      },
      grey: {
        top: "#96A7BC",
        side: "#818C9E",
        front: "#ABBED9",
        window: "#222B45",
      },
      lunar: {
        front: "#CECECE",
        side: "#E1E0DC",
        solarPanel: "#C3D5E7",
        top: "#F0EFED",
        door: "#FBE9BB",
      },
    },
    dark: {
      blue: {
        front: "#99C3FF",
        side: "#739CDB",
        top: "#7AB0F4",
        window: "#739CDB",
      },
      grey: {
        top: "#96A7BC",
        side: "#818C9E",
        front: "#ABBED9",
        window: "#222B45",
      },
      lunar: {
        front: "#CECECE",
        side: "#E1E0DC",
        solarPanel: "#C3D5E7",
        top: "#F0EFED",
        door: "#FBE9BB",
      },
    },
  },
  ratePlan: {
    light: {
      green: "#A8E5D1",
      grey: "#C7C8C7",
      greyStroke: "#6F7678",
      purpleStroke: "#3F51CF",
      purpleBg: "#CDD0EF",
      greyElements: "#E1E3DF",
      greyBg: "#ECEDEB",
      goldLighter: "#FBE9BB",
    },
    dark: {
      green: "#A8E5D1",
      grey: "#E8E8E8",
      greyStroke: "#6F7678",
      purpleStroke: "#586BEF",
      purpleBg: "#E2E5FF",
      greyElements: "#E1E3DF",
      greyBg: "#ECEDEB",
      goldLighter: "#FBE9BB",
    },
  },
  characters: {
    light: {
      hairEyes: "#2E2E2C",
      greyBg: "#96A7BC",
      limbs: "#C3C4C3",
      background: "#E1E3DF",
      face: "#C7C8C7",
      faceFeatures: "#808080",
      purpleLight: "#7981DC",
      greyInstallerBattery: "#E9EAE8",
      blueInstallerBattery: "#0E619A",
      goldDark: "#FBAE00",
      capStroke: "#515150",
      redPadlock: "#C95357",
      yellowBase: "#E8B240",
      yellowDark: "#8A6F24",
    },
    dark: {
      hairEyes: "#525252",
      greyBg: "#E4F0FF",
      limbs: "#C3C4C3",
      background: "#E1E3DF",
      face: "#C7C8C7",
      faceFeatures: "#808080",
      purpleLight: "#7981DC",
      greyInstallerBattery: "#E9EAE8",
      blueInstallerBattery: "#0E619A",
      goldDark: "#FBAE00",
      capStroke: "#515150",
      redPadlock: "#C95357",
      yellowBase: "#E8B240",
      yellowDark: "#8A6F24",
    },
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
