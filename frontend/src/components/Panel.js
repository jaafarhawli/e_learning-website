import React from "react";
import PanelComponent from "./PanelComponent";
import {MdAdminPanelSettings} from "react-icons/md";
import {FaUserTie} from "react-icons/fa";
import {FaUserGraduate} from "react-icons/fa";
import {FaBook} from "react-icons/fa";
import {AiFillSound} from "react-icons/ai";
import {FiLogOut} from "react-icons/fi";

const Panel = () => {
  return (
    <div className="admin-panel flex column pointer">
        <h1 className="panel-component panel-header">Admin</h1>
    </div>
  );
}

export default Panel;
