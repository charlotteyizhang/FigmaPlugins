interface ActiveMobileStatus {
  state: "active";
}

interface InactiveMobileStatus {
  state: "inactive";
}

export type MobileStatus = ActiveMobileStatus | InactiveMobileStatus;

export const makeActiveMobileStataus = (): ActiveMobileStatus => {
  return { state: "active" };
};

export const makeInactiveMobileStataus = (): InactiveMobileStatus => {
  return { state: "inactive" };
};
