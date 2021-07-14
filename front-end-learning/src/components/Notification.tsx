import React, { useState, useEffect } from "react";
import { css } from "@emotion/css";
import { themeSpacing } from "../basicStyle/spacing";
import { ChargeNow } from "./ChargeNow";
import { ChargeStatus, Time } from "../data/chargeStatus";
import { LoadingNotif } from "./LoadingNotif";
import { ErrorNotif } from "./ErrorNotif";
import { time } from "console";

interface NotificationProps {}
const makeTimeFromResponse = ({ from, to }: Time): Time => {
  const intl = new Intl.DateTimeFormat("en-GB", { timeStyle: "short" });
  return {
    from: intl.format(new Date(from)),
    to: intl.format(new Date(to)),
  };
};

// long hand
// const x = {
//   name: "takle",
// };

// short hand
// const name = "takle";
// const a = { name };

const chargeStatusFromData = (response: any): ChargeStatus => {
  const {
    intensity: { index, actual, forecast },
    // ...rest -- all the keys not explicitly mentioned so from and to
    from,
    to,
  } = response.data[0];
  const time = makeTimeFromResponse({ from, to });
  switch (index) {
    case "very low":
    case "low":
    case "moderate":
      return { state: "now", time };
    case "high":
      return { state: "soon", time };
    case "very high":
      return { state: "later", time };
    // add case for error
    default:
      return { state: "loading" };
  }
};

export const Notification = ({}: NotificationProps) => {
  const [chargeStatus, setChargeStatus] = useState<ChargeStatus>({
    state: "loading",
  });

  useEffect(() => {
    fetch("https://api.carbonintensity.org.uk/intensity")
      .then((response) => response.json())
      .then((data) => {
        setChargeStatus(chargeStatusFromData(data));
      });
  }, []);

  const title =
    chargeStatus.state === "now" ||
    chargeStatus.state === "soon" ||
    chargeStatus.state === "later" ? (
      <div className={styles.notificationTitle}>
        <h1>The recommended time to charge is: </h1>
        <h1>{` ${chargeStatus.time.from} - ${chargeStatus.time.to}`}</h1>
      </div>
    ) : null;

  return (
    <div className={styles.notification}>
      {title}
      <div className={styles.illustration1}>
        {chargeStatus.state === "now" ||
        chargeStatus.state === "soon" ||
        chargeStatus.state === "later" ? (
          <ChargeNow width="100%" height="100%" chargeStatus={chargeStatus} />
        ) : chargeStatus.state === "loading" ? (
          <LoadingNotif />
        ) : (
          <ErrorNotif
            width="100%"
            height="100%"
            text="Oops...there has been an error!"
          />
        )}
      </div>
    </div>
  );
};

const styles = {
  notification: css({
    position: "relative",
    backgroundColor: "white",
    border: "1px solid #E8E8E8",
    display: "flex",
    flexDirection: "column",
    marginBottom: themeSpacing.large,
    padding: themeSpacing.large,
    [`@media screen and (max-width: 650px) `]: {
      transition: "all 0.5s ease-in-out",
      width: "100%",
      height: "160px",
      padding: themeSpacing.default,
    },
  }),
  notificationTitle: css({
    position: "absolute",
    h1: {
      color: "#555761",
      marginBottom: "0.5rem",
      [`@media screen and (max-width: 900px) `]: {
        transition: "all 0.5s ease-in-out",
        fontSize: "1.8rem",
      },
      [`@media screen and (max-width: 800px) `]: {
        transition: "all 0.5s ease-in-out",
        fontSize: "1.5rem",
      },
      [`@media screen and (max-width: 726px) `]: {
        transition: "all 0.5s ease-in-out",
        fontSize: "1.4rem",
      },
      [`@media screen and (max-width: 650px) `]: {
        transition: "all 0.5s ease-in-out",
        fontSize: "1.2rem",
      },
    },
  }),
  illustration1: css({
    width: "100%",
    display: "flex",
    flex: 1,
    animation: "lineAnimation 5s infinite",
    [`@media screen and (max-width: 1000px) `]: {
      transition: "all 0.5s ease-in-out",
      paddingTop: themeSpacing.large,
    },
    [`@media screen and (max-width: 650px) `]: {
      transition: "all 0.5s ease-in-out",
      paddingTop: "1rem",
    },
  }),
};
