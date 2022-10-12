import React from 'react';
import {FaBook} from "react-icons/fa";
import {VscTasklist} from "react-icons/vsc";
import {BiVolumeFull} from "react-icons/bi";



export const InstructorPanelComponent = [

  {
    title: 'Courses',
    path: '/instructor_courses',
    icon: <FaBook className="panel-icon" />,
  },

  {
    title: 'Assignments',
    path: '/instructor_assignments',
    icon: <VscTasklist className="panel-icon" />,
  },

  {
    title: 'Announcements',
    path: '/instructor_announcements',
    icon: <BiVolumeFull className="panel-icon" />,
  },

];