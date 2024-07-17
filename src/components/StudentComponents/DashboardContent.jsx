import Right from '../../assets/icons/Right-icon.png';
import { Link } from 'react-router-dom';
import RegImage1 from '../../assets/images/RegImage1.jpg';
import RegImage2 from '../../assets/images/RegImage2.jpg';
import RegImage3 from '../../assets/images/RegImage3.jpg';
import RegImage4 from '../../assets/images/RegImage4.jpg';
//import RegImage5 from '../../assets/images/RegImage5.jpg';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from '../../Backend/Config';
import { doc, getDoc } from 'firebase/firestore';
import { ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardContent = () => {

    const [tasks, setTasks] = useState([]);
    const { id } = useParams();
    const StudentID = auth.currentUser.email.substring(0, 9);
    const courseId = id ? parseInt(id) : null;


    useEffect(() => {
        const fetchTasks = async () => {
            const toastId = toast.loading('Loading Data...');
            try {
                const StudentDoc = await getDoc(doc(db, 'Student', StudentID));
                const kanban = StudentDoc.data().Kanban;
                let allTasks = [];
                for (const [kanbanId, task] of Object.entries(kanban)) {
                    allTasks.push({
                        id: kanbanId,
                        courseId: task.ModuleName,
                        name: task.ModuleName,
                        description: task.TaskDescription,
                        dueDate: task.TaskCreation.seconds,
                        status: task.TaskStatus
                    });
                }
                if (courseId) {
                    allTasks = allTasks.filter(task => task.courseId === courseId);
                }

                setTasks(allTasks);
                toast.update(toastId, { render: 'Information loaded successfully', type: 'success', isLoading: false, autoClose: 3500 });
            } catch (error) {
                console.error('Error fetching information: ', error);
                toast.update(toastId, { render: 'Failed to load information', type: 'error', isLoading: false, autoClose: 3500 });
            }
        };

        fetchTasks();
    }, [StudentID, courseId]);
    return (
        <div className="dashboard-container">
            <ToastContainer/>
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
                    {/* Kanban section */}
                    <div className="kanban-section">
                        <h2>Kanban</h2>
                        <div className="kanban-columns">
                            <div className="kanban-column">
                                <h3>Not Started</h3>
                                {tasks.filter(task => task.status === 'Not Started').map(task => (
                                    <div className="kanban-card" key={task.id}>
                                        <h4>{task.name}</h4>
                                        <p>{task.description}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="kanban-column">
                                <h3>Pending</h3>
                                {tasks.filter(task => task.status === 'Pending').map(task => (
                                    <div className="kanban-card" key={task.id}>
                                        <h4>{task.name}</h4>
                                        <p>{task.description}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="kanban-column">
                                <h3>In Progress</h3>
                                {tasks.filter(task => task.status === 'In Progress').map(task => (
                                    <div className="kanban-card" key={task.id}>
                                        <h4>{task.name}</h4>
                                        <p>{task.description}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="kanban-column">
                                <h3>Complete</h3>
                                {tasks.filter(task => task.status === 'Complete').map(task => (
                                    <div className="kanban-card" key={task.id}>
                                        <h4>{task.name}</h4>
                                        <p>{task.description}</p>
                                    </div>
                                ))}
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
