import { css } from "@emotion/css";
import React, { useEffect, useState } from "react";
import { themeSpacing } from "../basicStyle/spacing";
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

// creating variable for API to check four hours ago
const fourHoursAgo = new Intl.DateTimeFormat("en-GB", {
  timeStyle: "short",
}).format(new Date().setHours(new Date().getHours() - 4));

const halfHourAgo = new Intl.DateTimeFormat("en-GB", {
  timeStyle: "short",
}).format(new Date().setMinutes(new Date().getMinutes() - 30));

const currentTime = new Intl.DateTimeFormat("en-GB", {
  timeStyle: "short",
}).format(new Date());

// function to set the date for the API
const date = new Date().toISOString().split("T")[0];

// const settingTime = (emissionStatus: EmissionStatus) => {
//   const from = null
//   emissionStatus.state === "current" ? from = halfHourAgo : from = fourHoursAgo
//   // if emission state is current, from is halfHourAgo, else from is fourHoursAgo
// };

const setTimeForData = () => {
  const timeStyle = new Intl.DateTimeFormat("en-GB", { timeStyle: "short" });
  const to = timeStyle.format(new Date());
  const fromPresent = timeStyle.format(
    new Date().setMinutes(new Date().getMinutes() - 30)
  );
  const fromPast = timeStyle.format(
    new Date().setHours(new Date().getHours() - 4)
  );
  // emissionStatus.state === "current"
  //   ? (from = timeStyle.format(
  //       new Date().setMinutes(new Date().getMinutes() - 30)
  //     ))
  //   : (from = timeStyle.format(new Date().setHours(new Date().getHours() - 4)));
  return { fromPresent, fromPast, to };
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
    const from =
      emissionStatus.state === "current" ? time.fromPresent : time.fromPast;
    fetch(
      `https://api.carbonintensity.org.uk/generation/${date}T${from}Z/${date}T${time.to}Z`
    )
      .then((response) => response.json())
      .then((data) => {
        setFuelPercentage(percentageFromData(data));
      });
  }, [emissionStatus]);
  // useEffect switching data dependent .on state
  // useEffect(() => {
  //   emissionStatus.state === "current"
  //     ? fetch("https://api.carbonintensity.org.uk/generation/")
  //         .then((response) => response.json())
  //         .then((data) => {
  //           setFuelPercentage(percentageCurrent(data));
  //         })
  //     : fetch(
  //         `https://api.carbonintensity.org.uk/generation/2021-07-20T${fourHoursAgo}Z/2021-07-20T${currentTime}Z`
  //       )
  //         .then((response) => response.json())
  //         .then((data) => {
  //           setFuelPercentage(percentagePast(data));
  //         });
  // }, [emissionStatus]);
  //
  // original use effect
  // useEffect(() => {
  //   fetch(`https://api.carbonintensity.org.uk/generation/`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log({ data });
  //       setFuelPercentage(percentageFromCurrentTime(data));
  //     });
  // }, []);

  // to hide button, if opacity = 0.2, hide it
  return (
    <div className={styles.emissions}>
      <div className={styles.titleContainer}>
        <button
          // disabled={disable}
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
          // disabled={disable}
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
    button: {
      background: "none",
      border: "none",
      // cursor: "pointer",
      // "&:disabled": {
      //   cursor: "not-allowed",
      // },
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
