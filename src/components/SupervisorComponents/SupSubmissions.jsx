import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Submissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        // Simulating fetching data from an API
        const fetchData = async () => {
            try {
                // Simulated API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Mock data with multiple courses
                const data = [
                    { courseName: "Advanced Programming 1A" },
                    {
                        submission_id: 1,
                        student_number: "223589748",
                        assignment_id: 1,
                        submission_date: "2021-09-01",
                        grade: 90
                    },
                    {
                        submission_id: 2,
                        student_number: "223589749",
                        assignment_id: 1,
                        submission_date: "2021-09-01",
                        grade: 85
                    },
                    {
                        submission_id: 3,
                        student_number: "223589750",
                        assignment_id: 1,
                        submission_date: "2021-09-01",
                        grade: 95
                    },
                    {
                        submission_id: 4,
                        student_number: "223589751",
                        assignment_id: 1,
                        submission_date: "2021-09-01",
                        grade: 80
                    },
                    {
                        submission_id: 5,
                        student_number: "223589752",
                        assignment_id: 1,
                        submission_date: "2021-09-01",
                        grade: 75
                    },

                    { courseName: "Advanced Business Analysis 1A" },
                    {
                        submission_id: 6,
                        student_number: "223589748",
                        assignment_id: 1,
                        submission_date: "2021-09-01",
                        grade: 90
                    },
                    {
                        submission_id: 7,
                        student_number: "223589749",
                        assignment_id: 1,
                        submission_date: "2021-09-01",
                        grade: 85
                    },
                    {
                        submission_id: 8,
                        student_number: "223589750",
                        assignment_id: 1,
                        submission_date: "2021-09-01",
                        grade: 95
                    },
                    {
                        submission_id: 9,
                        student_number: "223589751",
                        assignment_id: 1,
                        submission_date: "2021-09-01",
                        grade: 80
                    },
                    {
                        submission_id: 10,
                        student_number: "223589752",
                        assignment_id: 1,
                        submission_date: "2021-09-01",
                        grade: 75
                    }
                ];

                setSubmissions(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to handle opening the modal and setting the selected student
    const handleOpenModal = (studentNumber) => {
        const studentSubmissions = submissions.filter(submission => submission.student_number === studentNumber);
        setSelectedStudent(studentSubmissions);
        setModalOpen(true);
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setSelectedStudent(null);
        setModalOpen(false);
    };

    // Render the component
    return (
        <div className="submission-container">
            <div className="submission-card">
                <div className="submission-card-header">
                    <h2>Submissions</h2>
                </div>
                <div className="submission-card-body">
                    {/* <h3>Submissions List</h3> */}
                    <table className="submission-table">
                        <thead>
                            <tr>
                                <th className="submission-table-header">Submission ID</th>
                                <th className="submission-table-header">Student Number</th>
                                <th className="submission-table-header">Assignment ID</th>
                                <th className="submission-table-header">Submission Date</th>
                                <th className="submission-table-header">Grade</th>
                                <th className="submission-table-header">Actions</th> {/* New column for actions */}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6">Loading submissions...</td>
                                </tr>
                            ) : (
                                submissions.map((submission, index) => {
                                    if (submission.courseName) {
                                        return (
                                            <tr key={index}>
                                                <td colSpan="6">{submission.courseName}</td>
                                            </tr>
                                        );
                                    }

                                    return (
                                        <tr key={submission.submission_id}>
                                            <td>{submission.submission_id}</td>
                                            <td>{submission.student_number}</td>
                                            <td>{submission.assignment_id}</td>
                                            <td>{submission.submission_date}</td>
                                            <td>{submission.grade}</td>
                                            <td>
                                                <button onClick={() => handleOpenModal(submission.student_number)}>Review Submission</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for displaying student submissions */}
            {modalOpen && (
                <motion.div className="modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Student Submissions</h2>
                        {selectedStudent && selectedStudent.length > 0 && (
                            <table className="student-submissions-table">
                                <thead>
                                    <tr>
                                        <th>Submission ID</th>
                                        <th>Assignment ID</th>
                                        <th>Submission Date</th>
                                        <th>Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedStudent.map((submission, index) => (
                                        <tr key={index}>
                                            <td>{submission.submission_id}</td>
                                            <td>{submission.assignment_id}</td>
                                            <td>{submission.submission_date}</td>
                                            <td>{submission.grade}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {(!selectedStudent || selectedStudent.length === 0) && (
                            <p>No submissions found for this student.</p>
                        )}
                        <button onClick={handleCloseModal}>Close</button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Submissions;
