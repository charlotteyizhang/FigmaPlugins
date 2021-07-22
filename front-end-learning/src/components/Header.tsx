import React, { useState } from "react";
import { css, cx } from "@emotion/css";
import { colors, themeSizing } from "../basicStyle/styling";
import { BurgerMenu, menuStyles } from "./BurgerMenu";
import {
  makeActiveMobileStataus,
  makeInactiveMobileStataus,
  MobileStatus,
} from "../data/mobileStatus";

interface MobileStatusStyle {
  state: MobileStatus;
  animation: string;
}
// to animate burger
// const activeMobileStatusStyle: MobileStatusStyle = {
//   animation: menuStyles.menuAnimateIn,
// };
// const inactiveMobileStatusStyle: MobileStatusStyle = {
//   animation: menuStyles.menuAnimateOut,
// };

// const menuAnimation = (mobileStatus: MobileStatus): MobileStatusStyle => {
//   switch (mobileStatus) {
//     case "active":
//       return activeMobileStatusStyle;
//     case "inactive":
//       return inactiveMobileStatusStyle;

//     default:
//       const x: never = mobileStatus;
//       return x;
//   }
// };

export const Header = () => {
  const [mobileStatus, setMobileStatus] = useState<MobileStatus>({
    state: "inactive",
  });

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <a href="#">CI</a>
      </div>
      <div className={styles.head}>
        <h3>Dashboard</h3>
        <button
          onClick={
            mobileStatus.state === "inactive"
              ? () => setMobileStatus(makeActiveMobileStataus())
              : () => setMobileStatus(makeInactiveMobileStataus())
          }
        >
          <span></span>
        </button>
      </div>
      {mobileStatus.state === "active" ? (
        <BurgerMenu
          onClick={(s) => {
            setMobileStatus(makeInactiveMobileStataus());
            window.location.replace(window.location.origin + s);
          }}
        />
      ) : null}
    </header>
  );
};

const styles = {
  header: css({
    display: "flex",
    [`@media screen and (max-width: 1024px) `]: {
      transition: "all 0.5s ease-in-out",
      minHeight: "65px",
    },
  }),
  logoContainer: css({
    backgroundColor: "white",
    borderRight: "1px solid #E8E8E8",
    borderBottom: "1px solid #E8E8E8",
    width: "16%",
    minWidth: "220px",
    height: "10%",
    minHeight: "65px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    a: {
      color: colors.logo,
      fontSize: "25px",
      fontWeight: "bold",
      textDecoration: "none",
    },
    [`@media screen and (max-width: 800px)`]: {
      transition: "all 0.5s ease-in-out",
      minWidth: "180px",
    },
    [`@media screen and (max-width: 650px)`]: {
      transition: "all 0.5s ease-in-out",
      minWidth: "60px",
    },
  }),
  head: css({
    backgroundColor: "white",
    borderBottom: "1px solid #E8E8E8",
    width: "84%",
    height: "10%",
    minHeight: "65px",
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    h3: {
      color: colors.logo,
      fontSize: "20px",
      fontWeight: "bold",
      paddingLeft: themeSizing.large,
    },
    button: {
      display: "none",
      [`@media screen and (max-width: 650px)`]: {
        background: "none",
        border: "none",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        // zIndex: 1,
        right: themeSizing.large,
        // top: themeSpacing.large,
        height: "20px",
        width: "28px",
        cursor: "pointer",
        transition: "all 0.5s ease-in-out",
        overflow: "hidden",
        "span, span::before, span::after": {
          content: "''",
          position: "absolute",
          width: "28px",
          height: "3px",
          backgroundColor: colors.logo,
        },
        span: {
          right: 0,
          top: themeSizing.small,
        },
        "span::before": {
          top: "-0.5rem",
          right: 0,
        },
        "span::after": {
          top: themeSizing.small,
          right: 0,
        },
      },
    },
  }),
};
