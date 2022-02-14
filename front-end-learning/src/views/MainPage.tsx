import React, { useState } from "react";
import { DesignCoding } from "../components/DesignCoding";
import { css } from "@emotion/css";
import { spacing, themeColors } from "../styles/styles";
import BatteryIcon from "../images/icons/battery.png";
import HomeIcon from "../images/icons/home.png";
import * as RX from "rxjs";
import { pipe } from "fp-ts/lib/function";

export const MainPage = (): JSX.Element => {
  return (
    <div className={styles.main}>
      <div className={styles.sectionAlignRight}>
        <div className={styles.illustration}>
          <DesignCoding width={"100%"} />
        </div>
        <div className={styles.sectionText}>
          <div className={styles.header}>
            <h1 className={styles.designText}>I DESIGN</h1>
            <h1 className={styles.designText}>I CODE</h1>
          </div>
          <p>UX | User research</p>
          <p>Adobe Cloud Suite | Sketch | Figma</p>
          <p>ReactJS | TypeScript | Functional Computing</p>
        </div>
      </div>
      <div className={styles.sectionAlignLeft}>
        <div className={styles.header}>
          <h1>Icons</h1>
        </div>
        <div>
          <img src={BatteryIcon} alt="batteryIcon" />
          <img src={HomeIcon} alt="batteryIcon" />
        </div>
      </div>
    </div>
  );
};

interface GalleryProps {}
const Gallery = ({}: GalleryProps): JSX.Element => {
  return <div></div>;
};
const dotSize = 12;
const styles = {
  main: css({
    display: "flex",
    flexDirection: "column",
    width: "100%",
  }),
  sectionAlignRight: css({
    display: "flex",
    width: "100%",
    margin: "auto",
    justifyContent: "center",
    alignItems: "flex-end",
  }),
  sectionAlignLeft: css({
    display: "flex",
    width: "100%",
    margin: "auto",
    justifyContent: "center",
  }),
  sectionText: css({
    display: "flex",
    flexDirection: "column",
    flex: 1,
  }),
  illustration: css({
    marginRight: spacing.large,
    flex: 2,
  }),
  designText: css({
    position: "relative",
    width: "fit-content",
    "::after": {
      content: `""`,
      position: "absolute",
      bottom: `${dotSize * 0.5}px`,
      right: `-${spacing.large}`,
      backgroundColor: themeColors.primary,
      width: `${dotSize}px`,
      height: `${dotSize}px`,
      borderRadius: "50%",
    },
  }),
  header: css({
    position: "relative",
    paddingBottom: spacing.default,
    "::after": {
      content: `""`,
      position: "absolute",
      bottom: `${dotSize * 0.5}px`,
      backgroundColor: themeColors.primary,
      width: `${6 * dotSize}px`,
      height: `${dotSize * 0.5}px`,
    },
  }),
};
