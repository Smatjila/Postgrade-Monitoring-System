import { db } from '../../firebase';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import SupervisorImage1 from '../../assets/images/SupImages/SupImage1.jpg';
//import SupervisorImage2 from '../../assets/images/SupImages/SupImage2.jpg';
//import SupervisorImage3 from '../../assets/images/SupImages/SupImage3.jpg';
//import SupervisorImage4 from '../../assets/images/SupImages/SupImage4.jpg';
//import SupervisorImage5 from '../../assets/images/SupImages/SupImage5.jpg';

const SupCourseContent = () => {
    // const courses = [
    //     {
    //         id: 1,
    //         name: 'Software Project Supervision',
    //         image: SupervisorImage1,
    //         description: 'Supervise the software project'
    //     },
    //     {
    //         id: 2,
    //         name: 'Thesis Writing Supervision',
    //         image: SupervisorImage2,
    //         description: 'Guide students in writing their thesis'
    //     },
    //     {
    //         id: 3,
    //         name: 'Project Management',
    //         image: SupervisorImage3,
    //         description: 'Manage project tasks and milestones'
    //     },
    //     {
    //         id: 4,
    //         name: 'Software Development',
    //         image: SupervisorImage4,
    //         description: 'Develop software modules'
    //     },
    //     {
    //         id: 5,
    //         name: 'Software Testing',
    //         image: SupervisorImage5,
    //         description: 'Test software for quality assurance'
    //     }
    // ];
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const supervisorId = 720000007; // Replace with the actual supervisor ID

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Fetch supervisor data
                const supervisorDocRef = collection(db, 'Supervisor');
                const supervisorSnapshot = await getDocs(query(supervisorDocRef, where('SupervisorID', '==', supervisorId)));
                if (!supervisorSnapshot.empty) {
                    const supervisorData = supervisorSnapshot.docs[0].data();
                    const courseIDs = supervisorData.CourseID;

                    // Fetch courses based on CourseIDs
                    const modulesCollection = collection(db, 'Module');
                    const modulesQuery = query(modulesCollection, where('ModuleID', 'in', courseIDs));
                    const moduleSnapshot = await getDocs(modulesQuery);
                    const moduleList = moduleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setCourses(moduleList);
                }
            } catch (error) {
                console.error("Error fetching courses: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [supervisorId]);

    // Placeholder images array
    //const placeholderImages = [SupervisorImage1, SupervisorImage2,SupervisorImage3, SupervisorImage4];

    if (loading) {
        return <div>Loading...</div>;
    }



    return (
        <div className="sup-course-container">
            <div className="sup-courses-card">
                <div className="sup-courses-card-header">
                    <h2>Supervisor Courses</h2>
                </div>
                <div className="sup-course-card-body">
                    <div className="sup-course-cards">
                        {courses.map(course => (
                            <Link to={`/supervisor_course/${course.id}`} key={course.id} className="sup-course-card">
                                <img src={SupervisorImage1} alt="Course" />
                                <h4>{course.ModuleTitle}</h4>
                                <p>{course.ModuleDescription}</p>
                                <Link to={`/supervisor/tasks/course/${course.id}`} className="sup-course-link">View Tasks</Link>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SupCourseContent;
