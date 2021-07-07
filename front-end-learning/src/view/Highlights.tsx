import React from "react";
import { css } from "@emotion/css";
import { themeSpacing } from "../basicStyle/spacing";
import { Notification } from "../components/Notification";
import { LineForecast } from "../components/LineForecast";

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
    position: "fixed",
    right: 0,
    flexDirection: "column",
    width: "84vw",
    padding: "2rem",
    overflow: "scroll",
  }),
};
