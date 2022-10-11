import React from "react";
import {Link} from 'react-router-dom';
import {PanelComponent} from "./PanelComponent";
import {MdAdminPanelSettings} from "react-icons/md";
import {FaUserTie} from "react-icons/fa";
import {FaUserGraduate} from "react-icons/fa";
import {FaBook} from "react-icons/fa";
import {AiFillSound} from "react-icons/ai";
import {FiLogOut} from "react-icons/fi";


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
              <li key={index}>
                <Link to={item.path} className='panel-component-link'>
                  <div className='panel-component-container flex pointer'>
                    {item.icon}
                    <p className="panel-admin-name">{item.title}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
    </div>
  );
}

export default Panel;


        



        







        // <Link className='panel-component-link' to='/dashboard' key={1}>
        //   <PanelComponent text='Jaafar Hawli' icon={<MdAdminPanelSettings className="panel-icon" />} />
        // </Link>
        
        // <Link className='panel-component-link' to='/instructors' key={2}>
        //   <PanelComponent text='Instructors' icon={<FaUserTie className="panel-icon" />} />
        // </Link>
        
        // <Link className='panel-component-link' to='students' key={3}>
        //   <PanelComponent text='Students' icon={<FaUserGraduate className="panel-icon" />} />
        // </Link>
        
        // <Link className='panel-component-link' to='courses' key={4}>
        //   <PanelComponent text='Courses' icon={<FaBook className="panel-icon" />} />
        // </Link>
        
        // <Link className='panel-component-link' to='announcements' key={5}>
        //   <PanelComponent text='Announcements' icon={<AiFillSound className="panel-icon" />} />
        
        // </Link>