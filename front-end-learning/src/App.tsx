import React, { useEffect, useState } from "react";
import "./App.css";
import { foldState, Position, State, Step } from "./attributes";
import { Board } from "./components/board";
import { pipe, absurd } from "fp-ts/function";
import { End } from "./components/End";
import { Head } from "./images/SVG";
import * as RX from "rxjs";
import { Game } from "./components/Game";

const svgViewBox = {
  h: 360,
  v: 720,
};

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
    <div className="App">
      {pipe(
        state,
        foldState({
          onPlaying: () => <Game state$={state$} />,
          onEnd: () => <End state$={state$} />,
        })
      )}
    </div>
  );
};

export default App;
