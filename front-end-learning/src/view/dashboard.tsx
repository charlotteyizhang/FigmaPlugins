import React from "react";
import { css } from "@emotion/css";
import { Header } from "../components/Header";
import { MenuBar } from "../components/MenuBar";
// import { Notification } from "../components/Notification";
import { Highlights } from "./Highlights";

export const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Header />
      <div className={styles.min}>
        <MenuBar />
        {/* <Notification /> */}
        <Highlights />
      </div>
    </div>
  );
};

const styles = {
  dashboard: css({
    backgroundColor: "#F4F4F4",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    height: "100vh",
  }),
  min: css({
    display: "flex",
    overflowY: "hidden",
  }),
};
