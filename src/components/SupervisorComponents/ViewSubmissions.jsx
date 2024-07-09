import React from 'react';
import Modal from 'react-modal';
import ReviewSubmissionModal from '../StudentComponents/Review';

const ViewSubmissionsModal = ({ isOpen, onRequestClose, studentSubmissions }) => {
    const [selectedStudent, setSelectedStudent] = React.useState(null);

    const openReviewModal = (student) => {
        setSelectedStudent(student);
    };

    const closeReviewModal = () => {
        setSelectedStudent(null);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            // style={customModalStyles}
            className="view-submissions-modal"
            overlayClassName="view-submissions-modal-overlay"
            contentLabel="View Submissions Modal"
        >
            <div className="modal-content">
                <h2>Student Submissions</h2>
                <table className="submission-table">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Submission Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentSubmissions.map((student, index) => (
                            <tr key={index}>
                                <td>{student.studentId}</td>
                                <td>{student.submitted ? 'Submitted' : 'Not Submitted'}</td>
                                <td>
                                    {student.submitted && (
                                        <button onClick={() => openReviewModal(student)}>Review Submission</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={onRequestClose}>Close</button>

                {/* Review Submission Modal */}
                {selectedStudent && (
                    <ReviewSubmissionModal
                        isOpen={true} // Always open when a student is selected
                        onRequestClose={closeReviewModal}
                        documentUrl={selectedStudent.documentUrl} // Assuming `file` is the URL or file path
                    />
                )}
            </div>
        </Modal>
    );
};

export default ViewSubmissionsModal;
