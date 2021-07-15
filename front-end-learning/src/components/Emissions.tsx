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

export const Emissions = () => {
  const chnagePercentage = () => {};
  // const [color, setColor] = useState<string>("#78D5C6");
  // const origin = 5;
  const [percentage, setPercentage] = useState(5);
  useEffect(() => {
    setTimeout(() => setPercentage(percentage + 1), 5000);
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
        {/* <input type="range" /> */}
        <span className={styles.biomass}></span>
        <span className={styles.hydro}></span>
        <span className={styles.wind}></span>
        <span className={styles.solar}></span>
        <span className={styles.coal}></span>
        <span className={styles.gas}></span>
        <span className={styles.imports}></span>
        <span className={styles.nuclear}></span>
        <span className={styles.others}></span>
      </div>
      <table className={styles.table}>
        <tr>
          <th></th>
          <th>Fuel Type</th>
          <th>% Emissions</th>
        </tr>
        <tr>
          <td>
            <Biomass />
          </td>
          <td>Biomass</td>
          <td>{percentage}</td>
        </tr>
        <tr>
          <td>
            <Hydro />
          </td>
          <td>Hydro</td>
          <td>18</td>
        </tr>
        <tr>
          <td>
            <Wind />
          </td>
          <td>Wind</td>
          <td>10</td>
        </tr>
        <tr>
          <td>
            <Solar />
          </td>
          <td>Solar</td>
          <td>20</td>
        </tr>
        <tr>
          <td>
            <Coal />
          </td>
          <td>Coal</td>
          <td>7</td>
        </tr>
        <tr>
          <td>
            <Gas />
          </td>
          <td>Gas</td>
          <td>17</td>
        </tr>
        <tr>
          <td>
            <Imports />
          </td>
          <td>Imports</td>
          <td>6</td>
        </tr>
        <tr>
          <td>
            <Nuclear />
          </td>
          <td>Nuclear</td>
          <td>10</td>
        </tr>
        <tr>
          <td>
            <Others />
          </td>
          <td>Others</td>
          <td>7</td>
        </tr>
      </table>
    </div>
  );
};

const styles = {
  emissions: css({
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
  }),
  chart: css({
    // border: "1px solid black",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "row",
    marginBottom: themeSpacing.large,
  }),
  biomass: css({
    backgroundColor: "#78D5C6",
    width: "5%",
    height: themeSpacing.default,
    borderRadius: "20px 0 0 20px",
  }),
  hydro: css({
    backgroundColor: "#40C1AC",
    width: "18%",
    height: themeSpacing.default,
  }),
  wind: css({
    backgroundColor: "#259482",
    width: "10%",
    height: themeSpacing.default,
  }),
  solar: css({
    backgroundColor: "#216056",
    width: "20%",
    height: themeSpacing.default,
  }),
  coal: css({
    backgroundColor: "#F79CAB",
    width: "7%",
    height: themeSpacing.default,
  }),
  gas: css({
    backgroundColor: "#EE8092",
    width: "17%",
    height: themeSpacing.default,
  }),
  imports: css({
    backgroundColor: "#F1566F",
    width: "6%",
    height: themeSpacing.default,
  }),
  nuclear: css({
    backgroundColor: "#D22949",
    width: "10%",
    height: themeSpacing.default,
  }),
  others: css({
    backgroundColor: "#BA0C2F",
    width: "7%",
    height: themeSpacing.default,
    borderRadius: "0 20px 20px 0",
  }),
  table: css({
    width: "100%",
    justifyContent: "space-between",
    textAlign: "left",
    "th, td": {
      padding: themeSpacing.default,
    },
  }),
};
