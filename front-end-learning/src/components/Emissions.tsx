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
import { title } from "process";
import {
  PercentageHover,
  fuelDetailsFromFuelType,
  fuelTypeOrder,
  FuelPercentage,
  percentageFromData,
  PercHoverProps,
} from "./PercentageHover";
// import { fuelDetailsFromFuelType,  } from "./PercentageHover";

// interface FuelPercentage {
//   biomass: number;
//   hydro: number;
//   solar: number;
//   wind: number;
//   coal: number;
//   gas: number;
//   imports: number;
//   nuclear: number;
//   other: number;
// }

// const fuelTypeOrder: Array<FuelType> = [
//   "biomass",
//   "hydro",
//   "wind",
//   "solar",
//   "coal",
//   "gas",
//   "imports",
//   "nuclear",
//   "other",
// ];

// type FuelType = keyof FuelPercentage;

// const fuelDetailsFromFuelType: Record<
//   FuelType,
//   { title: string; color: string; Icon: (props: any) => JSX.Element }
// > = {
//   biomass: { title: "Biomass", color: "#78D5C6", Icon: Biomass },
//   hydro: { title: "Hydro", color: "#40C1AC", Icon: Hydro },
//   solar: { title: "Solar", color: "#259482", Icon: Solar },
//   wind: { title: "Wind", color: "#216056", Icon: Wind },
//   coal: { title: "Coal", color: "#F79CAB", Icon: Coal },
//   gas: { title: "Gas", color: "#EE8092", Icon: Gas },
//   imports: { title: "Imports", color: "#F1566F", Icon: Imports },
//   nuclear: { title: "Nuclear", color: "#D22949", Icon: Nuclear },
//   other: { title: "Other", color: "#BA0C2F", Icon: Others },
// };

// // FuelPercentage consists of name and number, need to implement this...
// const percentageFromData = (data: any): FuelPercentage => {
//   // The Object.fromEntries() method transforms a list of key-value pairs into an object.
//   return Object.fromEntries(
//     data.data.generationmix.map((item: any) => [item.fuel, item.perc])
//   ) as any;
// };

export const Emissions = () => {
  const [percBox, setPercBox] = useState<PercHoverProps | undefined>(undefined);
  const [fuelPercentage, setFuelPercentage] = useState<
    FuelPercentage | undefined
  >(undefined);

  useEffect(() => {
    fetch("https://api.carbonintensity.org.uk/generation")
      .then((response) => response.json())
      .then((data) => {
        setFuelPercentage(percentageFromData(data));
      });
  }, []);

  return (
    <div className={styles.emissions}>
      <h2>Current Percentage CO₂ Emission</h2>
      <hr></hr>
      <div className={styles.percentage}>
        <p>0%</p>
        <p>100%</p>
      </div>
      <div className={styles.chart}>
        {/* <span style={{ width: gasPerc }} className={styles.gas}></span> */}

        {fuelPercentage === undefined
          ? null
          : fuelTypeOrder.map((key) => {
              const { title, color } = fuelDetailsFromFuelType[key];
              return (
                <span
                  key={key}
                  className={css({
                    backgroundColor: color,
                    width: `${fuelPercentage[key]}%`,
                    height: "1.5rem",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  })}
                  onMouseEnter={() =>
                    setPercBox({ title, value: `${fuelPercentage[key]}%` })
                  }
                  onMouseLeave={() => setPercBox(undefined)}
                >
                  {percBox ? (
                    <PercentageHover
                      title={percBox.title}
                      value={percBox.value}
                    />
                  ) : null}
                </span>
              );
            })}
      </div>
      {/* {percBox ? (
        <PercentageHover title={percBox.title} value={percBox.value} />
      ) : null} */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>Fuel Type</th>
            <th>% Emissions</th>
          </tr>
        </thead>
        <tbody>
          {fuelPercentage === undefined
            ? null
            : fuelTypeOrder.map((key) => {
                const { title, Icon } = fuelDetailsFromFuelType[key];
                return (
                  <tr key={key}>
                    <td>
                      <Icon />
                    </td>
                    <td>{title}</td>
                    <td>{fuelPercentage[key]}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  emissions: css({
    position: "relative",
    backgroundColor: "white",
    border: "1px solid #E8E8E8",
    padding: themeSpacing.large,
    h2: {
      color: "#555761",
      marginBottom: themeSpacing.default,
    },
    hr: {
      color: "#39393B",
      opacity: "0.3",
      marginBottom: themeSpacing.default,
    },
    [`@media screen and (max-width: 650px) `]: {
      transition: "all 0.5s ease-in-out",
      width: "100%",
      padding: themeSpacing.default,
      h2: {
        fontSize: "1.2rem",
      },
    },
  }),
  percentage: css({
    display: "flex",
    justifyContent: "space-between",
    marginBottom: themeSpacing.small,
    // position: "relative",
  }),
  chart: css({
    // border: "1px solid black",
    width: "100%",
    borderRadius: "30px",
    display: "flex",
    flexDirection: "row",
    marginBottom: themeSpacing.large,
    overflow: "hidden",
  }),
  backContainer: css({
    backgroundColor: "blue",
    width: "50%",
    margin: "0 auto",
    textAlign: "center",
  }),
  table: css({
    width: "100%",
    justifyContent: "space-between",
    textAlign: "left",
    "th, td": {
      padding: themeSpacing.default,
    },
  }),
  hoverBackground: css({
    backgroundColor: "yellow",
    boxShadow: "",
    padding: themeSpacing.default,
    cursor: "pointer",
    width: "50%",
    height: "30%",
  }),
};
