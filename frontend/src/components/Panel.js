import React from "react";
import {NavLink} from 'react-router-dom';
import {PanelComponent} from "./PanelComponent";
import { InstructorPanelComponent } from "./InstructorPanelComponent";
import {FiLogOut} from "react-icons/fi";

const Panel = () => {

  const clear = () => {
    localStorage.token = '';
    localStorage.name = '';
    localStorage.email = '';
    localStorage.id = '';
    localStorage.type = '';
  }

  let component;
  let role;
  if(localStorage.type === 'admin') {
    component = PanelComponent;
    role = 'Admin';
  }
  else if(localStorage.type === 'instructor') {
    component = InstructorPanelComponent;
    role = 'Instructor';
  }
  // else {
  //   component = StudentPanelComponent;
  // }

  return (
    <div className="admin-panel flex column pointer">
        <div className="panel-component panel-header">
          <h1>Welcome,<span className="bold"> {localStorage.name}</span></h1>
          <p>{role}</p>
        </div>
        <ul className="panel-list">
          {component.map((item, index) => {
            return (         
                <NavLink to={item.path} className="panel-component-link panel-component-container flex pointer" key={index} activeclassname='active'>
                    {item.icon}
                    <p className="panel-admin-name">{item.title}</p>
                </NavLink>
            );
          })}
                <NavLink to='/login' className="panel-component-link panel-component-container flex pointer" key={6} onClick={clear}>
                    <FiLogOut className="panel-icon" />
                    <p className="panel-admin-name">Logout</p>
                </NavLink>
        </ul>
    </div>
  );
}

export default Panel;


        