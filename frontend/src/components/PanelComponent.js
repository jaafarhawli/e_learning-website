import React from 'react';
import {MdAdminPanelSettings} from "react-icons/md";
import {FaUserTie} from "react-icons/fa";
import {FaUserGraduate} from "react-icons/fa";
import {FaBook} from "react-icons/fa";
import {AiFillSound} from "react-icons/ai";
import {FiLogOut} from "react-icons/fi";

export const PanelComponent = [

  {
    title: 'Dashboard',
    path: '',
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

  {
    title: 'Announcements',
    path: '/announcements',
    icon: <AiFillSound className="panel-icon" />,
  },
  
  {
    title: 'Logout',
    path: '/logout',
    icon: <FiLogOut className="panel-icon" />,
  }
];

