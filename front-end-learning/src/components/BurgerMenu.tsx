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
          <a href="#">Highlights</a>
        </li>
        <li>
          <a href="#">CO2 emissions</a>
        </li>
        <li>
          <a href="#">Carbon intensity</a>
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
    padding: themeSpacing.large,
    backgroundColor: "white",
    zIndex: 1,
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    ul: {
      listStyle: "none",
      justifyContent: "center",
      alignItems: "center",
    },
    li: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      backgroundColor: "#00558C",
      marginBottom: themeSpacing.small,
      padding: "1rem 1.5rem",
      border: "none",
      borderRadius: "10px",
    },
    "li:hover": {
      border: "1px solid #00558C",
      backgroundColor: "white",
      a: {
        color: "#00558C",
        fontWeight: "bold",
      },
    },
    "a, a:link, a:visited": {
      color: "white",
      textDecoration: "none",
      display: "block",
      padding: "0.5rem 0",
    },
  }),
  burgerbutton: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#00558C",
    color: "white",
    marginBottom: themeSpacing.small,
    padding: "1rem 1.5rem",
    border: "none",
    borderRadius: "10px",
  }),
};
