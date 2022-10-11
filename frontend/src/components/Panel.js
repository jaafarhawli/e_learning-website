import React from "react";
import {Link} from 'react-router-dom';
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
        <Link className='panel-component-link' to='#' >
          <PanelComponent text='Jaafar Hawli' icon={<MdAdminPanelSettings className="panel-icon" />} />
        </Link>
        <Link className='panel-component-link' >
          <PanelComponent text='Instructors' icon={<FaUserTie className="panel-icon" />} />
        </Link>
        <Link className='panel-component-link' >
          <PanelComponent text='Students' icon={<FaUserGraduate className="panel-icon" />} />
        </Link>
        <Link className='panel-component-link' >
          <PanelComponent text='Courses' icon={<FaBook className="panel-icon" />} />
        </Link>
        <Link className='panel-component-link' >
          <PanelComponent text='Announcements' icon={<AiFillSound className="panel-icon" />} />
        </Link>
        <Link className='panel-component-link' >
          <PanelComponent text='Logout' icon={<FiLogOut className="panel-icon" />} />
        </Link> 
    </div>
  );
}

export default Panel;
