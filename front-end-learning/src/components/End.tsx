import { useEffect, useState } from "react";
import { Position, State, Step } from "../attributes";
import { Head } from "../images/SVG";
import * as RX from "rxjs";

interface EndProps {
  state$: RX.BehaviorSubject<State>;
}
export const End = ({ state$ }: EndProps): JSX.Element => {
  const [state, setState] = useState<State>({ kind: "playing" });

  useEffect(() => {
    const sub = state$.subscribe({ next: setState });
    return () => sub.unsubscribe();
  }, []);
  return (
    <div>
      yeah
      <button onClick={() => state$.next({ kind: "playing" })}>
        Play again
      </button>
    </div>
  );
};
