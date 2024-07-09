import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BannerImg from '../../assets/images/SupImages/BannerImg.jpg';
import CreateSubmissionModal from './SupCreateSubmission';
import ReviewSubmissionModal from '../StudentComponents/Review';
import NotificationModal from '../../components/SupervisorComponents/NotificationModal';
import ViewSubmissionsModal from './ViewSubmissions';

const SupCoursePageSection = () => {
    const { courseId } = useParams(); // Get the courseId from the URL
    const [courseDetails, setCourseDetails] = useState(null);
    const [submissionAvailable, setSubmissionAvailable] = useState(true);
    const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [documentUrl, setDocumentUrl] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        // Fetch course details based on courseId
        const fetchCourseDetails = async () => {
            // Replace with actual fetch call
            const data = {
                id: courseId,
                name: 'Software Engineering',
                instructor: 'Dr. John Doe',
                description: 'This course covers various aspects of software engineering...',
                syllabus: [
                    { topic: "Introduction to Software Engineering", subtopics: ["Software Development Life Cycle", "Agile Methodology", "Waterfall Model"] },
                    { topic: "Software Requirements", subtopics: ["Requirements Elicitation", "Requirements Analysis", "Requirements Specification"] },
                    { topic: "Software Design", subtopics: ["Design Principles", "Design Patterns", "UML Diagrams"] }
                ]
            };

            if (courseId === '1') {
                data.name = 'Software Project Supervision';
                data.instructor = 'Dr. Jane Doe';
                data.description = 'Supervise the software project';
                data.syllabus = [
                    { topic: "Project Planning", subtopics: ["Project Scope", "Project Schedule", "Project Budget"] },
                    { topic: "Project Execution", subtopics: ["Task Allocation", "Resource Management", "Risk Management"] },
                    { topic: "Project Monitoring", subtopics: ["Progress Tracking", "Issue Resolution", "Change Management"] }
                ];
            }

            if (courseId === '2') {
                data.name = 'Thesis Writing Supervision';
                data.instructor = 'Dr. Alice Smith';
                data.description = 'Guide students in writing their thesis';
                data.syllabus = [
                    { topic: "Thesis Proposal", subtopics: ["Research Topic", "Literature Review", "Methodology"] },
                    { topic: "Thesis Writing", subtopics: ["Introduction", "Body", "Conclusion"] },
                    { topic: "Thesis Defense", subtopics: ["Presentation", "Question-Answer", "Evaluation"] }
                ];
            }

            setCourseDetails(data);
        };
        fetchCourseDetails();
    }, [courseId]);

    const openSubmissionModal = () => setIsSubmissionModalOpen(true);
    const closeSubmissionModal = () => setIsSubmissionModalOpen(false);
    const openReviewModal = (url) => {
        setDocumentUrl(url);
        setIsReviewModalOpen(true);
    };
    const closeReviewModal = () => {
        setDocumentUrl('');
        setIsReviewModalOpen(false);
    };
    const openNotificationModal = () => setIsNotificationModalOpen(true);
    const closeNotificationModal = () => setIsNotificationModalOpen(false);

    const handleCreateSubmission = () => {
        // Logic to create a new submission
        console.log("Create Submission");
    };

    const handleOpenSubmission = () => {
        // Logic to open submissions for students
        setSubmissionAvailable(true);
    };

    const handleCloseSubmission = () => {
        // Logic to close submissions for students
        setSubmissionAvailable(false);
    };

    const handleSendNotification = (message) => {
        // Logic to send notification
        console.log("Notification sent:", message);
        setNotificationMessage('');
        closeNotificationModal();
    };

    if (!courseDetails) return <div>Loading...</div>;

    return (
        <div className="sup-course-page">
            <div className="sup-course-page-card">
                <h1>{courseDetails.name}</h1>
                <div className="sup-course-image-banner">
                    <img src={BannerImg} alt="Course" />
                </div>
                <div className="sup-course-details">
                    <h3>Instructor: {courseDetails.instructor}</h3>
                    <p>{courseDetails.description}</p>
                </div>
                <div className="sup-syllabus">
                    <h3>Semester Assignments</h3>
                    <ul>
                        {courseDetails.syllabus.map((topic, index) => (
                            <li key={index}>
                                <strong>{topic.topic}</strong>
                                <ul>
                                    {topic.subtopics.map((subtopic, subIndex) => (
                                        <li key={subIndex}>{subtopic}</li>
                                    ))}
                                    {!submissionAvailable && (
                                        <button className="sup-privilege-btn" onClick={handleOpenSubmission}>Reopen Submission</button>
                                    )}
                                    {submissionAvailable && (
                                        <button className="sup-submit-btn" onClick={openSubmissionModal}>Create Submission</button>
                                    )}
                                    <button className="sup-review-btn" onClick={() => openReviewModal('https://example.com/submitted_document.pdf')}>View Submissions</button>
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="sup-privileges">
                    <h3>Supervisor Privileges</h3>
                    {/* <button className="sup-privilege-btn" onClick={handleCreateSubmission}>Create Submission</button> */}
                    <button className="sup-privilege-btn" onClick={handleCloseSubmission}>Close Submission</button>
                    <button className="sup-privilege-btn" onClick={openNotificationModal}>Send Notification</button>
                </div>
            </div>
            <CreateSubmissionModal
                isOpen={isSubmissionModalOpen}
                onRequestClose={closeSubmissionModal}
            />
            <ViewSubmissionsModal
                isOpen={isReviewModalOpen}
                onRequestClose={closeReviewModal}
                studentSubmissions={[{ studentId: '12345', submitted: true }, { studentId: '67890', submitted: false }]}
            />
            <NotificationModal
                isOpen={isNotificationModalOpen}
                onRequestClose={closeNotificationModal}
                onSend={handleSendNotification}
                notificationMessage={notificationMessage}
                setNotificationMessage={setNotificationMessage}
            />
        </div>
    );
}

export default SupCoursePageSection;
