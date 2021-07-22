import React from "react";
import userImg from "../img/user-img.jpg";
import { css, cx } from "@emotion/css";
import { EmailIcon } from "../img/Email";
import { themeSpacing } from "../basicStyle/spacing";
import { PhoneIcon } from "../img/Phone";
import { SupportIcon } from "../img/Support";
import { LogoutIcon } from "../img/Logout";

interface BurgerMenuProps {
  className?: string;
}

export const BurgerMenu = ({ className }: BurgerMenuProps) => {
  return (
    <menu className={cx(menuStyles.burgerMenu, className)}>
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
      <div className={menuStyles.logoutButton}>
        <LogoutIcon width="1rem" height="1rem" />
        <h4>Account</h4>
      </div>
    </menu>
  );
};

export const menuStyles = {
  burgerMenu: css({
    position: "absolute",
    top: "4rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white",
    border: "1px solid #E8E8E8",
    zIndex: 1,
    width: "100vw",
    height: "91vh",
    padding: themeSpacing.large,
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
  logoutButton: css({
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
  menuAnimateIn: css({
    transform: "translateX(100%) scaleX(0)",
    transition: "all 0.5s ease-in-out",
    transformOrigin: "0% 100%",
    justifyContent: "flex-start",
    width: "100%",
    position: "absolute",
  }),
};
