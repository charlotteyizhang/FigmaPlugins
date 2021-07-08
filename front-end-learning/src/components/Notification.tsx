import React from "react";
import { css } from "@emotion/css";
import { themeSpacing } from "../basicStyle/spacing";
import { ChargeNow } from "./ChargeNow";

export const Notification = () => {
  return (
    <div className={styles.notification}>
      <div className={styles.notificationTitle}>
        <h1>The recommended time to charge is</h1>
        <h1>09:30 - 12:30</h1>
      </div>
      <ChargeNow width="100%" />
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
    flex: 1,
    flexBasis: "auto",
    marginBottom: themeSpacing.large,
    padding: themeSpacing.default,
  }),
  notificationTitle: css({
    position: "absolute",
    h1: {
      color: "#555761",
      marginBottom: "0.5rem",
    },
  }),

// @media screen and (maxWidth:1000px) {
//   notification: css({
//     backgroundColor:"pink",
//   }),
// }
};
