import React from "react";
import {Link} from 'react-router-dom';
import {PanelComponent} from "./PanelComponent";

const Panel = () => {

  return (
    <div className="admin-panel flex column pointer">
        <div className="panel-component panel-header">
          <h1>Welcome,<span className="bold"> Jaafar Hawli</span></h1>
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
        </ul>
    </div>
  );
}

export default Panel;


        