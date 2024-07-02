import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BannerImage from '../assets/images/BannerImg.jpg';
import SubmissionModal from './SubmissionModal'; // Import the SubmissionModal component
import ReviewSubmissionModal from './Review'; // Adjust path if necessary

const CoursePage = () => {
    // Sample course details
    const courseDetails = {
        name: "Software Engineering",
        instructor: "Dr. John Doe",
        description: "This course covers the principles of software engineering, including software development life cycle, requirements engineering, software design, and software testing."
        // Other course details
    };

    // Sample syllabus data
    const syllabus = [
        { topic: "Introduction to Software Engineering", subtopics: ["Software Development Life Cycle", "Agile Methodology", "Waterfall Model"] },
        { topic: "Software Requirements", subtopics: ["Requirements Elicitation", "Requirements Analysis", "Requirements Specification"] },
        { topic: "Software Design", subtopics: ["Design Principles", "Design Patterns", "UML Diagrams"] },
        // Other topics
    ];

    // Example state for submission available/disabled
    const [submissionAvailable, setSubmissionAvailable] = useState(true);

    // Modal state for submission
    const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
    // Modal state for review
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [documentUrl, setDocumentUrl] = useState('');

    const openSubmissionModal = () => {
        setIsSubmissionModalOpen(true);
    };

    const closeSubmissionModal = () => {
        setIsSubmissionModalOpen(false);
    };

    const openReviewModal = (url) => {
        setDocumentUrl(url);
        setIsReviewModalOpen(true);
    };

    const closeReviewModal = () => {
        setDocumentUrl('');
        setIsReviewModalOpen(false);
    };

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
                        {syllabus.map((topic, index) => (
                            <li key={index}>
                                <strong>{topic.topic}</strong>
                                <ul>
                                    {topic.subtopics.map((subtopic, subIndex) => (
                                        <li key={subIndex}>
                                            {subtopic}
                                        </li>
                                    ))}
                                    {submissionAvailable && (
                                        <button className="submit-btn" onClick={openSubmissionModal}>
                                            Submit Assignment
                                        </button>
                                    )}
                                    <button className="review-btn" onClick={() => openReviewModal('https://example.com/submitted_document.pdf')}>
                                        Review Submission
                                    </button>
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
