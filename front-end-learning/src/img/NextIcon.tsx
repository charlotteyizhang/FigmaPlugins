import * as React from "react";

interface NextIconProps {
  nextOpacity: number;
  onClick: any;
}

export const NextIcon = ({ nextOpacity }: NextIconProps): JSX.Element => {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{"next"}</title>
      <defs>
        <filter colorInterpolationFilters="auto" id="prefix__a">
          <feColorMatrix
            in="SourceGraphic"
            values="0 0 0 0 0.333333 0 0 0 0 0.341176 0 0 0 0 0.380392 0 0 0 1.000000 0"
          />
        </filter>
      </defs>
      <g filter="url(#prefix__a)" fill="none" fillRule="evenodd">
        <path
          d="M25.949 15.005a1.09 1.09 0 00-.06-.049L8.466 1.56a1.125 1.125 0 00-1.1-.152 1.085 1.085 0 00-.268 1.875l16.315 12.546L7.099 28.373a1.085 1.085 0 00.268 1.875c.368.146.787.088 1.1-.152l17.421-13.397c.02-.016.041-.032.06-.05l.01-.007a1.084 1.084 0 00.183-.208l.01-.014a1.28 1.28 0 00.067-.119l.005-.01.02-.043.004-.01c.022-.055.04-.112.053-.17h0c.01-.04.016-.079.02-.119v-.002c.003-.018.004-.036.005-.054l.001-.01.002-.055v-.001l-.002-.056v-.009a1.126 1.126 0 00-.005-.054v-.002a1.076 1.076 0 00-.02-.119h0a1.07 1.07 0 00-.055-.17l-.003-.01a1.108 1.108 0 00-.02-.044l-.005-.009a1.04 1.04 0 00-.024-.046l-.013-.022a.972.972 0 00-.03-.05l-.01-.016a1.086 1.086 0 00-.076-.098l-.013-.015a.951.951 0 00-.022-.024l-.022-.023a1.233 1.233 0 00-.05-.047l-.01-.008z"
          fill="#555761"
          stroke="#555761"
          strokeWidth={2}
          opacity={nextOpacity}
          cursor="pointer"
        />
      </g>
    </svg>
  );
};
