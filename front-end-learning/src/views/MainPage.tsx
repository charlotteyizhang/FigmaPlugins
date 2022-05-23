import { css, cx } from "@emotion/css";
import { DesignCoding } from "../components/DesignCoding";
import RunIllustration from "../images/illustration/run.png";
import { spacing, themeColors } from "../styles/styles";
import { Work } from "./Work";

export const MainPage = (): JSX.Element => {
  return (
    <div className={styles.main}>
      <div className={styles.sectionHero}>
        <div className={styles.illustration}>
          <DesignCoding height="100%" />
        </div>
        <div className={styles.sectionText}>
          <h1 className={styles.designText}>I DESIGN</h1>
          <div className={styles.header} />
          <div className={styles.textAlignCenter}>
            <p>Web Design and Development</p>
            <p>llustration & watercolour</p>
            <p>Internet of things</p>
            {/* <p>UX | User research</p> */}
            {/* <p>Adobe Cloud Suite | Sketch | Figma | Procreate</p>
            <p>ReactJS | TypeScript | Functional Computing</p> */}
          </div>
          <h1 className={styles.designText}>I CODE</h1>
        </div>
      </div>
      <div className={styles.areaCardContainer}>
        <div className={styles.areaCard}>
          <div className={styles.areaCardText}>
            <h1>My skillsets</h1>
            <div className={styles.header} />
          </div>
          <div
            className={cx(
              styles.areaCardText,
              css({ marginLeft: spacing.xLarge })
            )}
          >
            <h2 className={styles.thinText}>
              Adobe Cloud Suite | Sketch | Figma
            </h2>
            <h2 className={styles.thinText}>
              ReactJS | TypeScript | Functional Computing
            </h2>
            <h2 className={styles.thinText}>Watercolour | Procreate</h2>
            <h2 className={styles.thinText}>UX | User research</h2>
          </div>
        </div>
        <div className={styles.areaCardIllustration}>
          <img src={RunIllustration} alt="thisImage" width="100%" />
        </div>
      </div>
      <Work />
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
  sectionHero: css({
    display: "flex",
    margin: "auto",
    marginBottom: `calc(2 * ${spacing.xLarge})`,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    height: "28rem",
    maxWidth: "80rem",
  }),
  sectionAlignLeft: css({
    display: "flex",
    width: "100%",
    margin: "auto",
    justifyContent: "center",
  }),
  textAlignCenter: css({
    textAlign: "center",
  }),
  sectionText: css({
    display: "flex",
    flexDirection: "column",
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1.2rem",
  }),
  illustration: css({
    height: "100%",
    flex: 1,
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
    width: "100%",
    "::after": {
      content: `""`,
      position: "absolute",
      margin: "auto",
      left: 0,
      right: 0,
      backgroundColor: themeColors.primary,
      width: `${6 * dotSize}px`,
      height: `${dotSize * 0.5}px`,
    },
  }),
  thinText: css({
    fontWeight: "normal",
  }),
  areaCardContainer: css({
    position: "relative",
    margin: `auto ${spacing.large}`,
  }),
  narrowCard: css({
    padding: spacing.xLarge,
  }),
  areaCard: css({
    backgroundColor: themeColors.second,
    borderRadius: "1rem",
    margin: "auto",
    marginTop: spacing.large,
    padding: spacing.default,
    display: "flex",
    maxWidth: "80rem",
    alignItems: "center",
    position: "relative",
    "::after": {
      content: `""`,
      position: "absolute",
      width: `calc(100% - ${spacing.default})`,
      backgroundColor: themeColors.linkText,
      bottom: `-${spacing.small}`,
      height: spacing.xLarge,
      zIndex: -1,
      left: spacing.default,
      borderRadius: "1rem 0rem 1rem 1rem",
    },
  }),
  areaCardText: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: spacing.xLarge,
  }),
  areaCardIllustration: css({
    position: "absolute",
    width: "30rem",
    top: `calc(${spacing.default} * -6)`,
    right: spacing.xLarge,
  }),
};
