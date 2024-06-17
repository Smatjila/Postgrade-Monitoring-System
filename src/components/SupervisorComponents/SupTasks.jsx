import React, { useState } from "react";
import { useParams } from 'react-router-dom';

const SupTasks = () => {
    const [tasks, setTasks] = useState([
        { id: 1, courseId: 1, name: "Software Requirements", description: "Review and approve the requirements document", dueDate: "2024-06-15", status: "Pending" },
        { id: 2, courseId: 1, name: "Software Design", description: "Provide feedback on the software architecture", dueDate: "2024-06-30", status: "In Progress" },
        { id: 3, courseId: 2, name: "Business Analysis", description: "Review the business analysis document", dueDate: "2024-07-15", status: "Complete" },
        { id: 4, courseId: 3, name: "Software Testing", description: "Review the software testing results", dueDate: "2024-07-30", status: "Pending"},
        { id: 5, courseId: 3, name: "Software Deployment", description: "Plan the software deployment strategy", dueDate: "2024-08-15", status: "Pending"},
        { id: 6, courseId: 4, name: "Software Maintenance", description: "Monitor and maintain the software application", dueDate: "2024-08-30", status: "In Progress"},
        { id: 7, courseId: 4, name: "Software Review", description: "Conduct a review of the software application", dueDate: "2024-09-15", status: "Not Started"}
    ]);

    const { id } = useParams();
    const courseId = id ? parseInt(id) : null;
    const filteredTasks = courseId ? tasks.filter(task => task.courseId === courseId) : tasks;

    const handleTaskCompletion = (taskId) => {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                let newStatus;
                if (task.status === "Pending") {
                    newStatus = "In Progress";
                } else if (task.status === "In Progress") {
                    newStatus = "Complete";
                } else {
                    newStatus = "Pending"; 
                }
                return { ...task, status: newStatus };
            }
            return task;
        }));
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

    const pendingTasks = filteredTasks.filter(task => task.status === "Pending");
    const inProgressTasks = filteredTasks.filter(task => task.status === "In Progress");
    const completeTasks = filteredTasks.filter(task => task.status === "Complete");
    const notStartedTasks = filteredTasks.filter(task => task.status === "Not Started");

    return (
        <div className="tasks-container">
            <div className="tasks-card">
                <div className="tasks-card-header">
                    <h2>Supervisor Tasks</h2>
                </div>

                <div className="tasks-card-body">
                    <div className="tasks-cards">
                        <div className="task-column">
                            <h3>Not Started</h3>
                            {notStartedTasks.map(task => (
                                <div className="task-card" key={task.id}>
                                    <h4>{task.name}</h4>
                                    <p>{task.description}</p>
                                    <p style={{ color: getStatusColor(task.status) }}>Due Date: {task.dueDate}</p>
                                    <div className="task-card-status">
                                        <p>Status: {task.status}</p>
                                        <button onClick={() => handleTaskCompletion(task.id)}>
                                            Start Task
                                        </button>
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
                                    <p style={{ color: getStatusColor(task.status) }}>Due Date: {task.dueDate}</p>
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
                                    <p style={{ color: getStatusColor(task.status) }}>Due Date: {task.dueDate}</p>
                                    <div className="task-card-status">
                                        <p>Status: {task.status}</p>
                                        <button onClick={() => handleTaskCompletion(task.id)}>
                                            {task.status === "In Progress" ? "Complete" : "In Progress"}
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
                                    <p style={{ color: getStatusColor(task.status) }}>Due Date: {task.dueDate}</p>
                                    <div className="task-card-status">
                                        <p>Status: {task.status}</p>
                                        <button onClick={() => handleTaskCompletion(task.id)}>
                                            Revert to Pending
                                        </button>
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

export default SupTasks;
