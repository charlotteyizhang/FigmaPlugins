import React, { useState } from "react";
import { css } from "@emotion/css";
import { themeSpacing } from "../basicStyle/spacing";
import { BurgerMenu } from "./BurgerMenu";
// import { Highlights } from "../view/Highlights";
// import { NONAME } from "dns";

export type MobileStatus = "active" | "inactive";

const menuAnimation = (mobileStatus: MobileStatus) => {
  switch (mobileStatus) {
    case "active":
      console.log("hello");
      return;
    case "inactive":
      console.log("bye");
      return;

    default:
      const x: never = mobileStatus;
      return x;
  }
};

// const animIn = (mobileStatus: MobileStatus) => {
//   {
//     mobileStatus === "active" ? "HEllo" : "YEs";
//   }
// };
// const animIn = (mobileStatus: MobileStatus) => {
//   {
//     mobileStatus === "inactive" ? "bye" : "No";
//   }
// };

export const Header = () => {
  const [mobileStatus, setMobileStatus] = useState<MobileStatus>("inactive");
  // Note for tomorrow: create a useEffect and onClick function to add to the onClick in the button and make useEffect dependent on mobileStatus

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <a href="#">CI</a>
      </div>
      <div className={styles.head}>
        <h3>Dashboard</h3>
        <button
          onClick={
            mobileStatus === "inactive"
              ? () => setMobileStatus("active")
              : () => setMobileStatus("inactive")
          }
        >
          <span></span>
        </button>
      </div>
      {mobileStatus === "active" ? menuAnimation(mobileStatus) : null}
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
      color: "#00558C",
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
      color: "#00558C",
      fontSize: "20px",
      fontWeight: "bold",
      paddingLeft: themeSpacing.large,
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
        right: themeSpacing.large,
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
          backgroundColor: "#00558C",
        },
        span: {
          right: 0,
          top: "0.5",
        },
        "span::before": {
          top: "-0.5rem",
          right: 0,
        },
        "span::after": {
          top: "0.5rem",
          right: 0,
        },
      },
    },
  }),
};
