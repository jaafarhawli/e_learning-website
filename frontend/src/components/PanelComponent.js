import React from 'react';
import {MdAdminPanelSettings} from "react-icons/md";
import {FaUserTie} from "react-icons/fa";
import {FaUserGraduate} from "react-icons/fa";
import {FaBook} from "react-icons/fa";


export const PanelComponent = [

  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <MdAdminPanelSettings className="panel-icon" />,
  },

  {
    title: 'Instructors',
    path: '/instructors',
    icon: <FaUserTie className="panel-icon" />,
  },

  {
    title: 'Students',
    path: '/students',
    icon: <FaUserGraduate className="panel-icon" />,
  },

  {
    title: 'Courses',
    path: '/courses',
    icon: <FaBook className="panel-icon" />,
  },

];

