import Right from '../../assets/icons/Right-icon.png';
import { Link } from 'react-router-dom';
import RegImage1 from '../../assets/images/RegImage1.jpg';
import RegImage2 from '../../assets/images/RegImage2.jpg';
import RegImage3 from '../../assets/images/RegImage3.jpg';
import RegImage4 from '../../assets/images/RegImage4.jpg';
import RegImage5 from '../../assets/images/RegImage5.jpg';

const DashboardContent = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <div className="dashboard-card-header">
                    <h2>Your Progress</h2>

                    <div className="dashboard-card-view-more-arrow">
                        <Link to="/courses">
                            <img src={Right} alt="View More" />
                        </Link>
                    </div>
                </div>

                <div className="dashboard-card-body">

                    {/* Course cards */}
                    <div className="course-cards">
                        <div className="course-card">
                            <img src={RegImage1} alt="course" />
                            <h4>Software Requirements</h4>

                            {/* Percentage progress bar here*/}

                            <div className="progress-bar">
                                <div className="progress">
                                    <div className="progress-bar-fill"></div>
                                </div>
                            </div>
                        </div>

                        <div className="course-card">
                            <img src={RegImage2} alt="course" />
                            <h4>Business Analysis</h4>

                            {/* Percentage progress bar here*/}

                            <div className="progress-bar">
                                <div className="progress">
                                    <div className="progress-bar-fill"></div>
                                </div>
                            </div>
                        </div>

                        <div className="course-card">
                            <img src={RegImage3} alt="course" />
                            <h4>Software Project</h4>

                            {/* Percentage progress bar here*/}

                            <div className="progress-bar">
                                <div className="progress">
                                    <div className="progress-bar-fill"></div>
                                </div>
                            </div>
                        </div>

                        <div className="course-card">
                            <img src={RegImage4} alt="course" />
                            <h4>Software Project</h4>

                            {/* Percentage progress bar here*/}

                            <div className="progress-bar">
                                <div className="progress">
                                    <div className="progress-bar-fill"></div>
                                </div>
                            </div>
                        </div>

                        
                    </div>

                    {/* Todays Schedule */}
                    <div className="todays-schedule-body">
                        <div className="todays-schedule-header">
                            <h2>Today's Schedule</h2>

                            <div className="todays-schedule-header-button">
                                {/* Arrow for button for redirect */}
                                <i className="fas fa-arrow-right"></i>
                            </div>
                        </div>

                        <div className="todays-schedule-cards">
                            <div className="todays-schedule-card">
                                <div className="todays-schedule-card-icon">
                                    <img src="https://via.placeholder.com/50" alt="icon" />
                                </div>

                                <div className="todays-schedule-card-details">
                                    <h4>Software Project</h4>
                                    <p>10:00 - 12:00</p>
                                </div>
                            </div>

                            <div className="todays-schedule-card">
                                <div className="todays-schedule-card-icon">
                                    <img src="https://via.placeholder.com/50" alt="icon" />
                                </div>

                                <div className="todays-schedule-card-details">
                                    <h4>Software Project</h4>
                                    <p>10:00 - 12:00</p>
                                </div>
                            </div>

                            <div className="todays-schedule-card">
                                <div className="todays-schedule-card-icon">
                                    <img src="https://via.placeholder.com/50" alt="icon" />
                                </div>

                                <div className="todays-schedule-card-details">
                                    <h4>Software Project</h4>
                                    <p>10:00 - 12:00</p>
                                </div>
                            </div>

                            <div className="todays-schedule-card">
                                <div className="todays-schedule-card-icon">
                                    <img src="https://via.placeholder.com/50" alt="icon" />
                                </div>

                                <div className="todays-schedule-card-details">
                                    <h4>Business Analysis</h4>
                                    <p>10:00 - 12:00</p>
                                </div>
                            </div>

                            <div className="todays-schedule-card">
                                <div className="todays-schedule-card-icon">
                                    <img src="https://via.placeholder.com/50" alt="icon" />
                                </div>

                                <div className="todays-schedule-card-details">
                                    <h4>Software Requirements</h4>
                                    <p>10:00 - 12:00</p>
                                </div>
                            </div>

                            <div className="todays-schedule-card">
                                <div className="todays-schedule-card-icon">
                                    <img src="https://via.placeholder.com/50" alt="icon" />
                                </div>

                                <div className="todays-schedule-card-details">
                                    <h4>Software Requirements</h4>
                                    <p>10:00 - 12:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardContent;
