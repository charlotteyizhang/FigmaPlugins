interface ChargeStatusNow {
  state: "now";
  time: {
    from: string;
    to: string;
  };
}

interface ChargeStatusSoon {
  state: "soon";
  time: {
    from: string;
    to: string;
  };
}
interface ChargeStatusLoading {
  state: "loading";
}
interface ChargeStatusError {
  state: "error";
}

export type ChargeStatus =
  | ChargeStatusNow
  | ChargeStatusSoon
  | ChargeStatusLoading
  | ChargeStatusError;
