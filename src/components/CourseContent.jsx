import { Link } from 'react-router-dom';
import RegImage1 from '../assets/images/RegImage1.jpg';
import RegImage2 from '../assets/images/RegImage2.jpg';
import RegImage3 from '../assets/images/RegImage3.jpg';
import RegImage4 from '../assets/images/RegImage4.jpg';

const CourseContent = () => {
    const courses = [
        {
            id: 1,
            name: 'Software Requirements',
            image: RegImage1,
            description: 'Complete the requirements document'
        },
        {
            id: 2,
            name: 'Business Analysis',
            image: RegImage2,
            description: 'Complete the business analysis document'
        },
        {
            id: 3,
            name: 'Software Project',
            image: RegImage3,
            description: 'Complete the software project'
        },
        {
            id: 4,
            name: 'Software Project',
            image: RegImage4,
            description: 'Complete the software project'
        }
    ];

    return (
        <div className="course-container">
            <div className="courses-card">
                <div className="courses-card-header">
                    <h2>Your Courses</h2>
                </div>
                <div className="course-card-body">
                    <div className="course-cards">
                        {courses.map(course => (
                            <Link to={`/course/${course.id}`} key={course.id} className="course-card">
                                <img src={course.image} alt="Course" />
                                <h4>{course.name}</h4>
                                <p>{course.description}</p>
                                <Link to={`/tasks/course/${course.id}`} className="course-link">View Tasks</Link>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseContent;
