import { css } from "@emotion/css";
import React, { useEffect, useState } from "react";
import {
  foldState,
  GameState,
  Item,
  Position,
  State,
  Step,
} from "../attributes";
import { Board } from "./board";
import { pipe, absurd } from "fp-ts/function";
import { End } from "./End";
import { Head } from "../images/SVG";
import * as RX from "rxjs";

const svgViewBox = {
  h: 360,
  v: 720,
};
interface GameProps {
  state$: RX.BehaviorSubject<State>;
}
export const Game = ({ state$ }: GameProps): JSX.Element => {
  const windowDimensions = {
    height: window.innerHeight,
    width: window.innerWidth,
  };
  const svgHeight = windowDimensions.height * 0.8;

  const [gameState$] = useState(
    () => new RX.BehaviorSubject<GameState>({ kind: "Rolling" })
  );

  const [gameState, setGameState] = useState<GameState>({ kind: "Rolling" });

  useEffect(() => {
    const sub = gameState$.subscribe({ next: setGameState });
    return () => sub.unsubscribe();
  }, []);

  const [currentStep$] = useState(
    () => new RX.BehaviorSubject<Step>(Step.start)
  );

  const [currentStep, setCurrentStep] = useState<Step>(Step.start);

  useEffect(() => {
    const sub = currentStep$.subscribe({
      next: (s) => {
        setCurrentStep(s);
      },
    });
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    const el = document.getElementById(currentStep.toFixed());
    if (el) {
      const position = el.getBoundingClientRect();
      setPlayerPosition({ x: position.x + 20, y: position.y + 10 });
    }
  }, [currentStep]);
  const [items$] = useState(() => new RX.BehaviorSubject<Array<Item>>([]));

  const [playerPosition, setPlayerPosition] = useState({
    x:
      windowDimensions.width - (svgHeight / svgViewBox.v) * svgViewBox.h * 0.33,
    y: svgHeight / 8,
  });

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      })}
    >
      <button
        onClick={() => {
          gameState$.next({ kind: "Walking" });
          if (currentStep >= Step.last) {
            state$.next({ kind: "end" });
          } else {
            currentStep$.next(rollDice(currentStep));
          }
        }}
        disabled={gameState.kind !== "Rolling"}
      >
        Dice {currentStep}
      </button>

      <div className={css({ marginTop: "0.5rem" })}>
        <svg width="100%" height={svgHeight} viewBox="0 0 360 720">
          <Board
            step={Step.start}
            items$={items$}
            currentStep$={currentStep$}
            gameState$={gameState$}
          >
            <path
              id={Step.start.toFixed()}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M360 0H240V90V180H310C337.614 180 360 157.614 360 130V90V0Z"
              fill="#FF7354"
            />
          </Board>
          <Board
            step={Step.second}
            items$={items$}
            currentStep$={currentStep$}
            gameState$={gameState$}
          >
            <rect
              id={Step.second.toFixed()}
              x="120"
              y="90"
              width="120"
              height="90"
              fill="#4A529C"
            />
          </Board>
          <Board
            step={Step.specialSilver}
            items$={items$}
            currentStep$={currentStep$}
            gameState$={gameState$}
          >
            <path
              id={Step.specialSilver.toFixed()}
              d="M0 140C0 112.386 22.3858 90 50 90H120V180H0V140Z"
              fill="#12184A"
            />
          </Board>
          <Board
            step={Step.forth}
            items$={items$}
            currentStep$={currentStep$}
            gameState$={gameState$}
          >
            <rect
              id={Step.forth.toFixed()}
              y="180"
              width="120"
              height="90"
              fill="#B8AFAF"
            />
          </Board>
          <Board
            step={Step.unlockTime}
            items$={items$}
            currentStep$={currentStep$}
            gameState$={gameState$}
          >
            <path
              id={Step.unlockTime.toFixed()}
              d="M0 270H120V360H50C22.3858 360 0 337.614 0 310V270Z"
              fill="#12184A"
            />
          </Board>
          <Board
            step={Step.fifth}
            items$={items$}
            currentStep$={currentStep$}
            gameState$={gameState$}
          >
            <rect
              id={Step.fifth.toFixed()}
              x="120"
              y="270"
              width="120"
              height="90"
              fill="#FF7354"
            />
          </Board>
          <Board
            step={Step.sixth}
            items$={items$}
            currentStep$={currentStep$}
            gameState$={gameState$}
          >
            <path
              id={Step.sixth.toFixed()}
              d="M240 270H310C337.614 270 360 292.386 360 320V360H240V270Z"
              fill="#12184A"
            />
          </Board>
          <Board
            step={Step.goForward}
            items$={items$}
            currentStep$={currentStep$}
            gameState$={gameState$}
          >
            <rect
              id={Step.goForward.toFixed()}
              x="240"
              y="360"
              width="120"
              height="90"
              fill="#4A529C"
            />
          </Board>
          <Board
            step={Step.goBack}
            items$={items$}
            currentStep$={currentStep$}
            gameState$={gameState$}
          >
            <path
              id={Step.goBack.toFixed()}
              d="M240 450H360V490C360 517.614 337.614 540 310 540H240V450Z"
              fill="#B8AFAF"
            />
          </Board>
          <Board
            step={Step.unlockAddress}
            items$={items$}
            currentStep$={currentStep$}
            gameState$={gameState$}
          >
            <path
              id={Step.unlockAddress.toFixed()}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M50 450C22.3858 450 0 472.386 0 500V540H120H240V450H120H50Z"
              fill="#12184A"
            />
          </Board>
          <Board
            step={Step.tenth}
            items$={items$}
            currentStep$={currentStep$}
            gameState$={gameState$}
          >
            <rect
              id={Step.tenth.toFixed()}
              y="540"
              width="120"
              height="90"
              fill="#4A529C"
            />
          </Board>
          <Board
            step={Step.specialGolden}
            items$={items$}
            currentStep$={currentStep$}
            gameState$={gameState$}
          >
            <path
              id={Step.specialGolden.toFixed()}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M120 630H0V670C0 697.614 22.3858 720 50 720H120H240V630H120Z"
              fill="#B8AFAF"
            />
          </Board>
          <Board
            step={Step.last}
            items$={items$}
            currentStep$={currentStep$}
            gameState$={gameState$}
          >
            <rect
              id={Step.last.toFixed()}
              x="240"
              y="630"
              width="120"
              height="90"
              fill="#FF7354"
            />
          </Board>
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          left: playerPosition.x,
          top: playerPosition.y,
        }}
      >
        <Head width={40} />
      </div>
    </div>
  );
};

const rollDice = (ct: Step) =>
  Math.min(Step.last, Math.round(ct + 1 + Math.random() * 5));
