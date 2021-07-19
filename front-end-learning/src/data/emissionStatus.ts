interface CurrentEmissionStatus {
  state: "current";
}

interface PastEmissionStatus {
  state: "past";
}

export type EmissionStatus = PastEmissionStatus | CurrentEmissionStatus;

export const makePastEmissionStatus = (): CurrentEmissionStatus => {
  return { state: "current" };
};

export const makeCurrentEmissionStatus = (): PastEmissionStatus => {
  return { state: "past" };
};
