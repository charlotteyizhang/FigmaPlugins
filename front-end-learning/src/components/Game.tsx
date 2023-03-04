import React, { useEffect, useState } from "react";
import { foldState, Position, State, Step } from "../attributes";
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
  const svgHeight = windowDimensions.height * 0.9;

  const [currentStep, setCurrentStep] = useState<Step>(Step.start);

  const [playerPosition, setPlayerPosition] = useState({
    x:
      windowDimensions.width - (svgHeight / svgViewBox.v) * svgViewBox.h * 0.33,
    y: svgHeight / 8,
  });

  useEffect(() => {
    const el = document.getElementById(currentStep.toFixed());
    if (el) {
      const position = el.getBoundingClientRect();
      setPlayerPosition({ x: position.x + 20, y: position.y + 10 });
    }
  }, [currentStep]);
  return (
    <div>
      <button
        onClick={() => {
          if (currentStep === Step.last) {
            state$.next({ kind: "end" });
          } else {
            setCurrentStep(rollDice(currentStep));
          }
        }}
      >
        Dice {currentStep}
      </button>
      <svg width="100%" height={svgHeight} viewBox="0 0 360 720">
        <Board
          currentStep={currentStep}
          step={Step.start}
          reward={false}
          rewarded={false}
        >
          <path
            id="1"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M360 0H240V90V180H310C337.614 180 360 157.614 360 130V90V0Z"
            fill="#FF7354"
          />
        </Board>
        <Board
          currentStep={currentStep}
          step={Step.second}
          reward={false}
          rewarded={false}
        >
          <rect id="2" x="120" y="90" width="120" height="90" fill="#4A529C" />
        </Board>
        <Board
          currentStep={currentStep}
          step={Step.specialSilver}
          reward={false}
          rewarded={false}
        >
          <path
            id="3"
            d="M0 140C0 112.386 22.3858 90 50 90H120V180H0V140Z"
            fill="#12184A"
          />
        </Board>
        <Board
          currentStep={currentStep}
          step={Step.forth}
          reward={false}
          rewarded={false}
        >
          <rect id="4" y="180" width="120" height="90" fill="#B8AFAF" />
        </Board>
        <Board
          currentStep={currentStep}
          step={Step.unlockTime}
          reward={false}
          rewarded={false}
        >
          <path
            id="5"
            d="M0 270H120V360H50C22.3858 360 0 337.614 0 310V270Z"
            fill="#12184A"
          />
        </Board>
        <Board
          currentStep={currentStep}
          step={Step.fifth}
          reward={false}
          rewarded={false}
        >
          <rect id="6" x="120" y="270" width="120" height="90" fill="#FF7354" />
        </Board>
        <Board
          currentStep={currentStep}
          step={Step.sixth}
          reward={false}
          rewarded={false}
        >
          <path
            id="7"
            d="M240 270H310C337.614 270 360 292.386 360 320V360H240V270Z"
            fill="#12184A"
          />
        </Board>
        <Board
          currentStep={currentStep}
          step={Step.goDirectly}
          reward={false}
          rewarded={false}
        >
          <rect id="8" x="240" y="360" width="120" height="90" fill="#4A529C" />
        </Board>
        <Board
          currentStep={currentStep}
          step={Step.back4}
          reward={false}
          rewarded={false}
        >
          <path
            id="9"
            d="M240 450H360V490C360 517.614 337.614 540 310 540H240V450Z"
            fill="#B8AFAF"
          />
        </Board>
        <Board
          currentStep={currentStep}
          step={Step.unlockAddress}
          reward={false}
          rewarded={false}
        >
          <path
            id="10"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M50 450C22.3858 450 0 472.386 0 500V540H120H240V450H120H50Z"
            fill="#12184A"
          />
        </Board>
        <Board
          currentStep={currentStep}
          step={Step.tenth}
          reward={false}
          rewarded={false}
        >
          <rect id="11" y="540" width="120" height="90" fill="#4A529C" />
        </Board>
        <Board
          currentStep={currentStep}
          step={Step.specialGolden}
          reward={false}
          rewarded={false}
        >
          <path
            id="12"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M120 630H0V670C0 697.614 22.3858 720 50 720H120H240V630H120Z"
            fill="#B8AFAF"
          />
        </Board>
        <Board
          currentStep={currentStep}
          step={Step.last}
          reward={false}
          rewarded={false}
        >
          <rect
            id="13"
            x="240"
            y="630"
            width="120"
            height="90"
            fill="#FF7354"
          />
        </Board>
      </svg>
      <div
        style={{
          position: "absolute",
          left: playerPosition.x,
          top: playerPosition.y,
        }}
      >
        <Head width={60} />
      </div>
    </div>
  );
};

const rollDice = (ct: Step) =>
  Math.max(Math.round(ct + Math.random() * (Step.last - ct)));
