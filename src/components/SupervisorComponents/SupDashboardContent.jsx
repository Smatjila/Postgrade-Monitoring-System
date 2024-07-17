import React from 'react';
import { Link } from 'react-router-dom';
import Right from '../../assets/icons/Right-icon.png';
import SupervisorImage1 from '../../assets/images/SupImages/SupImage1.jpg';
import SupervisorImage2 from '../../assets/images/SupImages/SupImage2.jpg';
import SupervisorImage3 from '../../assets/images/SupImages/SupImage3.jpg';
import SupervisorImage4 from '../../assets/images/SupImages/SupImage4.jpg';
import SupervisorImage5 from '../../assets/images/SupImages/SupImage5.jpg';
import Calander from '../Calander';
const SupDashboardContent = () => {
    const supervisionData = [
    {
        id: 1,
        image: SupervisorImage1,
        title: 'Software Project Supervision',
        supervisor: 'Prof. John Doe',
        student: 'NMS Matjila'
    },
    {
        id: 2,
        image: SupervisorImage2,
        title: 'Research Paper Guidance',
        supervisor: 'Dr. Jane Smith',
        student: 'K Madaba'
    },
    {
        id: 3,
        image: SupervisorImage3,
        title: 'Project Management',
        supervisor: 'Prof. John Doe',
        student: 'NMS Matjila'
    },
    {
        id: 4,
        image: SupervisorImage4,
        title: 'Software Development',
        supervisor: 'Dr. Jane Smith',
        student: 'TJ Montso'
    },
    {
        id: 5,
        image: SupervisorImage5,
        title: 'Software Testing',
        supervisor: 'Prof. John Doe',
        student: 'NMS Matjila'
    }
    ];


    return (
        <div className="sup-dashboard-container">
        <div className="sup-dashboard-card">
          <div className="sup-dashboard-card-header">
            <h2>Supervisor Dashboard</h2>
            <div className="sup-dashboard-card-view-more-arrow">
              <Link to="/supervisor_courses">
                <img src={Right} alt="View More" />
              </Link>
            </div>
          </div>
  
          <div className="sup-dashboard-card-body">
            {/* Supervision cards */}
            <div className="supervision-cards">
              {supervisionData.map(item => (
                <div className="supervision-card" key={item.id}>
                  <img src={item.image} alt="supervision" />
                  <h4>{item.title}</h4>
                  <div className="supervisor-details">
                    <h3>Supervised by: {item.supervisor}</h3>
                    <p>Student: {item.student}</p>
                  </div>
                  {/* Progress bar */}
                  <div className="progress-bar">
                    <div className="progress">
                      <div className="progress-bar-fill"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
  
            {/* Today's Schedule */}
            <div className="sup-todays-schedule-body">
              <div className="sup-todays-schedule-header">
                <h2>Today's Schedule</h2>
              </div>
              <Calander/>
            </div>
          </div>
        </div>
      </div>  
    );
}

export default SupDashboardContent;
