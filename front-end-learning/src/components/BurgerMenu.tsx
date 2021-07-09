import React from "react";
import userImg from "../img/user-img.jpg";
import { css } from "@emotion/css";
import { EmailIcon } from "../img/Email";
import { themeSpacing } from "../basicStyle/spacing";
import { PhoneIcon } from "../img/Phone";
import { SupportIcon } from "../img/Support";
import { LogoutIcon } from "../img/Logout";

export const BurgerMenu = ({}) => {
  return (
    <menu className={styles.burgermenu}>
      <h3>Dashboard</h3>
      <ul>
        <li>
          <a href="#">Highlights</a>
        </li>
        <li>
          <a href="#">CO2 emissions</a>
        </li>
        <li>
          <a href="#">Carbon intensity</a>
        </li>
      </ul>
      <div className={styles.burgerbutton}>
        <LogoutIcon width="1rem" height="1rem" />
        <h4>Account</h4>
      </div>
    </menu>
  );
};

const styles = {
  burgermenu: css({
    background: "pink",
    zIndex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    li: {
      backgroundColor: "grey",
    },
  }),
  burgerbutton: css({}),
};
