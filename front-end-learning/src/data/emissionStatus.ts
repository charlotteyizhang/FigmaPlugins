interface CurrentEmissionStatus {
  state: "current";
}

interface PastEmissionStatus {
  state: "past";
}

export type EmissionStatus = PastEmissionStatus | CurrentEmissionStatus;

export const makePastEmissionStatus = (): PastEmissionStatus => {
  return { state: "past" };
};

export const makeCurrentEmissionStatus = (): CurrentEmissionStatus => {
  return { state: "current" };
};
