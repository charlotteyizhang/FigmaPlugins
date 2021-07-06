import React from "react";
import userImg from "../img/user-img.jpg"
import { css } from "@emotion/css";


export const MenuBar = () => {
    return (
        <menu className={styles.menubar}>
            <div className="account">
                <h4>My account</h4>
                <img className={styles.img} src={userImg} alt="user img" />
                <h5> Jordan Santiago</h5>
                <p>Premium membership</p>
            </div>


            <div className={styles.links}>
                <h3>Dashboard</h3>
                <ul className={styles.links}>
                    <li><a href="" className={styles.links}>Highlights</a></li>
                </ul>
                <ul className={styles.links}>
                    <li><a href="" className={styles.links}>CO2 emissions</a></li>
                </ul>
                <ul className={styles.links}>
                    <li><a href="" className={styles.links}>Carbon intensity</a></li>
                </ul>
            </div>

            
        </menu>
    );

}

const styles = {
    menubar: css({
        margin:"0",
        padding:"0",
        boxSizing:"border-box", 
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        textAlign:"center",
        width:"15rem",
        height: "100vh",
        ul: { padding: 0, margin: 0 },
        li: { listStyle: "none" },
        "a, a:link, a:active, a:visited": {
          color: "#555761",
          display: "block",
          padding: "0.5rem 1rem",
        },
        ".active": { backgroundColor: "grey" },
    }),
    img: css({
        width:"30%",
        height:"auto",
        borderRadius:"50%"
    }),
    links: css({
        listStyleType:"none",
        padding:"0",
        textDecoration:"none"
    })
}

