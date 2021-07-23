import React, { useState, useEffect } from "react";
import { css } from "@emotion/css";
import { colors, themeSizing } from "../basicStyle/styling";
import { Biomass } from "../img/fuelIcons/Biomass";
import { Hydro } from "../img/fuelIcons/Hydro";
import { Wind } from "../img/fuelIcons/Wind";
import { Solar } from "../img/fuelIcons/Solar";
import { Coal } from "../img/fuelIcons/Coal";
import { Gas } from "../img/fuelIcons/Gas";
import { Imports } from "../img/fuelIcons/Imports";
import { Nuclear } from "../img/fuelIcons/Nuclear";
import { Others } from "../img/fuelIcons/Others";

export interface FuelPercentage {
  biomass: number;
  hydro: number;
  solar: number;
  wind: number;
  coal: number;
  gas: number;
  imports: number;
  nuclear: number;
  other: number;
}

export const fuelTypeOrder: Array<FuelType> = [
  "biomass",
  "hydro",
  "wind",
  "solar",
  "coal",
  "gas",
  "imports",
  "nuclear",
  "other",
];

type FuelType = keyof FuelPercentage;

export const fuelDetailsFromFuelType: Record<
  FuelType,
  { title: string; color: string; Icon: (props: any) => JSX.Element }
> = {
  biomass: { title: "Biomass", color: colors.biomass, Icon: Biomass },
  hydro: { title: "Hydro", color: colors.hydro, Icon: Hydro },
  solar: { title: "Solar", color: colors.solar, Icon: Solar },
  wind: { title: "Wind", color: colors.wind, Icon: Wind },
  coal: { title: "Coal", color: colors.coal, Icon: Coal },
  gas: { title: "Gas", color: colors.gas, Icon: Gas },
  imports: { title: "Imports", color: colors.imports, Icon: Imports },
  nuclear: { title: "Nuclear", color: colors.nuclear, Icon: Nuclear },
  other: { title: "Other", color: colors.other, Icon: Others },
};

export const percentageFromData = (data: any): FuelPercentage => {
  return Object.fromEntries(
    data.data[0].generationmix.map((item: any) => [item.fuel, item.perc])
  ) as any;
};

// hover box to followv mouse?

// interface OnMouseMoveType {
//   x: number;
//   y: number;
// }

// const onMouseMove = ({x, y}: OnMouseMoveType) => {
//   const hoverX = x.clientY + 20;
//   const hoverY = y.clientX + 20;
// };

export interface PercHoverProps {
  title: string;
  value: string;
}

export const PercentageHover = ({ title, value }: PercHoverProps) => {
  // const [hoverPosition, setHoverPosition] = useState({ x: null, y: null });

  // const updateHoverPosition = (ev: any) => {
  //   setHoverPosition({ x: ev.clientX + 20, y: ev.clientY + 20 });
  // };

  // useEffect(() => {
  //   window.addEventListener("mousemove", updateHoverPosition);

  //   return () => window.removeEventListener("mousemove", updateHoverPosition);
  // }, []);

  // console.log(hoverPosition);

  return (
    <div
      id="hoverBackground"
      className={styles.hoverBackground}
      // onMouseMove={hoverPosition}
    >
      <p>
        {title} : {value}
      </p>
    </div>
  );
};

const styles = {
  hoverBackground: css({
    backgroundColor: colors.divBackground,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "30%",
    height: themeSizing.xlarge,
    border: "1px solid #E8E8E8",
    borderRadius: "5px",
    position: "absolute",
    top: "9.5%",
    left: "37%",
    padding: themeSizing.default,
  }),
};
