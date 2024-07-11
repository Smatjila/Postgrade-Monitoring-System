import React, { useState, useEffect } from 'react';
// import ChangesIcon from '../assets/icons/Changes-icon.png';

const SupCourseRightSidebar = () => {
    // Sample data for student submissions (replace with actual fetched data)
    const [submissions, setSubmissions] = useState([
        { id: 1, date: '2024-06-10', student: 'John Doe', description: 'Thesis Initial Draft', details: 'Submitted the initial draft of the thesis.' },
        { id: 2, date: '2024-06-12', student: 'Jane Smith', description: 'Chapter 1 Feedback', details: 'Submitted chapter 1 with incorporated feedback.' },
        { id: 3, date: '2024-06-15', student: 'Michael Brown', description: 'Final Conclusion', details: 'Submitted the revised conclusion section.' },
    ]);

    useEffect(() => {
        // Fetch submissions from API or update state as needed
        // Example: fetchSubmissions();
    }, []);

    return (
        <div className="right-sidebar">
            <div className="right-sidebar-header">
                <h2>Student Submissions</h2>
            </div>

            <div className="right-sidebar-content">
                <div className="right-sidebar-tracking-cards">
                    {submissions.map((submission) => (
                        <div key={submission.id} className="right-sidebar-tracking-card">
                            <div className="right-sidebar-tracking-card-details">
                                <h3>{submission.description}</h3>
                                <p>{submission.details}</p>
                                <p><strong>Student:</strong> {submission.student}</p>
                                <p className="submission-date">{submission.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SupCourseRightSidebar;
