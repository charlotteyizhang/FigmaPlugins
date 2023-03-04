import React, { Children, useEffect, useRef, useState } from "react";
import { Step } from "../attributes";
import {
  Calendar,
  Chest,
  GoBack,
  Golden,
  Resort,
  Rocket,
  Silver,
} from "../images/SVG";

interface BoardProps {
  currentStep: Step;
  step: Step;
  reward: boolean;
  rewarded: boolean;
  children: React.ReactNode;
}
export const Board = ({
  currentStep,
  step,
  reward,
  rewarded,
  children,
}: BoardProps): JSX.Element => {
  const isSelected = currentStep === step;

  const specialThing = getSpecialThing(step);
  return (
    <g style={{ opacity: isSelected ? 1 : 0.8 }}>
      {children}
      {specialThing}
    </g>
  );
};

const getSpecialThing = (step: Step) => {
  switch (step) {
    case Step.specialSilver: {
      return <Silver scale={1} translateX={0} translateY={0} />;
    }
    case Step.goDirectly: {
      return <Rocket scale={1} translateX={0} translateY={0} />;
    }
    case Step.specialGolden: {
      return <Golden scale={1} translateX={0} translateY={0} />;
    }
    case Step.unlockAddress: {
      return <Resort scale={1} translateX={0} translateY={0} />;
    }
    case Step.back4: {
      return <GoBack scale={1} translateX={0} translateY={0} />;
    }
    case Step.unlockTime: {
      return <Calendar scale={1} translateX={0} translateY={0} />;
    }
    case Step.last: {
      return <Chest scale={1} translateX={0} translateY={0} />;
    }
    default: {
      return null;
    }
  }
};
