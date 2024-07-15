import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../Backend/Config'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProgressTasks = () => {
    const [tasks, setTasks] = useState([]);
    const { id } = useParams();
    const userId = auth.currentUser.email.substring(0, 9);
    const courseId = id ? parseInt(id) : null;

    useEffect(() => {
        const fetchTasks = async () => {
            const toastId = toast.loading('Loading tasks...'); 
            try {
                const StudentDoc = await getDoc(doc(db, 'Student', userId));
                const kanban = StudentDoc.data().Kanban;
                console.log(kanban)
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
                toast.update(toastId, { render: 'Tasks loaded successfully', type: 'success', isLoading: false, autoClose: 2000 }); // Dismiss loading toast on success
            } catch (error) {
                console.error('Error fetching tasks: ', error);
                toast.update(toastId, { render: 'Failed to load tasks', type: 'error', isLoading: false, autoClose: 2000 }); // Dismiss loading toast on error
            }
        };

        fetchTasks();
    }, [userId, courseId]);

    const handleTaskCompletion = async (taskId) => {
        const toastId = toast.loading('Updating task status...'); 
        try {
            const taskIndex = tasks.findIndex(task => task.id === taskId);
            if (taskIndex === -1) return;

            let newStatus;
            if (tasks[taskIndex].status === "Pending") {
                newStatus = "In Progress";
            } else if (tasks[taskIndex].status === "In Progress") {
                newStatus = "Complete";
            } else {
                newStatus = "Pending"; 
            }

            const taskDocRef = doc(db, 'Student', userId);
            const taskDoc = await getDoc(taskDocRef);

            if (taskDoc.exists) {
                const Kanban = taskDoc.data().Kanban;
                Kanban[taskId].TaskStatus = newStatus;

                await updateDoc(taskDocRef, { Kanban: Kanban });
                setTasks(tasks.map(task => {
                    if (task.id === taskId) {
                        return { ...task, status: newStatus };
                    }
                    return task;
                }));

                toast.update(toastId, { render: 'Task status updated successfully', type: 'success', isLoading: false, autoClose: 2000 }); // Show success toast
            } else {
                console.error('Task document does not exist');
                toast.update(toastId, { render: 'Failed to update task status: Task document does not exist', type: 'error', isLoading: false, autoClose: 2000 }); // Show error toast
            }
        } catch (error) {
            console.error('Error updating task status: ', error);
            toast.update(toastId, { render: 'Failed to update task status', type: 'error', isLoading: false, autoClose: 2000 }); // Show error toast
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'orange';
            case 'In Progress':
                return 'blue';
            case 'Complete':
                return 'green';
            case 'Not Started':
                return 'gray';
            default:
                return 'black';
        }
    };

    const pendingTasks = tasks.filter(task => task.status === "Pending");
    const inProgressTasks = tasks.filter(task => task.status === "In Progress");
    const completeTasks = tasks.filter(task => task.status === "Complete");
    const notStartedTasks = tasks.filter(task => task.status === "Not Started");

    return (
        <div className="tasks-container">
            <ToastContainer />
            <div className="tasks-card">
                <div className="tasks-card-header">
                    <h2>Your Tasks</h2>
                </div>
                <div className="tasks-card-body">
                    <div className="tasks-cards">
                        <div className="task-column">
                            <h3>Not Started</h3>
                            {notStartedTasks.map(task => (
                                <div className="task-card" key={task.id}>
                                    <h4>{task.name}</h4>
                                    <p>{task.description}</p>
                                    <p style={{ color: getStatusColor(task.status) }}>Due Date: {new Date(task.dueDate * 1000).toLocaleDateString()}</p>
                                    <div className="task-card-status">
                                        <p>Status: {task.status}</p>
                                        <button onClick={() => handleTaskCompletion(task.id)}>Start Task</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="task-column">
                            <h3>Pending</h3>
                            {pendingTasks.map(task => (
                                <div className="task-card" key={task.id}>
                                    <h4>{task.name}</h4>
                                    <p>{task.description}</p>
                                    <p style={{ color: getStatusColor(task.status) }}>Due Date: {new Date(task.dueDate * 1000).toLocaleDateString()}</p>
                                    <div className="task-card-status">
                                        <p>Status: {task.status}</p>
                                        <button onClick={() => handleTaskCompletion(task.id)}>
                                            {task.status === "Pending" ? "In Progress" : "Pending"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="task-column">
                            <h3>In Progress</h3>
                            {inProgressTasks.map(task => (
                                <div className="task-card" key={task.id}>
                                    <h4>{task.name}</h4>
                                    <p>{task.description}</p>
                                    <p style={{ color: getStatusColor(task.status) }}>Due Date: {new Date(task.dueDate * 1000).toLocaleDateString()}</p>
                                    <div className="task-card-status">
                                        <p>Status: {task.status}</p>
                                        <button onClick={() => handleTaskCompletion(task.id)}>
                                            {task.status === "In Progress" ? "Complete" : "Pending"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="task-column">
                            <h3>Complete</h3>
                            {completeTasks.map(task => (
                                <div className="task-card" key={task.id}>
                                    <h4>{task.name}</h4>
                                    <p>{task.description}</p>
                                    <p style={{ color: getStatusColor(task.status) }}>Due Date: {new Date(task.dueDate * 1000).toLocaleDateString()}</p>
                                    <div className="task-card-status">
                                        <p>Status: {task.status}</p>
                                        <button onClick={() => handleTaskCompletion(task.id)}>Revert to Pending</button>
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

export default ProgressTasks;
