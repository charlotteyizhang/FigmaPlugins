import React from "react";

interface errorNotifProps {
  width: string;
  height: string;
  text: string;
}

export const ErrorNotif = ({
  width,
  height,
  text,
}: errorNotifProps): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1171 272"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{"Error Message Copy"}</title>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(78 48)">
          <circle
            stroke="#FFF"
            strokeWidth={5}
            fill="#BA1731"
            cx={88}
            cy={88}
            r={85.5}
          />
          <path
            d="M88.66 129.492a4.254 4.254 0 110 8.508 4.254 4.254 0 010-8.508zM88.273 39a3.48 3.48 0 013.48 3.48v74.25a3.48 3.48 0 01-6.96 0V42.48a3.48 3.48 0 013.48-3.48z"
            fill="#FFF"
          />
        </g>
        <text
          fontFamily="Helvetica-Bold, Helvetica"
          fontSize={48}
          fontWeight="bold"
          fill="#555761"
          transform="translate(78 48)"
        >
          <tspan x={237} y={102}>
            {text}
          </tspan>
        </text>
      </g>
    </svg>
  );
};
