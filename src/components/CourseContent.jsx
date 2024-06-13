import { Link } from "react-router-dom";
import RegImage1 from '../assets/images/RegImage1.jpg';
import RegImage2 from '../assets/images/RegImage2.jpg';
import RegImage3 from '../assets/images/RegImage3.jpg';
import RegImage4 from '../assets/images/RegImage4.jpg';
// import RegImage5 from '../assets/images/RegImage5.jpg';
// import RegImage6 from '../assets/images/RegImage6.jpg';
const CourseContent = () => {
    const courses = [
        {
            name: 'Software Requirements',
            image: RegImage1,
            description: 'Complete the requirements document'
        },
        {
            name: 'Business Analysis',
            image: RegImage2,
            description: 'Complete the business analysis document'
        },
        {
            name: 'Software Project',
            image: RegImage3,
            description: 'Complete the software project'
        },
        {
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
                        <Link to='/course' className="course-card">
                            <img src={RegImage1} alt="Course" />
                            <h4>Software Requirements</h4>
                            <p>Complete the requirements document</p>
                            <Link to="/tasks" className="course-link">View Tasks</Link>
                        </Link>

                        <Link to='/course' className="course-card">
                            <img src={RegImage2} alt="Course" />
                            <h4>Business Analysis</h4>
                            <p>Complete the business analysis document</p>
                            <Link to="/tasks" className="course-link">View Tasks</Link>
                        </Link>

                        <Link to='/course' className="course-card">
                            <img src={RegImage3} alt="Course" />
                            <h4>Software Project</h4>
                            <p>Complete the software project</p>
                            <Link to="/tasks" className="course-link">View Tasks</Link>
                        </Link>

                        <Link to='/course' className="course-card">
                            <img src={RegImage4} alt="Course" />
                            <h4>Software Project</h4>
                            <p>Complete the software project</p>
                            <Link to="/tasks" className="course-link">View Tasks</Link>
                        </Link>


                        <Link to='/course' className="course-card">
                            <img src={RegImage1} alt="Course" />
                            <h4>Software Project</h4>
                            <p>Complete the software project</p>
                            <Link to="/tasks" className="course-link">View Tasks</Link>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseContent;