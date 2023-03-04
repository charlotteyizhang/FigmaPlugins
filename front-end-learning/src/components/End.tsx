import { useEffect, useState } from "react";
import { Position, State, Step } from "../attributes";
import { Head } from "../images/SVG";
import * as RX from "rxjs";

interface EndProps {
  state$: RX.BehaviorSubject<State>;
}
export const End = ({ state$ }: EndProps): JSX.Element => {
  return (
    <div>
      yeah
      <button onClick={() => state$.next({ kind: "playing" })}>
        Play again
      </button>
    </div>
  );
};
