import { absurd } from "fp-ts/function";

export enum Step {
  start = 0,
  second = 1,
  specialSilver = 2,
  forth = 3,
  unlockTime = 4,
  fifth = 5,
  sixth = 6,
  goDirectly = 7,
  back4 = 8,
  unlockAddress = 9,
  tenth = 10,
  specialGolden = 11,
  last = 12,
}

export interface Position {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Playing {
  kind: "playing";
}

interface End {
  kind: "end";
}

export type State = Playing | End;

export const foldState =
  <T>(fns: { onPlaying: () => T; onEnd: () => T }) =>
  (s: State): T => {
    switch (s.kind) {
      case "playing": {
        return fns.onPlaying();
      }
      case "end": {
        return fns.onEnd();
      }
      default:
        return absurd(s);
    }
  };
