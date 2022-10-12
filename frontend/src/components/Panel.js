import React from "react";
import {Link} from 'react-router-dom';
import {PanelComponent} from "./PanelComponent";
import {FiLogOut} from "react-icons/fi";

const Panel = () => {

  const clear = () => {
    localStorage.token = '';
    localStorage.name = '';
    localStorage.email = '';
    localStorage.id = '';
    localStorage.type = '';
  }

  return (
    <div className="admin-panel flex column pointer">
        <div className="panel-component panel-header">
          <h1>Welcome,<span className="bold"> {localStorage.name}</span></h1>
          <p>Admin</p>
        </div>
        <ul className="panel-list">
          {PanelComponent.map((item, index) => {
            return (         
                <Link to={item.path} className="panel-component-link panel-component-container flex pointer" key={index}>
                    {item.icon}
                    <p className="panel-admin-name">{item.title}</p>
                </Link>
            );
          })}
                <Link to='/login' className="panel-component-link panel-component-container flex pointer" key={6} onClick={clear}>
                    <FiLogOut className="panel-icon" />
                    <p className="panel-admin-name">Logout</p>
                </Link>
        </ul>
    </div>
  );
}

export default Panel;


        