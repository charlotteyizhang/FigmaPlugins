import * as React from "react";

interface PrevIconProps {
  previousOpacity: number;
}

export const PrevIcon = ({ previousOpacity }: PrevIconProps): JSX.Element => {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{"prev"}</title>
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
          d="M7.051 15.005l.06-.049L24.534 1.56c.313-.24.732-.298 1.1-.152a1.085 1.085 0 01.268 1.875L9.586 15.828l16.315 12.545a1.085 1.085 0 01-.268 1.875 1.125 1.125 0 01-1.1-.152L7.112 16.699a1.053 1.053 0 01-.06-.05l-.01-.007a1.084 1.084 0 01-.183-.208l-.01-.014a1.28 1.28 0 01-.067-.119l-.005-.01a1.042 1.042 0 01-.02-.043l-.004-.01a1.073 1.073 0 01-.053-.17h0a1.076 1.076 0 01-.02-.119v-.002a1.098 1.098 0 01-.005-.054l-.001-.01a1.071 1.071 0 01-.002-.055v-.001l.002-.056v-.009l.005-.054v-.002c.005-.04.012-.08.02-.119h0a1.07 1.07 0 01.055-.17l.003-.01.02-.044.005-.009a1.04 1.04 0 01.024-.046l.013-.022a.972.972 0 01.03-.05l.01-.016c.024-.034.05-.067.076-.098l.013-.015a.951.951 0 01.022-.024l.022-.023a1.233 1.233 0 01.05-.047l.01-.008z"
          fill="#555761"
          stroke="#555761"
          strokeWidth={2}
          opacity={previousOpacity}
          cursor="pointer"
        />
      </g>
    </svg>
  );
};
