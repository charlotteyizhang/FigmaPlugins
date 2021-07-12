import React, { useState, useEffect } from "react";
import { css, keyframes } from "@emotion/css";
import { themeSpacing } from "../basicStyle/spacing";
import { ChargeNow } from "./ChargeNow";
interface NotificationProps {}
type Color = "#A8CB68" | "pink";
type ChargeStatus = "now" | "soon" | "loading" | "error";
const textFromChargeStatus = (chargeStatus: ChargeStatus): string => {
  switch (chargeStatus) {
    case "now":
      return "charge now";
    case "soon":
      return "charge soon";
    case "loading":
      return "loading";
    case "error":
      return "error";

    default:
      const x: never = chargeStatus;
      return x;
  }
};
const colorFromChargeStatus = (chargeStatus: ChargeStatus): string => {
  switch (chargeStatus) {
    case "now":
      return "#A8CB68";
    case "soon":
      return "#F1B434";
    case "loading":
      return "pink";
    case "error":
      return "#BA1731";

    default:
      const x: never = chargeStatus;
      return x;
  }
};

const chargeStatusFromData = (data: any): ChargeStatus => {
  const intensity = data.data[0].intensity.index;
  console.log({ data, intensity });

  switch (intensity) {
    case "very low":
    case "low":
      return "now";
    case "moderate":
      return "soon";
    case "high":
    case "very high":
      return "loading";

    default:
      return "error";
  }
};

// 'very low', 'low', 'moderate', 'high', 'very high'

export const Notification = ({}: NotificationProps) => {
  const [chargeStatus, setChargeStatus] = useState<ChargeStatus>("loading");

  useEffect(() => {
    fetch("https://api.carbonintensity.org.uk/intensity")
      .then((response) => response.json())
      .then((data) => {
        setChargeStatus(chargeStatusFromData(data));
      });
  }, []);
  return (
    <div className={styles.notification}>
      <div className={styles.notificationTitle}>
        <h1>The recommended time to charge is: 9:30 - 12:30</h1>
      </div>
      <div className={styles.illustration1}>
        <ChargeNow
          width="100%"
          height="100%"
          text={textFromChargeStatus(chargeStatus)}
          color={colorFromChargeStatus(chargeStatus)}
        />
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
