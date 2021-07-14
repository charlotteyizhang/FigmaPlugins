interface ChargeStatusNow {
  state: "now";
  time: Time;
}

interface ChargeStatusSoon {
  state: "soon";
  time: Time;
}

interface ChargeStatusLater {
  state: "later";
  time: Time;
}

interface ChargeStatusLoading {
  state: "loading";
}

interface ChargeStatusError {
  state: "error";
}

export interface Time {
  from: string;
  to: string;
}

export type ChargeStatus =
  | ChargeStatusNow
  | ChargeStatusSoon
  | ChargeStatusLater
  | ChargeStatusLoading
  | ChargeStatusError;
