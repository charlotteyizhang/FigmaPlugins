import React, { useEffect, useState } from "react";
import "./App.css";
import { Board } from "./components/board";

enum Step {
  start = 0,
  second = 1,
  specialSilver = 2,
  forth = 3,
  unlockTime = 4,
  fifth = 5,
  sixth = 6,
  goDirectly = 7,
  back4 = 8,
  unlockAddress = 9,
  tenth = 10,
  specialGolden = 11,
  last = 12,
}
const App = () => {
  const windowDimensions = {
    height: window.innerHeight,
    width: window.innerWidth,
  };

  const [currentStep, setCurrentStep] = useState<Step>(Step.start);

  return (
    <div className="App">
      <button
        onClick={() => {
          setCurrentStep(
            Math.round(currentStep + Math.random() * (Step.last - 1))
          );
        }}
      >
        Dice
      </button>
      <svg
        width={windowDimensions.width}
        height={windowDimensions.height}
        viewBox="0 0 360 720"
      >
        <Board
          isSelected={currentStep === Step.start}
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
          isSelected={currentStep === Step.second}
          reward={false}
          rewarded={false}
        >
          <rect id="2" x="120" y="90" width="120" height="90" fill="#4A529C" />
        </Board>
        <Board
          isSelected={currentStep === Step.specialSilver}
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
          isSelected={currentStep === Step.forth}
          reward={false}
          rewarded={false}
        >
          <rect id="4" y="180" width="120" height="90" fill="#B8AFAF" />
        </Board>
        <Board
          isSelected={currentStep === Step.unlockTime}
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
          isSelected={currentStep === Step.fifth}
          reward={false}
          rewarded={false}
        >
          <rect id="6" x="120" y="270" width="120" height="90" fill="#FF7354" />
        </Board>
        <Board
          isSelected={currentStep === Step.sixth}
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
          isSelected={currentStep === Step.goDirectly}
          reward={false}
          rewarded={false}
        >
          <rect id="8" x="240" y="360" width="120" height="90" fill="#4A529C" />
        </Board>
        <Board
          isSelected={currentStep === Step.back4}
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
          isSelected={currentStep === Step.unlockAddress}
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
          isSelected={currentStep === Step.tenth}
          reward={false}
          rewarded={false}
        >
          <rect id="11" y="540" width="120" height="90" fill="#4A529C" />
        </Board>
        <Board
          isSelected={currentStep === Step.specialGolden}
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
          isSelected={currentStep === Step.last}
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
    </div>
  );
};

export default App;
