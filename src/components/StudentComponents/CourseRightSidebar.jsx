import React, { useState, useEffect } from 'react';
import ChangesIcon from '../../assets/icons/Changes-icon.png';

const CourseSidebar = () => {
    // Sample data for changes (you can replace this with actual fetched data)
    const [changes, setChanges] = useState([
        { id: 1, date: '2024-06-10', description: 'Initial draft submission', details: 'Submitted the initial draft of the thesis.' },
        { id: 2, date: '2024-06-12', description: 'Incorporated feedback on chapter 1', details: 'Incorporated feedback received on chapter 1 of the thesis.' },
        { id: 3, date: '2024-06-15', description: 'Revised conclusion section', details: 'Revised and finalized the conclusion section of the assignment.' },
    ]);

    useEffect(() => {
        // Fetch changes from API or update state as needed
        // Example: fetchChanges();
    }, []);

    return (
        <div className="right-sidebar">
            <div className="right-sidebar-header">
                <h2>Recent Changes</h2>
            </div>

            <div className="right-sidebar-content">
                <div className="right-sidebar-tracking-cards">
                    {changes.map((change) => (
                        <div key={change.id} className="right-sidebar-tracking-card">
                            <div className="right-sidebar-tracking-card-details">
                                <h3>{change.description}</h3>
                                <p>{change.details}</p>
                                <p className="change-date">{change.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CourseSidebar;
