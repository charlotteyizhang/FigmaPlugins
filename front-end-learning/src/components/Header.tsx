import React from "react";
import { css } from "@emotion/css";
import { themeSpacing } from "../basicStyle/spacing";
import { NONAME } from "dns";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <a href="#">CI</a>
      </div>
      <div className={styles.head}>
        <h3>Dashboard</h3>
        <div className={styles.menuBtn}>
          <span></span>
        </div>
      </div>
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
  }),
  menuBtn: css({
    display: "none",
    [`@media screen and (max-width: 650px)`]: {
      display: "block",
      position: "absolute",
      zIndex: 1,
      right: themeSpacing.large,
      top: themeSpacing.large,
      height: "20px",
      width: "28px",
      cursor: "pointer",
      transition: "all 0.5s ease-in-out",
      "span, span::before, span::after": {
        content: "''",
        position: "absolute",
        width: "28px",
        height: "3px",
        backgroundColor: "#00558C",
      },
      span: {
        right: 0,
        top: "0rem",
      },
      "span::before": {
        top: "-0.5rem",
      },
      "span::after": {
        top: "0.5rem",
      },
    },
  }),
};
