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
import { Head, Silver } from "../images/SVG";
import * as RX from "rxjs";
import { motion } from "framer-motion";
import photo1 from "../images/photos/1.jpg";
import photo2 from "../images/photos/2.jpg";
import photo3 from "../images/photos/3.jpg";
import photo4 from "../images/photos/4.jpg";
import photo5 from "../images/photos/5.jpg";
import photo6 from "../images/photos/6.jpg";
import photoTime from "../images/photos/time.jpg";
import photoAddress from "../images/photos/address.jpg";

const svgViewBox = {
  h: 360,
  v: 720,
};

const openClosedVariant = {
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "bounce",
      bounce: 0.4,
      duration: 0.8,
    },
  },
  closed: {
    opacity: 0,
    scale: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
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

  const [diceValue$] = useState(() => new RX.Subject<Step | undefined>());
  const [moveStep$] = useState(() => new RX.BehaviorSubject<number>(1));
  const [currentStep$] = useState(
    () => new RX.BehaviorSubject<Step>(Step.start)
  );

  const [currentStep, setCurrentStep] = useState<Step>(Step.start);

  const [diceValue, setDiceValue] = useState<Step | undefined>(undefined);

  useEffect(() => {
    const sub = diceValue$.subscribe({
      next: (s) => {
        s !== Step.start && setDiceValue(s);
      },
    });
    return () => sub.unsubscribe();
  }, []);
  const [playerFinished, setPlayerFinished] = useState(false);

  useEffect(() => {
    const sub = pipe(
      RX.combineLatest([diceValue$, moveStep$]),
      RX.withLatestFrom(currentStep$)
    ).subscribe({
      next: ([[dice, move], current]) => {
        console.log({ dice, move, current });

        if (dice !== undefined && move !== 0) {
          const target = Math.min(Step.last, dice + current);
          if (move <= target) {
            const el = document.getElementById(move.toFixed(0));
            if (el) {
              const position = el.getBoundingClientRect();
              setPlayerPosition({ x: position.x + 20, y: position.y + 10 });
            }
          }
          if (move === target) {
            setDiceValue(undefined);
            currentStep$.next(target);
          }
        }
      },
    });
    return () => sub.unsubscribe();
  }, []);

  const [ToDisplay, setToDisplay] = useState<
    "golden" | "silver" | "time" | "address" | undefined
  >(undefined);

  const [items$] = useState(() => new RX.BehaviorSubject<Array<Item>>([]));
  const [newItem$] = useState(() => new RX.Subject<Item>());

  useEffect(() => {
    const sub = newItem$.subscribe({
      next: (item) => {
        setToDisplay(item);
        // if (it === "silver") {
        //   setToDisplay("silver");
        // } else if (it === "golden") {
        //   setToDisplay("golden");
        // }else if)
      },
    });
    return () => sub.unsubscribe();
  }, []);

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
        overflow: "hidden",
      })}
    >
      <motion.button
        style={{
          padding: "0.5rem 0",
          backgroundColor: "#F9D03E",
          border: "transparent",
        }}
        animate={gameState.kind === "Rolling" ? "open" : "closed"}
        variants={openClosedVariant}
        onClick={() => {
          gameState$.next({ kind: "Walking" });
          console.log({ roll: currentStep$.getValue() });

          if (currentStep$.getValue() < Step.last - 1) {
            diceValue$.next(rollDice());
            moveStep$.next(currentStep$.getValue() + 1);
          }
        }}
        disabled={gameState.kind !== "Rolling"}
      >
        点击骰子 {currentStep}
      </motion.button>
      <motion.div
        className={css({
          position: "absolute",
          pointerEvents: "none",
          padding: "1rem",
          backgroundColor: "#AD2D1F",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
        })}
        animate={diceValue !== undefined ? "open" : "closed"}
        variants={openClosedVariant}
        onAnimationComplete={(v) => {
          v === "open" &&
            diceValue !== undefined &&
            setCurrentStep((s) => s + 1);
        }}
      >
        <p className={css({ fontSize: "2rem", color: "#C08D73" })}>
          {diceValue}
        </p>
      </motion.div>
      <div className={css({ marginTop: "0.5rem" })}>
        <svg width="100%" height={svgHeight} viewBox="0 0 360 720">
          <Board
            step={Step.start}
            newItem$={newItem$}
            currentStep$={currentStep$}
            diceValue$={diceValue$}
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
            newItem$={newItem$}
            currentStep$={currentStep$}
            diceValue$={diceValue$}
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
            newItem$={newItem$}
            currentStep$={currentStep$}
            diceValue$={diceValue$}
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
            newItem$={newItem$}
            currentStep$={currentStep$}
            diceValue$={diceValue$}
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
            newItem$={newItem$}
            currentStep$={currentStep$}
            diceValue$={diceValue$}
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
            newItem$={newItem$}
            currentStep$={currentStep$}
            diceValue$={diceValue$}
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
            newItem$={newItem$}
            currentStep$={currentStep$}
            diceValue$={diceValue$}
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
            newItem$={newItem$}
            currentStep$={currentStep$}
            diceValue$={diceValue$}
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
            newItem$={newItem$}
            currentStep$={currentStep$}
            diceValue$={diceValue$}
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
            newItem$={newItem$}
            currentStep$={currentStep$}
            diceValue$={diceValue$}
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
            newItem$={newItem$}
            currentStep$={currentStep$}
            diceValue$={diceValue$}
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
            newItem$={newItem$}
            currentStep$={currentStep$}
            diceValue$={diceValue$}
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
            newItem$={newItem$}
            currentStep$={currentStep$}
            diceValue$={diceValue$}
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
      <motion.div
        className={css({
          position: "absolute",
        })}
        animate={{
          x: playerPosition.x,
          y: playerPosition.y,
          transition: {
            type: "linear",
            duration: 0.3,
          },
        }}
        onAnimationComplete={() => {
          if (diceValue !== undefined) {
            moveStep$.next(moveStep$.getValue() + 1);
          }
        }}
      >
        <Head width={40} />
      </motion.div>
      <motion.div
        className={css({
          position: "absolute",
          overflow: "auto",
          backgroundColor: "#12184A",
          height: "100%",
          padding: "1rem  ",
          pointerEvents: ToDisplay === "silver" ? "all" : "none",
        })}
        animate={ToDisplay === "silver" ? "open" : "closed"}
        variants={openClosedVariant}
        onAnimationComplete={() => {
          gameState$.next({ kind: "Rolling" });
        }}
      >
        <p className={css({ fontSize: "2rem", color: "white" })}>
          恭喜你获得一个礼券，可以浏览两张婚纱照
        </p>
        <Button text="回到游戏" onClick={() => setToDisplay(undefined)} />
        <img src={photo1} width="100%" alt="pic1" />
        <img src={photo2} width="100%" alt="pic2" />
        <Button text="回到游戏" onClick={() => setToDisplay(undefined)} />
      </motion.div>
      <motion.div
        className={css({
          position: "absolute",
          overflow: "scroll",
          backgroundColor: "#12184A",
          height: "100%",
          padding: "1rem  ",
          pointerEvents: ToDisplay === "golden" ? "all" : "none",
        })}
        animate={ToDisplay === "golden" ? "open" : "closed"}
        variants={openClosedVariant}
        onAnimationComplete={() => {
          gameState$.next({ kind: "Rolling" });
        }}
      >
        <p className={css({ fontSize: "2rem", color: "white" })}>
          恭喜你获得一个礼券，可以浏览四张婚纱照
        </p>
        <Button text="回到游戏" onClick={() => setToDisplay(undefined)} />
        <img src={photo3} width="100%" alt="pic3" />
        <img src={photo4} width="100%" alt="pic4" />
        <img src={photo5} width="100%" alt="pic5" />
        <img src={photo6} width="100%" alt="pic6" />
        <Button text="回到游戏" onClick={() => setToDisplay(undefined)} />
      </motion.div>
      <motion.div
        className={css({
          position: "absolute",
          overflow: "scroll",
          backgroundColor: "#12184A",
          height: "100%",
          padding: "1rem  ",
          pointerEvents: ToDisplay === "time" ? "all" : "none",
        })}
        animate={ToDisplay === "time" ? "open" : "closed"}
        variants={openClosedVariant}
        onAnimationComplete={() => {
          gameState$.next({ kind: "Rolling" });
        }}
      >
        <p className={css({ fontSize: "2rem", color: "white" })}>
          恭喜解锁时间
        </p>
        <Button text="回到游戏" onClick={() => setToDisplay(undefined)} />
        <img src={photoTime} width="100%" alt="pic7" />
        <Button text="回到游戏" onClick={() => setToDisplay(undefined)} />
      </motion.div>
      <motion.div
        className={css({
          position: "absolute",
          overflow: "scroll",
          backgroundColor: "#12184A",
          height: "100%",
          padding: "1rem  ",
          pointerEvents: ToDisplay === "address" ? "all" : "none",
        })}
        animate={ToDisplay === "address" ? "open" : "closed"}
        variants={openClosedVariant}
        onAnimationComplete={() => {
          gameState$.next({ kind: "Rolling" });
        }}
      >
        <p className={css({ fontSize: "2rem", color: "white" })}>
          恭喜解锁地点
        </p>
        <Button text="回到游戏" onClick={() => setToDisplay(undefined)} />
        <img src={photoAddress} width="100%" alt="pic7" />
        <Button text="回到游戏" onClick={() => setToDisplay(undefined)} />
      </motion.div>
    </div>
  );
};

const rollDice = () => Math.round(1 + Math.random() * 5);

interface ButtonProps {
  onClick: () => void;
  text: string;
}
const Button = ({ onClick, text }: ButtonProps): JSX.Element => (
  <button
    style={{
      padding: "0.5rem 0",
      backgroundColor: "#F9D03E",
      border: "transparent",
      width: "100%",
    }}
    onClick={onClick}
  >
    {text}
  </button>
);
