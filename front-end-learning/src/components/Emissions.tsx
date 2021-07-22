import { css } from "@emotion/css";
import React, { useEffect, useState } from "react";
import { colors, themeSizing } from "../basicStyle/styling";
import {
  EmissionStatus,
  makeCurrentEmissionStatus,
  makePastEmissionStatus,
} from "../data/emissionStatus";
import { NextIcon } from "../img/NextIcon";
import { PrevIcon } from "../img/PrevIcon";
import {
  fuelDetailsFromFuelType,
  FuelPercentage,
  fuelTypeOrder,
  PercentageHover,
  PercHoverProps,
  percentageFromData,
} from "./PercentageHover";

// on click sends info to function which sets emissionStatus. inside the
// Next/Prev Icons, the emissionStatus is sent here to set the button style.
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
  nextOpacity: number;
  previousOpacity: number;
}

const currentEmissionStatusStyle: EmissionStatusStyle = {
  nextOpacity: 0.2,
  previousOpacity: 0.5,
};

const pastEmissionStatusStyle: EmissionStatusStyle = {
  nextOpacity: 0.5,
  previousOpacity: 0.2,
};

// function to set the date for the API
const isoFornat = (time: string) => {
  const date = new Date().toISOString().split("T")[0];
  return `${date}T${time}Z`;
};

const setTimeForData = () => {
  const timeStyle = new Intl.DateTimeFormat("en-GB", { timeStyle: "short" });
  const to = timeStyle.format(new Date());
  const fromPresent = timeStyle.format(
    new Date().setMinutes(new Date().getMinutes() - 30)
  );
  const fromPast = timeStyle.format(
    new Date().setHours(new Date().getHours() - 4)
  );
  const fourHoursAgo = isoFornat(fromPast);
  const halfHourAgo = isoFornat(fromPresent);
  const toNow = isoFornat(to);
  return { fourHoursAgo, halfHourAgo, toNow };
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
  //using state to change the from and to, so depending on the state from="" and to=""
  useEffect(() => {
    const time = setTimeForData();
    const to = time.toNow;
    const from =
      emissionStatus.state === "current" ? time.halfHourAgo : time.fourHoursAgo;

    fetch(`https://api.carbonintensity.org.uk/generation/${from}/${to}`)
      .then((response) => response.json())
      .then((data) => {
        setFuelPercentage(percentageFromData(data));
      });
  }, [emissionStatus]);

  // to hide button, if opacity = 0.2, hide it
  return (
    <div className={styles.emissions}>
      <div className={styles.titleContainer}>
        <button
          onClick={
            emissionStatus
              ? () => setEmissionStatus(makePastEmissionStatus())
              : undefined
          }
        >
          <PrevIcon
            previousOpacity={
              emissionStatusStyleFromEmissionStatus(emissionStatus)
                .previousOpacity
            }
          />
        </button>
        <h2>
          {emissionStatus.state === "current"
            ? `Percentage CO₂ emission for current half hour`
            : `Percentage CO₂ emission from four hours ago`}
        </h2>
        <button
          onClick={
            emissionStatus
              ? () => setEmissionStatus(makeCurrentEmissionStatus())
              : undefined
          }
        >
          <NextIcon
            nextOpacity={
              emissionStatusStyleFromEmissionStatus(emissionStatus).nextOpacity
            }
          />{" "}
        </button>
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
    padding: themeSizing.xlarge,
    hr: {
      color: colors.hr,
      opacity: "0.3",
      marginBottom: themeSizing.large,
    },
    [`@media screen and (max-width: 800px)`]: {
      transition: "all 0.5s ease-in-out",
      width: "100%",
      h2: {
        fontSize: "1.1rem",
      },
    },
    [`@media screen and (max-width: 650px) `]: {
      transition: "all 0.5s ease-in-out",
      width: "100%",
      padding: themeSizing.large,
      h2: {
        fontSize: themeSizing.default,
      },
    },
  }),
  titleContainer: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: themeSizing.default,
    h2: {
      color: colors.text,
    },
    button: {
      background: "none",
      border: "none",
    },
  }),
  percentage: css({
    display: "flex",
    justifyContent: "space-between",
    marginBottom: themeSizing.small,
  }),
  chart: css({
    width: "100%",
    borderRadius: "30px",
    display: "flex",
    flexDirection: "row",
    marginBottom: themeSizing.large,
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
      padding: themeSizing.default,
      color: colors.text,
      [`@media screen and (max-width: 650px) `]: {
        fontSize: "0.9rem",
      },
    },
  }),
  hoverBackground: css({
    backgroundColor: "yellow",
    boxShadow: "",
    padding: themeSizing.default,
    cursor: "pointer",
    width: "50%",
    height: "30%",
  }),
};
