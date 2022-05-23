import React from "react";
import "./App.css";
import { Logo } from "./components/Logo";
import { MainPage } from "./views/MainPage";
import { css } from "@emotion/css";
import { screenMaxWidth, spacing, themeColors } from "./styles/styles";

const App = (): JSX.Element => {
  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <div>
          <Logo height="100%" width="100%" />
        </div>
        <nav className={styles.nav}>
          <a className={styles.link} href="#1">
            Skills
          </a>
          <a className={styles.link} href="#2">
            Design
          </a>
          <a className={styles.link} href="#3">
            Development
          </a>
        </nav>
      </header>

      <body>
        <MainPage />
      </body>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
};

const styles = {
  main: css({
    display: "flex",
    flexDirection: "column",
    maxWidth: screenMaxWidth,
    margin: "auto",
    ">*": {
      display: "flex",
    },
  }),
  header: css({
    height: "3rem",
    marginBottom: spacing.large,
    justifyContent: "space-between",
    padding: spacing.default,
  }),
  nav: css({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  }),
  link: css({
    textDecoration: "none",
    color: themeColors.linkText,
    margin: `0 ${spacing.default}`,
  }),
};
export default App;
