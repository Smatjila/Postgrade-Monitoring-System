import React from 'react';
import Logo from '../../assets/images/UJ_Logo.png';
import Grid from '../../assets/icons/Grid-icon.png';
import Collaboration from '../../assets/icons/Collaboration-icon.png';
import Logout from '../../assets/icons/Logout-icon.png';
import Tasks from '../../assets/icons/Tasks-icon.png';
import Courses from '../../assets/icons/Course-icon.png';
import Submit from '../../assets/icons/Submit-icon.png';
import { Link, useLocation } from 'react-router-dom';
import './Styles.css'; 

const SupSidebar = () => {
  // Get the current pathname using useLocation hook
  const location = useLocation();

  return (
    <div className="sup-sidebar"> {/* Updated className to 'sup-sidebar' */}
      <div className="sup-sidebar-header"> {/* Updated className to 'sup-sidebar-header' */}
        <img src={Logo} alt='UJ Logo' />
      </div>
      <div className="sup-sidebar-content"> {/* Updated className to 'sup-sidebar-content' */}
        <ul>
          <li>
            <img src={Grid} alt='Grid Icon' className='sup-icon'/> {/* Updated className to 'sup-icon' */}
            {/* Add 'active' class if the current path is '/' */}
            <Link to="/supervisor" className={location.pathname === '/supervisor' ? 'sup-active' : ''}>Dashboard</Link> {/* Updated className to 'sup-active' */}
          </li>
          <li>
            <img src={Courses} alt='Courses Icon' className='sup-icon'/> {/* Updated className to 'sup-icon' */}
            {/* Add 'active' class if the current path is '/courses' */}
            <Link to="/supervisor_courses" className={location.pathname === '/supervisor_courses' ? 'sup-active' : ''}>Courses</Link> {/* Updated className to 'sup-active' */}
          </li>
          <li>
            <img src={Submit} alt='Tasks Icon' className='sup-icon'/> {/* Updated className to 'sup-icon' */}
            {/* Add 'active' class if the current path is '/tasks' */}
            <Link to="/supervisor_submissions" className={location.pathname === '/supervisor_submissions' ? 'sup-active' : ''}>Submissions</Link> {/* Updated className to 'sup-active' */}
          </li>
          <li>
            <img src={Tasks} alt='Tasks Icon' className='sup-icon'/> {/* Updated className to 'sup-icon' */}
            {/* Add 'active' class if the current path is '/tasks' */}
            <Link to="/supervisor_tasks" className={location.pathname === '/supervisor_tasks' ? 'sup-active' : ''}>Tasks</Link> {/* Updated className to 'sup-active' */}
          </li>
          <li>
            <img src={Collaboration} alt='Collaboration Icon' className='sup-icon'/> {/* Updated className to 'sup-icon' */}
            {/* Add 'active' class if the current path is '/connect' */}
            <Link to="/supervisor_connect" className={location.pathname === '/supervisor_connect' ? 'sup-active' : ''}>Connect</Link> {/* Updated className to 'sup-active' */}
          </li>
          <li>
            <img src={Logout} alt='Logout Icon' className='sup-icon'/> {/* Updated className to 'sup-icon' */}
            <Link to="#" className="sup-logout">Log Out</Link> {/* Added className 'sup-logout' */}
          </li>
        </ul>
        <div className='sup-sidebar-additional-card'> {/* Updated className to 'sup-sidebar-additional-card' */}
          <h3>Supervsior Details</h3>
          {/* Avatar and profile details container */}
          <div className='sup-profile-container'> {/* Updated className to 'sup-profile-container' */}
            {/* Avatar */}
            <img src="https://avatar.iran.liara.run/username?username=nosipho+Mahlangu" alt="Avatar" className='sup-profile-avatar' /> {/* Updated className to 'sup-profile-avatar' */}
            {/* Profile details */}
            <div className='sup-profile-details'> {/* Updated className to 'sup-profile-details' */}
              <h4>N Mahlangu</h4>
              <p>2274879874</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupSidebar;
