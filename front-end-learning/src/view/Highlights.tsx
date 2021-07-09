import React from "react";
import { css } from "@emotion/css";
import { themeSpacing } from "../basicStyle/spacing";
import { Notification } from "../components/Notification";
import { LineForecast } from "../components/LineForecast";
import { BurgerMenu } from "../components/BurgerMenu";

export const Highlights = () => {
  return (
    <div className={styles.highlights}>
      <Notification />
      <LineForecast />
    </div>
  );
};

const styles = {
  highlights: css({
    display: "flex",
    flexDirection: "column",
    width: "84vw",
    padding: "2rem",
    overflowY: "scroll",
    [`@media screen and (max-width: 650px) `]: {
      transition: "all 0.5s ease-in-out",
      width: "100%",
    },
  }),
};
