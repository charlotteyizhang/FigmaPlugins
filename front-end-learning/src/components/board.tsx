import React, { Children, useEffect, useRef, useState } from "react";
import { GameState, Item, Step } from "../attributes";
import {
  Calendar,
  Chest,
  GoBack,
  Golden,
  Resort,
  Rocket,
  Silver,
} from "../images/SVG";
import * as RX from "rxjs";

interface BoardProps {
  step: Step;
  items$: RX.BehaviorSubject<Array<Item>>;
  currentStep$: RX.BehaviorSubject<Step>;
  gameState$: RX.BehaviorSubject<GameState>;
  children: React.ReactNode;
}
export const Board = ({
  currentStep$,
  step,
  items$,
  children,
  gameState$,
}: BoardProps): JSX.Element => {
  const [isSelected, setIsSelected] = useState(false);

  const specialThing = getSpecialThing(step);

  const [collected, setCollected] = useState(false);

  useEffect(() => {
    const sub = currentStep$.subscribe({
      next: (s) => {
        const isSelected = s === step;
        setIsSelected(isSelected);

        if (isSelected && specialThing !== null) {
          gameState$.next({ kind: "SpecialThing" });
          const it = specialThing.item;
          if (it !== null && !collected) {
            setCollected(true);
            items$.next([...items$.getValue(), it]);
          } else if (it === null) {
            if (step === Step.goBack) {
              currentStep$.next(step - 6);
            } else if (step === Step.goForward) {
              currentStep$.next(step + 4);
            }
          }
        }
        gameState$.next({ kind: "Rolling" });
      },
    });
    return () => sub.unsubscribe();
  }, []);

  return (
    <g style={{ opacity: isSelected ? 1 : 0.8 }}>
      {children}
      {!collected && specialThing?.pic}
    </g>
  );
};

interface SpecialThing {
  item: Item | null;
  pic: JSX.Element;
}

const getSpecialThing = (step: Step): SpecialThing | null => {
  switch (step) {
    case Step.specialSilver: {
      return {
        item: "silver",
        pic: <Silver scale={1} translateX={0} translateY={0} />,
      };
    }
    case Step.goForward: {
      return {
        item: null,
        pic: <Rocket scale={1} translateX={0} translateY={0} />,
      };
    }
    case Step.specialGolden: {
      return {
        item: "golden",
        pic: <Golden scale={1} translateX={0} translateY={0} />,
      };
    }
    case Step.unlockAddress: {
      return {
        item: "address",
        pic: <Resort scale={1} translateX={0} translateY={0} />,
      };
    }
    case Step.goBack: {
      return {
        item: null,
        pic: <GoBack scale={1} translateX={0} translateY={0} />,
      };
    }
    case Step.unlockTime: {
      return {
        item: "time",
        pic: <Calendar scale={1} translateX={0} translateY={0} />,
      };
    }
    case Step.last: {
      return {
        item: null,
        pic: <Chest scale={1} translateX={0} translateY={0} />,
      };
    }
    default: {
      return null;
    }
  }
};
