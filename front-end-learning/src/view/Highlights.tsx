import React from "react";
import { css } from "@emotion/css";
import { themeSpacing } from "../basicStyle/spacing";
import { Notification } from "../components/Notification";
import { LineForecast } from "../components/LineForecast";
import { BurgerMenu } from "../components/BurgerMenu";
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
    flexDirection: "column",
    width: "84vw",
    padding: "0 2rem",
    overflowY: "scroll",
    [`@media screen and (max-width: 650px) `]: {
      transition: "all 0.5s ease-in-out",
      width: "100%",
    },
  }),
  highlight: css({
    paddingTop: themeSpacing.large,
  }),
  co2Emissions: css({
    paddingTop: themeSpacing.large,
  }),
  carbonIntensity: css({
    paddingTop: themeSpacing.large,
  }),
};
