import React from "react";
import { css } from "@emotion/css";
import { themeSpacing } from "../basicStyle/spacing";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <a href="#">CI</a>
      </div>
      <div className={styles.head}>
        <h3>Dashboard</h3>
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
};
