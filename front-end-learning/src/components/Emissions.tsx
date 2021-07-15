import React, { useState, useEffect } from "react";
import { css } from "@emotion/css";
import { themeSpacing } from "../basicStyle/spacing";

export const Emissions = () => {
  return (
    <div className={styles.emissions}>
      <h2>Current Percentage CO₂ Emission</h2>
      <hr></hr>
      <div className={styles.percentage}>
        <p>0%</p>
        <p>100%</p>
      </div>
      <div className={styles.chart}>{/* <input type="range" /> */}</div>
      <table className={styles.table}>
        <tr>
          <th></th>
          <th>Fuel Type</th>
          <th>% Emissions</th>
        </tr>
        <tr>
          <td>Icon 1</td>
          <td>Biomass</td>
          <td>%</td>
        </tr>
      </table>
    </div>
  );
};

const styles = {
  emissions: css({
    backgroundColor: "white",
    border: "1px solid #E8E8E8",
    padding: themeSpacing.large,
    h2: {
      color: "#555761",
      marginBottom: themeSpacing.default,
    },
    hr: {
      color: "#39393B",
      opacity: "0.3",
      marginBottom: themeSpacing.default,
    },
    [`@media screen and (max-width: 650px) `]: {
      transition: "all 0.5s ease-in-out",
      width: "100%",
      padding: themeSpacing.default,
      h2: {
        fontSize: "1.2rem",
      },
    },
  }),
  percentage: css({
    display: "flex",
    justifyContent: "space-between",
  }),
  chart: css({
    backgroundColor: "pink",
    border: "1px solid black",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    paddingBottom: themeSpacing.default,
  }),
  table: css({
    // display: "flex",
    // flexDirection: "row",
    paddingTop: themeSpacing.default,
    width: "100%",
    textAlign: "left",
  }),
};
