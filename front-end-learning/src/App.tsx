import { css, cx } from "@emotion/css";
import { pipe } from "fp-ts/function";
import { useEffect, useState } from "react";
import * as RX from "rxjs";
import { foldState, State } from "./attributes";
import { End } from "./components/End";
import { Game } from "./components/Game";

const App = () => {
  const [state$] = useState(
    () => new RX.BehaviorSubject<State>({ kind: "playing" })
  );

  const [state, setState] = useState<State>({ kind: "playing" });

  useEffect(() => {
    const sub = state$.subscribe({ next: setState });
    return () => sub.unsubscribe();
  }, []);

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        backgroundColor: "#FFF6D7",
      })}
    >
      {pipe(
        state,
        foldState({
          onPlaying: () => <Game state$={state$} />,
          onEnd: () => <End state$={state$} />,
        })
      )}

      <div className={styles.buttonContainer}>
        <button
          className={cx(
            styles.buttons,
            css({
              backgroundColor: "#F9D03E",
              border: "#9A7F1E",
            })
          )}
        >
          再来一次
        </button>
        <button
          className={cx(
            styles.buttons,
            css({
              backgroundColor: "#6DB284",
              border: "#285537",
            })
          )}
        >
          直接看请帖
        </button>
      </div>
    </div>
  );
};

const styles = {
  buttons: css({
    padding: "0.5rem",
    borderWidth: 2,
    borderRadius: "8px",
  }),
  buttonContainer: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
  }),
};

export default App;
