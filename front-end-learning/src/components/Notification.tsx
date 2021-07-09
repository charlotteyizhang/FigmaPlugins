import React from "react";
import { css, keyframes } from "@emotion/css";
import { themeSpacing } from "../basicStyle/spacing";
import { ChargeNow } from "./ChargeNow";

export const Notification = () => {
  return (
    <div className={styles.notification}>
      <div className={styles.notificationTitle}>
        <h1>The recommended time to charge is</h1>
        <h1>09:30 - 12:30</h1>
      </div>
      <div className={styles.illustration1}>
        <ChargeNow
          width="100%"
          height="100%"
          text="CHARGE NOW"
          colour="#A8CB68"
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
        fontSize: "1.3rem",
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
  }),
};
