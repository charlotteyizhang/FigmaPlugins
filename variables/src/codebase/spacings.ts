export type SpaceKind = keyof typeof spacing;

export const spacing = {
  none: 0,
  xSmall: 4,
  small: 8,
  medium: 12,
  default: 16,
  large: 24,
  xLarge: 32,
  xxLarge: 40,
} as const;

// TODO: this should be 44
// https://developer.apple.com/design/human-interface-guidelines/buttons#Best-practices
export const buttonTouchAreaMinSize = spacing.xxLarge;
