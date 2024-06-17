import React from 'react';
import { Link } from 'react-router-dom';
import Right from '../../assets/icons/Right-icon.png';
import SupervisorImage1 from '../../assets/images/SupImages/SupImage1.jpg';
import SupervisorImage2 from '../../assets/images/SupImages/SupImage2.jpg';
import SupervisorImage3 from '../../assets/images/SupImages/SupImage3.jpg';
import SupervisorImage4 from '../../assets/images/SupImages/SupImage4.jpg';
import SupervisorImage5 from '../../assets/images/SupImages/SupImage5.jpg';

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

    const todayScheduleData = [
  {
    id: 1,
    icon: "https://via.placeholder.com/50", // Placeholder URL for icon
    title: "APM11A1 Lecture",
    time: "10:00 - 12:00"
  },
  {
    id: 2,
    icon: "https://via.placeholder.com/50", // Placeholder URL for icon
    title: "Research Review",
    time: "13:00 - 15:00"
  },
  {
    id: 3,
    icon: "https://via.placeholder.com/50", // Placeholder URL for icon
    title: "Project Presentation",
    time: "15:00 - 17:00"
  },
  {
    id: 4,
    icon: "https://via.placeholder.com/50", // Placeholder URL for icon
    title: "Team B Meeting",
    time: "17:00 - 18:00"
  },

  {
    id: 5,
    icon: "https://via.placeholder.com/50", // Placeholder URL for icon
    title: "Team A Meeting",
    time: "18:00 - 19:00"
  
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
  
                <div className="sup-todays-schedule-cards">
                    {todayScheduleData.map(item => (
                        <div className="sup-todays-schedule-card" key={item.id}>
                            <div className="sup-todays-schedule-card-icon">
                                <img src={item.icon} alt="icon" />
                            </div>
                            <div className="sup-todays-schedule-card-details">
                            <h4>{item.title}</h4>
                            <p>{item.time}</p>
                        </div>
                    </div>
                    ))}
                </div>
            
            </div>
          </div>
        </div>
      </div>  
    );
}

export default SupDashboardContent;
