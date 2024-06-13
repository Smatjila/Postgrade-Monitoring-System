import React, { useState } from "react";

const ProgressTasks = () => {
    const [tasks, setTasks] = useState([
        { id: 1, name: "Software Requirements", description: "Complete the requirements document", dueDate: "2024-06-15", status: "Pending" },
        { id: 2, name: "Software Design", description: "Design the software architecture", dueDate: "2024-06-30", status: "In Progress" },
        { id: 3, name: "Software Development", description: "Develop the software application", dueDate: "2024-07-15", status: "Complete" },
        { id: 4, name: "Software Testing", description: "Test the software application", dueDate: "2024-07-30", status: "Pending"},
        { id: 5, name: "Software Deployment", description: "Deploy the software application", dueDate: "2024-08-15", status: "Pending"},
        { id: 6, name: "Software Maintenance", description: "Maintain the software application", dueDate: "2024-08-30", status: "In Progress"},
        { id: 7, name: "Software Review", description: "Review the software application", dueDate: "2024-09-15", status: "Not Started"}
    ]);

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

    // Filter tasks based on status
    const pendingTasks = tasks.filter(task => task.status === "Pending");
    const inProgressTasks = tasks.filter(task => task.status === "In Progress");
    const completeTasks = tasks.filter(task => task.status === "Complete");
    const notStartedTasks = tasks.filter(task => task.status === "Not Started");

    return (
        <div className="tasks-container">
            <div className="tasks-card">
                <div className="tasks-card-header">
                    <h2>Your Tasks</h2>
                </div>

                <div className="tasks-card-body">
                    <div className="tasks-cards">
                        {/* Not Started Tasks Column */}
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

                        {/* Pending Tasks Column */}
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

                        {/* In Progress Tasks Column */}
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
                                            {task.status === "In Progress" ? "Complete" : "Pending"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Complete Tasks Column */}
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

export default ProgressTasks;
