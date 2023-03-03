import React, { Children, useEffect, useState } from "react";

interface BoardProps {
  isSelected: boolean;
  reward: boolean;
  rewarded: boolean;
  children: React.ReactNode;
}
export const Board = ({
  isSelected,
  reward,
  rewarded,
  children,
}: BoardProps): JSX.Element => {
  return <g style={{ opacity: isSelected ? 1 : 0.8 }}>{children}</g>;
};
