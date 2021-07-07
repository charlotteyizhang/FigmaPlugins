import React from "react";
import { css } from "@emotion/css";
import { themeSpacing } from "../basicStyle/spacing";

export const Notification = () => {
  return (
    <div className={styles.notification}>
      <h1>The recommended time to charge is</h1>
      <h1>09:30 - 12:30</h1>
    </div>
  );
};

const styles = {
  notification: css({
    backgroundColor: "white",
    border: "1px solid #E8E8E8",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginBottom: "2rem",
    padding: "1rem",
    h1: {
      color: "#555761",
      marginBottom: "0.5rem",
    },
  }),
};
