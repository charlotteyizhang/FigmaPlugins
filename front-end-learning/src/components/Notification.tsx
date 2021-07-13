import React, { useState, useEffect } from "react";
import { css } from "@emotion/css";
import { themeSpacing } from "../basicStyle/spacing";
import { ChargeNow } from "./ChargeNow";
import { ChargeStatus } from "../data/chargeStatus";
import { time } from "console";

interface NotificationProps {}

const chargeStatusFromData = (data: any): ChargeStatus => {
  // const intensity = data.data[0].intensity.index;
  const intensity = data.data[0].intensity;
  const index = intensity.index;
  const actual = intensity.actual;
  const forecast = intensity.forecast;
  const from = data.data[0].from;
  const to = data.data[0].to;

  console.log({ data, intensity, index, actual, forecast });

  switch (index) {
    case "very low":
    case "low":
    case "moderate":
      return { state: "now", time: { from, to } };
    case "high":
      return { state: "soon", time: { from, to } };
    case "very high":
      return { state: "loading" };

    default:
      return { state: "error" };
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

  // const x = (data: any): string => data.data[0].from;
  return (
    <div className={styles.notification}>
      <div className={styles.notificationTitle}>
        <h1>
          The recommended time to charge is:{" "}
          {chargeStatus.state === "now" || chargeStatus.state === "soon"
            ? `${chargeStatus.time.from} - ${chargeStatus.time.to}`
            : "-"}
        </h1>
        {/* <h1>{x}</h1> */}
      </div>
      <div className={styles.illustration1}>
        <ChargeNow width="100%" height="100%" chargeStatus={chargeStatus} />
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
      paddingTop: "3rem",
    },
  }),
};
