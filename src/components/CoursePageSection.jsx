import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BannerImage from '../assets/images/BannerImg.jpg';
import SubmissionModal from './SubmissionModal';
import ReviewSubmissionModal from './Review';

const CoursePage = () => {
    const { courseId } = useParams(); // Get the courseId from the URL
    const [courseDetails, setCourseDetails] = useState(null);
    const [submissionAvailable, setSubmissionAvailable] = useState(true);
    const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [documentUrl, setDocumentUrl] = useState('');

    useEffect(() => {
        // Fetch course details based on courseId
        const fetchCourseDetails = async () => {
            // Replace with actual fetch call
            const data = {
                id: courseId,
                name: 'Sample Course',
                instructor: 'Dr. John Doe',
                description: 'This course covers various aspects of software engineering...',
                syllabus: [
                    { topic: "Introduction to Software Engineering", subtopics: ["Software Development Life Cycle", "Agile Methodology", "Waterfall Model"] },
                    { topic: "Software Requirements", subtopics: ["Requirements Elicitation", "Requirements Analysis", "Requirements Specification"] },
                    { topic: "Software Design", subtopics: ["Design Principles", "Design Patterns", "UML Diagrams"] }
                ]
            };
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

    if (!courseDetails) return <div>Loading...</div>;

    return (
        <div className="course-page">
            <div className="course-page-card">
                <h1>{courseDetails.name}</h1>
                <div className="course-image-banner">
                    <img src={BannerImage} alt="Course" />
                </div>
                <div className="course-details">
                    <h3>Instructor: {courseDetails.instructor}</h3>
                    <p>{courseDetails.description}</p>
                </div>
                <div className="syllabus">
                    <h3>Semester Assignments</h3>
                    <ul>
                        {courseDetails.syllabus.map((topic, index) => (
                            <li key={index}>
                                <strong>{topic.topic}</strong>
                                <ul>
                                    {topic.subtopics.map((subtopic, subIndex) => (
                                        <li key={subIndex}>{subtopic}</li>
                                    ))}
                                    {submissionAvailable && (
                                        <button className="submit-btn" onClick={openSubmissionModal}>Submit Assignment</button>
                                    )}
                                    <button className="review-btn" onClick={() => openReviewModal('https://example.com/submitted_document.pdf')}>Review Submission</button>
                                    {!submissionAvailable && (
                                        <p>Submission closed</p>
                                    )}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <SubmissionModal
                isOpen={isSubmissionModalOpen}
                onRequestClose={closeSubmissionModal}
            />
            <ReviewSubmissionModal
                isOpen={isReviewModalOpen}
                onRequestClose={closeReviewModal}
                documentUrl={documentUrl}
            />
        </div>
    );
}

export default CoursePage;
