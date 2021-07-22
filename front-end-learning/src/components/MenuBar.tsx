import React from "react";
import userImg from "../img/user-img.jpg";
import { css } from "@emotion/css";
import { EmailIcon } from "../img/Email";
import { colors, themeSizing } from "../basicStyle/styling";
import { PhoneIcon } from "../img/Phone";
import { LogoutIcon } from "../img/Logout";

export const MenuBar = () => {
  return (
    <menu className={styles.menubar}>
      <div className={styles.account}>
        <h4>My account</h4>
        <img className={styles.img} src={userImg} alt="user img" />
        <h5> Jordan Santiago</h5>
        <p>Premium membership</p>
      </div>

      <div className={styles.dashboardLinks}>
        <hr></hr>
        <h4>Dashboard</h4>
        <ul className={styles.dashboardLinks}>
          <li>
            <a href="#highlight">Highlights</a>
          </li>
          <li>
            <a href="#co2Emissions">CO₂ emissions</a>
          </li>
          <li>
            <a href="#carbonIntensity">Carbon intensity</a>
          </li>
        </ul>
        <hr></hr>
      </div>

      <div className={styles.contact}>
        <h4>Contact information</h4>
        <div className={styles.contactInfo}>
          <PhoneIcon width="1rem" height="1rem" fill="#00558C" />
          <p>01234567890</p>
        </div>
        <div className={styles.contactInfo}>
          <EmailIcon width="1rem" height="1rem" fill="#00558C" />
          <p>email@email.com</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <button>
          <LogoutIcon width="1rem" height="1rem" />
          <h4>Logout</h4>
        </button>
      </div>
    </menu>
  );
};

const styles = {
  menubar: css({
    color: colors.text,
    overflow: "hidden",
    padding: themeSizing.large,
    boxSizing: "border-box",
    backgroundColor: "white",
    borderRight: "1px solid #E8E8E8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    textAlign: "center",
    width: "16%",
    minWidth: "220px",
    height: "100%",
    ul: { padding: 0, margin: 0 },
    li: { listStyle: "none" },
    "a, a:link, a:visited": {
      color: colors.text,
      textDecoration: "none",
      display: "block",
      padding: "0.5rem 0",
    },
    "a:hover, a:active": {
      color: colors.logo,
      fontWeight: "bold",
    },
    // ".active": { backgroundColor: "grey" },
    p: {
      fontSize: "14px",
    },
    [`@media screen and (max-width: 1024px) `]: {
      transition: "all 0.5s ease-in-out",
      justifyContent: "normal",
    },
    [`@media screen and (max-width: 800px)`]: {
      transition: "all 0.5s ease-in-out",
      minWidth: "180px",
      height: "100vh",
      h4: {
        fontSize: "14px",
      },
      h5: {
        fontSize: "12px",
      },
      p: {
        fontSize: "11px",
      },
      "a, a:visited, a:link": {
        fontSize: "12px",
        padding: "0.3rem 0",
      },
    },
    [`@media screen and (max-width: 650px)`]: {
      transition: "all 0.5s ease-in-out",
      display: "none",
    },
  }),
  account: css({
    img: {
      margin: "1rem 0",
    },
    h5: {
      marginBottom: "0.3rem",
    },
  }),
  img: css({
    width: "30%",
    height: "auto",
    borderRadius: "50%",
  }),
  dashboardLinks: css({
    textAlign: "left",
    listStyleType: "none",
    h3: {
      margin: "0 0 0.7rem",
    },
    hr: {
      margin: "2rem 0",
      color: colors.hr,
      opacity: "0.3",
    },
  }),
  contact: css({
    marginBottom: themeSizing.large,
    textAlign: "left",
    h4: {
      padding: "0",
      wordWrap: "break-word",
      marginBottom: themeSizing.default,
    },
    p: {
      marginBottom: themeSizing.small,
      display: "inline",
      paddingLeft: themeSizing.default,
    },
    [`@media screen and (max-width: 800px)`]: {
      transition: "all 0.5s ease-in-out",
      p: {
        paddingLeft: themeSizing.small,
      },
    },
  }),
  contactInfo: css({
    display: "flex",
    flexDirection: "row",
  }),
  buttons: css({
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    h4: {
      paddingLeft: themeSizing.large,
    },
    [`@media screen and (max-width: 800px)`]: {
      transition: "all 0.5s ease-in-out",
      h4: {
        paddingLeft: themeSizing.default,
      },
    },
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      backgroundColor: colors.logo,
      color: "white",
      marginBottom: themeSizing.small,
      padding: "1rem 1.5rem",
      border: "none",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 85, 140, 0.25)",
      "&:hover": {
        cursor: "pointer",
        boxShadow: "none",
        backgroundColor: colors.hoverButton,
      },
      [`@media screen and (max-width: 800px)`]: {
        transition: "all 0.5s ease-in-out",
        padding: "1rem 0.5rem",
      },
    },
  }),
};
