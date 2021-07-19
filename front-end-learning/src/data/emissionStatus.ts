interface CurrentEmissionStatus {
  state: "current";
}

interface PastEmissionStatus {
  state: "past";
}

export type EmissionStatus = PastEmissionStatus | CurrentEmissionStatus;
