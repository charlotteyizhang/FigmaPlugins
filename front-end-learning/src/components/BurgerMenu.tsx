import React from "react";
import userImg from "../img/user-img.jpg";
import { css } from "@emotion/css";
import { EmailIcon } from "../img/Email";
import { themeSpacing } from "../basicStyle/spacing";
import { PhoneIcon } from "../img/Phone";
import { SupportIcon } from "../img/Support";
import { LogoutIcon } from "../img/Logout";

export const BurgerMenu = () => {
  return (
    <menu className={styles.burgermenu}>
      <ul>
        <li>
          <a href="#highlight">Highlights</a>
        </li>
        <li>
          <a href="#co2Emissions">CO2 emissions</a>
        </li>
        <li>
          <a href="#carbonIntensity">Carbon intensity</a>
        </li>
      </ul>
      <div className={styles.burgerbutton}>
        <LogoutIcon width="1rem" height="1rem" />
        <h4>Account</h4>
      </div>
    </menu>
  );
};

const styles = {
  burgermenu: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white",
    border: "1px solid #E8E8E8",
    zIndex: 1,
    width: "100vw",
    height: "81vh",
    padding: themeSpacing.large,
    margin: themeSpacing.large,
    ul: {
      listStyleType: "none",
      cursor: "pointer",
      padding: 0,
    },
    li: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      backgroundColor: "#00558C",
      fontWeight: "bold",
      marginBottom: themeSpacing.large,
      padding: "1rem 1.5rem",
      border: "none",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 85, 140, 0.25)",
    },
    "li:hover": {
      // border: "1px solid #00558C",
      boxShadow: "none",
      backgroundColor: "rgba(0, 85, 140, 0.9)",
    },
    "a, a:link, a:visited": {
      color: "white",
      textDecoration: "none",
      display: "block",
      padding: "0.5rem 0",
    },
  }),
  burgerbutton: css({
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // margin: themeSpacing.large,
    backgroundColor: "#00558C",
    color: "white",
    padding: "1.5rem",
    border: "none",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 85, 140, 0.25)",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "rgba(0, 85, 140, 0.9)",
    },
    h4: {
      paddingLeft: themeSpacing.large,
    },
  }),
};
