import React from "react";
import { css } from "@emotion/css";
import { themeSpacing } from "../basicStyle/spacing";
import LineGraph from "../img/LineGraph.png";
import Pointer from "../img/Pointer.svg";
import NonRenewKey from "../img/NonRenewKey.svg";
import RenewKey from "../img/RenewKey.svg";

export const LineForecast = () => {
  return (
    <div className={styles.forecast}>
      <h2>Carbon intensity forecast</h2>
      <hr></hr>
      <div className={styles.linegraph}>
        <img src={LineGraph} alt="line graph" />
        <div className={styles.keys}>
          <div className={styles.key}>
            <img src={RenewKey} alt="renewable fuel key" />
            <p>Renewable Energy Intensity</p>
          </div>
          <div className={styles.key}>
            <img src={NonRenewKey} alt="non renewable fuel key" />
            <p>Non-Renewable Energy Intensity</p>
          </div>
          <div className={styles.key}>
            <img src={Pointer} alt="current fuel pointer" />
            <p>Current Carbon Intensity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  forecast: css({
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
  linegraph: css({
    flex: 1,
    display: "flex",
    flexDirection: "row",
    paddingRight: themeSpacing.default,
    img: {
      width: "60%",
    },
    [`@media screen and (max-width: 950px)`]: {
      flexDirection: "column",
      img: {
        width: "100%",
        height: "100%",
      },
    },
    [`@media screen and (max-width: 650px)`]: {
      flexDirection: "column",
      img: {
        width: "110%",
        height: "110%",
      },
    },
  }),
  keys: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingTop: themeSpacing.default,
    paddingLeft: themeSpacing.default,
    img: {
      width: "30px",
      height: "30px",
    },
    [`@media screen and (max-width: 950px)`]: {
      flexDirection: "row",
      justifyContent: "center",
      img: {
        width: "20px",
        height: "20px",
      },
    },
    [`@media screen and (max-width: 650px)`]: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      img: {
        width: "12px",
        height: "12px",
      },
      p: {
        fontSize: "10px",
      },
    },
  }),
  key: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    p: {
      fontSize: "14px",
      paddingLeft: themeSpacing.default,
    },
    [`@media screen and (max-width: 950px)`]: {
      justifyContent: "flex-start",
      p: {
        fontSize: "12px",
        paddingBottom: themeSpacing.default,
      },
    },
  }),
};
