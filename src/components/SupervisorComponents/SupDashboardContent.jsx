import { Link } from 'react-router-dom';
import Right from '../../assets/icons/Right-icon.png';
import SupervisorImage1 from '../../assets/images/SupImages/SupImage1.jpg';
import SupervisorImage2 from '../../assets/images/SupImages/SupImage2.jpg';
import SupervisorImage3 from '../../assets/images/SupImages/SupImage3.jpg';
import SupervisorImage4 from '../../assets/images/SupImages/SupImage4.jpg';
import SupervisorImage5 from '../../assets/images/SupImages/SupImage5.jpg';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, db } from '../../Backend/Config';
import { ToastContainer ,toast } from 'react-toastify';
import { getDoc, doc } from 'firebase/firestore';
import 'react-toastify/dist/ReactToastify.css';
import Calendar from '../Shared/Calendar';

const SupDashboardContent = () => {
    const [tasks, setTasks] = useState([]);
    const { id } = useParams();
    const supervisorId = auth.currentUser.email.substring(0, 9);
    const courseId = id ? parseInt(id) : null;

    useEffect(() => {
        const fetchTasks = async () => {
            const toastId = toast.loading('Loading Data...');
            try {
                const supervisorDoc = await getDoc(doc(db, 'Supervisor', supervisorId));
                const kanban = supervisorDoc.data().Kanban;
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
    }, [supervisorId, courseId]);

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
          <ToastContainer />
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
                                <div className="progress-bar">
                                    <div className="progress">
                                        <div className="progress-bar-fill"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
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

                    {/* Today's Schedule */}
                    <div className="sup-todays-schedule-body">
                        <div className="sup-todays-schedule-header">
                            <h2>Current Schedule</h2>
                        </div>
                        <Calendar/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SupDashboardContent;
