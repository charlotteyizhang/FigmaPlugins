import React from "react";
import "./App.css";
import { Logo } from "./components/Logo";
import { MainPage } from "./views/MainPage";
import { css } from "@emotion/css";
import { screenMaxWidth } from "./styles/styles";

const App = (): JSX.Element => {
  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <Logo height="100%" />
        <nav>
          <a href="#1">1</a>
          <a href="#2">2</a>
          <a href="#3">3</a>
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
    marginBottom: "1rem",
    width: "100%",

    justifyContent: "space-between",
  }),
};
export default App;
