import React from "react";
import { css } from "@emotion/css";
import { themeSpacing } from "../basicStyle/spacing";

export const LineForecast = () => {
  return (
    <div className={styles.forecast}>
      <h2>Carbon intensity forecast</h2>
    </div>
  );
};

const styles = {
  forecast: css({
    backgroundColor: "white",
    border: "1px solid #E8E8E8",
    display: "flex",
    flex: 1,
    padding: "1rem",
    h2: {
      color: "#555761",
      marginBottom: "0.5rem",
    },
  }),
};