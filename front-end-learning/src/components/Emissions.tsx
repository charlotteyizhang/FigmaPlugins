import React, { useState, useEffect } from "react";
import { css } from "@emotion/css";
import { themeSpacing } from "../basicStyle/spacing";
import {
  PercentageHover,
  fuelDetailsFromFuelType,
  fuelTypeOrder,
  FuelPercentage,
  percentageFromData,
  PercHoverProps,
} from "./PercentageHover";
import { PrevIcon } from "../img/PrevIcon";
import { NextIcon } from "../img/NextIcon";
import { EmissionStatus } from "../data/emissionStatus";

// type EmissionStatus = "current" | "past";

// on click sends info here. this then returns info used in
//setEmissionStatus to fetch data.
const emissionStatusStyleFromEmissionStatus = (
  emissionStatus: EmissionStatus
): EmissionStatusStyle => {
  switch (emissionStatus.state) {
    case "current":
      return currentEmissionStatusStyle;
    case "past":
      return pastEmissionStatusStyle;

    default:
      const x: never = emissionStatus;
      return x;
  }
};

interface EmissionStatusStyle {
  dataSelection: "next" | "previous";
  nextOpacity: number;
  previousOpacity: number;
}

const currentEmissionStatusStyle: EmissionStatusStyle = {
  dataSelection: "next",
  nextOpacity: 0.2,
  previousOpacity: 0.5,
};

const pastEmissionStatusStyle: EmissionStatusStyle = {
  dataSelection: "previous",
  nextOpacity: 0.5,
  previousOpacity: 0.2,
};

export const Emissions = () => {
  const [percBox, setPercBox] = useState<PercHoverProps | undefined>(undefined);
  const [fuelPercentage, setFuelPercentage] = useState<
    FuelPercentage | undefined
  >(undefined);
  const [emissionStatus, setEmissionStatus] = useState<EmissionStatus>({
    state: "current",
  });

  //if state === current, show generation data. else, show fromTo data
  useEffect(() => {
    fetch("https://api.carbonintensity.org.uk/generation")
      .then((response) => response.json())
      .then((data) => {
        setFuelPercentage(percentageFromData(data));
      });
  }, []);

  return (
    <div className={styles.emissions}>
      <div className={styles.titleContainer}>
        <PrevIcon
          onClick={
            emissionStatus
              ? () =>
                  setEmissionStatus(
                    emissionStatusStyleFromEmissionStatus({ state: "past" })
                  )
              : null
          }
          // onClick={setEmissionStatus(emissionStatusFromButton(emissionStatus))}
        />
        <h2>
          {emissionStatus.state === "current"
            ? `Percentage CO₂ emission for current half hour`
            : `Percentage CO₂ emission for next four hours`}
        </h2>
        {/* <h2>Percentage CO₂ emission for current half hour</h2> */}
        <NextIcon
        // onClick={currentState ? null : () => setCurrentState(true)}
        />
      </div>
      <hr></hr>
      <div className={styles.percentage}>
        <p>0%</p>
        <p>100%</p>
      </div>

      <div className={styles.chart}>
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
    hr: {
      color: "#39393B",
      opacity: "0.3",
      marginBottom: themeSpacing.large,
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
  titleContainer: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: themeSpacing.default,
    h2: {
      color: "#555761",
    },
  }),
  percentage: css({
    display: "flex",
    justifyContent: "space-between",
    marginBottom: themeSpacing.small,
  }),
  chart: css({
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
