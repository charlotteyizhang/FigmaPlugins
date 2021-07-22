import React from "react";
import userImg from "../img/user-img.jpg";
import { css } from "@emotion/css";
import { EmailIcon } from "../img/Email";
import { colors, themeSizing } from "../basicStyle/styling";
import { PhoneIcon } from "../img/Phone";
import { SupportIcon } from "../img/Support";
import { LogoutIcon } from "../img/Logout";

interface BurgerMenuProps {
  onClick: (e: string) => void;
}

export const BurgerMenu = ({ onClick }: BurgerMenuProps) => {
  return (
    <menu className={menuStyles.burgerMenu}>
      <ul>
        <li>
          <button onClick={() => onClick("#highlight")}>Highlights</button>
        </li>
        <li>
          <button onClick={() => onClick("#co2Emissions")}>
            CO2 emissions
          </button>
        </li>
        <li>
          <button onClick={() => onClick("#carbonIntensity")}>
            Carbon intensity
          </button>
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
    display: "none",
    [`@media screen and (max-width: 650px)`]: {
      position: "absolute",
      top: "4rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      backgroundColor: "white",
      border: "1px solid #E8E8E8",
      zIndex: 1,
      width: "100vw",
      height: "93vh",
      padding: themeSizing.large,
      overflowY: "hidden",
      ul: {
        listStyleType: "none",
        cursor: "pointer",
        padding: 0,
      },
      li: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        backgroundColor: colors.logo,
        fontWeight: "bold",
        marginBottom: themeSizing.large,
        padding: "1rem 1.5rem",
        border: "none",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 85, 140, 0.25)",
        button: {
          backgroundColor: "Transparent",
          border: "none",
          fontWeight: "bold",
          fontSize: themeSizing.default,
        },
      },
      "li:hover": {
        boxShadow: "none",
        backgroundColor: colors.hoverButton,
      },
      button: {
        color: "white",
        textDecoration: "none",
        display: "block",
        padding: "0.5rem 0",
      },
    },
  }),
  logoutButton: css({
    [`@media screen and (max-width: 650px)`]: {
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      backgroundColor: colors.logo,
      color: "white",
      padding: themeSizing.medium,
      border: "none",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 85, 140, 0.25)",
      "&:hover": {
        boxShadow: "none",
        backgroundColor: colors.hoverButton,
      },
      h4: {
        paddingLeft: themeSizing.large,
      },
    },
  }),
};
