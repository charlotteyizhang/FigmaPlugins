import React from "react";
import { css } from "@emotion/css";
import { themeSizing } from "../basicStyle/styling";
import { Notification } from "../components/Notification";
import { LineForecast } from "../components/LineForecast";
import { Emissions } from "../components/Emissions";

export const Highlights = () => {
  return (
    <div className={styles.highlights}>
      <div id="highlight" className={styles.highlight}></div>
      <Notification />
      <div id="co2Emissions" className={styles.co2Emissions}></div>
      <Emissions />
      <div id="carbonIntensity" className={styles.carbonIntensity}></div>
      <LineForecast />
    </div>
  );
};

const styles = {
  highlights: css({
    display: "flex",
    zIndex: 0,
    flexDirection: "column",
    width: "84vw",
    padding: "0 1.5rem",
    overflowY: "scroll",
    [`@media screen and (max-width: 650px) `]: {
      transition: "all 0.5s ease-in-out",
      width: "100%",
    },
  }),
  highlight: css({
    paddingTop: themeSizing.large,
  }),
  co2Emissions: css({
    paddingTop: themeSizing.large,
  }),
  carbonIntensity: css({
    paddingTop: themeSizing.large,
  }),
};
