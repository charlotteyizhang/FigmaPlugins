import React from "react";
import userImg from "../img/user-img.jpg";
import { css } from "@emotion/css";
import {EmailIcon} from "../img/Email";
import { themeSpacing } from "../basicStyle/spacing";
import { PhoneIcon } from "../img/Phone";


export const MenuBar = () => {
    return (
        <menu className={styles.menubar}>
            <div className={styles.account}>
                <h4>My account</h4>
                <img className={styles.img} src={userImg} alt="user img" />
                <h5> Jordan Santiago</h5>
                <p>Premium membership</p>
            </div>


            <div className={styles.dashboardLinks}>
                <hr></hr>
                <h3>Dashboard</h3>
                <ul className={styles.dashboardLinks}>
                    <li><a href="">Highlights</a></li>
                    <li><a href="">CO2 emissions</a></li>
                    <li><a href="">Carbon intensity</a></li>
                </ul>
                <hr></hr>
            </div>

            <div className={styles.contact}>
                <h4>Contact information</h4>
                <div className={styles.contactInfo}>
                    <PhoneIcon width="1rem" height="1rem" color="#00558C"/>
                    <p>01234567890</p>
                    </div>
                <div className={styles.contactInfo}>
                    <EmailIcon width="1rem" height="1rem" color="#00558C"/>
                    <p>email@email.com</p>
                    </div>
            </div>

            <div className={styles.buttons}>
                <button type="button">Support</button>
                <button type="button">Logout</button>
            </div>

            
        </menu>
    );

}

const styles = {
    menubar: css({
        color: "#555761",
        overflow:"none",
        padding:themeSpacing.large,
        boxSizing:"border-box", 
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        textAlign:"center",
        width:"15rem",
        height: "100vh",
        ul: { padding: 0, margin: 0 },
        li: { listStyle: "none" },
        "a, a:link, a:visited": {
            color: "#555761",
            textDecoration:"none",
            display: "block",
            padding: "0.5rem 0",
        },
        "a:hover, a:active": {
            color:"#00558C",
            fontWeight:"bold",
          },
        ".active": { backgroundColor: "grey" },
        "button": {
            backgroundColor:"#00558C",
            color:"white",
            marginBottom: themeSpacing.small,
            padding: "1rem 1.5rem",
            border:"none",
            borderRadius:"10px",
          },
        "p": {
            fontSize:"14px"
        }
    }),
    account: css({
        "img": {
            margin:"1rem 0",
        },
        "h5": {
            marginBottom:"0.3rem",
        }
    }),
    img: css({
        width:"30%",
        height:"auto",
        borderRadius:"50%"
    }),
    dashboardLinks: css({
        // ">*"
        margin:"2rem 0",
        textAlign:"left",
        listStyleType:"none",
        "h3": {
            margin:"2rem 0 0.7rem",
        },
        "ul": {
            marginBottom:"2rem",
        },
        "hr": {
            color:"#39393B",
            opacity:"0.3",
        }
    }),
    contact: css({
        marginBottom:"2rem",
        textAlign:"left",
        "h4": {
            margin:"1rem 0 0.7rem",
        },
        "p": {
            marginBottom:"0.5rem",
            display: "inline",
            paddingLeft:"1rem",
        },
    }),
    contactInfo: css({
        display:"flex",
        flexDirection:"row",
    }),
    buttons: css({
        textAlign:"left",
        display: "flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
    }),
}

