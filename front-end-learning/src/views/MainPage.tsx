import React from "react";
import { DesignCoding } from "../components/DesignCoding";
import { css } from "@emotion/css";
import { spacing, themeColors } from "../styles/styles";

export const MainPage = (): JSX.Element => {
  return (
    <div className={styles.main}>
      <div className={styles.section}>
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
    </div>
  );
};
const dotSize = 12;
const styles = {
  main: css({
    display: "flex",
    flexDirection: "column",
    width: "100%",
  }),
  section: css({
    display: "flex",
    width: "100%",
    margin: "auto",
    justifyContent: "center",
    alignItems: "flex-end",
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
