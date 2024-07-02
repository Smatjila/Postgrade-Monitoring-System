import React from 'react';
import Logo from '../assets/images/UJ_Logo.png'
import Grid from '../assets/icons/Grid-icon.png'
import Collaboration from '../assets/icons/Collaboration-icon.png'
import Logout from '../assets/icons/Logout-icon.png'
import Tasks from '../assets/icons/Tasks-icon.png'
import Courses from '../assets/icons/Course-icon.png'
import { Link, useLocation } from 'react-router-dom';
import '../App.css'; 

const Sidebar = () => {
  // Get the current pathname using useLocation hook
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={Logo} alt='UJ Logo' />
      </div>
      <div className="sidebar-content">
        <ul>
          <li>
            <img src={Grid} alt='Grid Icon' className='icon'/>
            {/* Add 'active' class if the current path is '/' */}
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Dashboard</Link>
          </li>
          <li>
            <img src={Courses} alt='Courses Icon' className='icon'/>
            {/* Add 'active' class if the current path is '/courses' */}
            <Link to="/courses" className={location.pathname === '/courses' ? 'active' : ''}>Courses</Link>
          </li>
          <li>
            <img src={Tasks} alt='Tasks Icon' className='icon'/>
            {/* Add 'active' class if the current path is '/tasks' */}
            <Link to="/tasks" className={location.pathname === '/tasks' ? 'active' : ''}>Tasks</Link>
          </li>
          <li>
            <img src={Collaboration} alt='Collaboration Icon' className='icon'/>
            {/* Add 'active' class if the current path is '/connect' */}
            <Link to="/connect" className={location.pathname === '/connect' ? 'active' : ''}>Connect</Link>
          </li>
          <li>
            <img src={Logout} alt='Logout Icon' className='icon'/>
            <Link to="#">Log Out</Link>
          </li>
        </ul>
        <div className='sidebar-additional-card'>
          <h3>Student Details</h3>
          {/* Avatar and profile details container */}
          <div className='profile-container'>
            {/* Avatar */}
            <img src="https://via.placeholder.com/150" alt="Avatar" className='profile-avatar' />
            {/* Profile details */}
            <div className='profile-details'>
              <h4>NMS Matjila</h4>
              <p>123456789</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
