import React from "react";
import {css} from "@emotion/css";
import { MenuBar } from "../components/MenuBar";

export const Dashboard = () => {
    return <div className={css({backgroundColor:"#F4F4F4", height:"100vh"})}>
        <MenuBar/>
        </div>
}