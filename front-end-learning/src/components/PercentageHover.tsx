import React, { useState, useEffect } from "react";
import { css } from "@emotion/css";
import { themeSpacing } from "../basicStyle/spacing";
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
  biomass: { title: "Biomass", color: "#78D5C6", Icon: Biomass },
  hydro: { title: "Hydro", color: "#40C1AC", Icon: Hydro },
  solar: { title: "Solar", color: "#259482", Icon: Solar },
  wind: { title: "Wind", color: "#216056", Icon: Wind },
  coal: { title: "Coal", color: "#F79CAB", Icon: Coal },
  gas: { title: "Gas", color: "#EE8092", Icon: Gas },
  imports: { title: "Imports", color: "#F1566F", Icon: Imports },
  nuclear: { title: "Nuclear", color: "#D22949", Icon: Nuclear },
  other: { title: "Other", color: "#BA0C2F", Icon: Others },
};

// FuelPercentage consists of name and number, need to implement this...
// export const percentageFromInterval = (data: any): FuelPercentage => {
//   // mapping array to object with initial value of 0
//   const sum = Object.fromEntries(
//     fuelTypeOrder.map((fuelType) => [fuelType, 0])
//   ) as any;

//   // console.log({ sum });

//   //two loops. inner loop is creating one array of all the fuel types.
//   // outer loop is adding the percentages together and placing into that array.

//   // data is an array of generation mixes over time
//   //generation mix is an array of different fuel types

//   // we are iterating data to sum this object so we can print all values together
//   // first iteration turns everything into an object, then we sum them together
//   return data.data.reduce((acc: FuelPercentage, v: any) => {
//     return v.generationmix.reduce((a: any, item: any) => {
//       return { ...a, [item.fuel]: a[item.fuel] + item.perc };
//     }, acc);
//   }, sum);
//   // console.log({ dataArray });

//   // return data.data[0].generationmix.reduce((acc: FuelPercentage, item: any) => {
//   //   return { ...acc, [item.fuel]: item.perc };
//   // }, sum);
//   // data.data[0].generationmix.map((item: any) => [item.fuel, { ...sum }])
//   // dataList.map();
// };

//mapping array to object.
// export const percentageCurrent = (data: any): FuelPercentage => {
//   return Object.fromEntries(
//     data.data.generationmix.map((item: any) => [item.fuel, item.perc])
//   ) as any;
// };

export const percentageFromData = (data: any): FuelPercentage => {
  return Object.fromEntries(
    data.data[0].generationmix.map((item: any) => [item.fuel, item.perc])
  ) as any;
};

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
      id="hoverBAckground"
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
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "17%",
    height: "2rem",
    border: "1px solid #E8E8E8",
    borderRadius: "5px",
    position: "absolute",
    top: "9.5%",
    left: "40%",
  }),
};
