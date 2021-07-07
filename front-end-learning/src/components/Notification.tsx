import React from "react";
import { css } from "@emotion/css";
import { themeSpacing } from "../basicStyle/spacing";
import { url } from "inspector";
import ChargeNow from "../img/ChargeNow.svg";

export const Notification = () => {
  return (
    <div className={styles.notification}>
      <h1>The recommended time to charge is</h1>
      <h1>09:30 - 12:30</h1>
      {/* <img src={ChargeNow} alt="charge now" /> */}
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
    flexBasis: "auto",
    marginBottom: "2rem",
    padding: "1rem",
    backgroundImage: `url(${ChargeNow})`,
    backgroundSize: "70%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right bottom",
    h1: {
      color: "#555761",
      marginBottom: "0.5rem",
    },
  }),
};
