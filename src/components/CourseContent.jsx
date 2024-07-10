import { db} from '../firebase';
import { Link } from "react-router-dom";
//import React from "react";
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import RegImage1 from '../assets/images/RegImage1.jpg';
//import RegImage2 from '../assets/images/RegImage2.jpg';
//import RegImage3 from '../assets/images/RegImage3.jpg';
//import RegImage4 from '../assets/images/RegImage4.jpg';


// import RegImage5 from '../assets/images/RegImage5.jpg';
// import RegImage6 from '../assets/images/RegImage6.jpg';
const CourseContent = () => {
    const [modules, setModules] = useState([]);
    useEffect(() => {
        const fetchModules = async () => {
          const modulesCollection = collection(db, 'Module');
          const moduleSnapshot = await getDocs(modulesCollection);
          const moduleList = moduleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setModules(moduleList);
        };
    
        fetchModules();
      }, []);

    return (
        <div className="course-container">
            <div className="courses-card">
                <div className="courses-card-header">
                    <h2>Your Courses</h2>
                </div>

                <div className="course-card-body">
                {modules.map(module => (
                    <div  key={module.id} className="course-cards">
                        <Link to='/course' className="course-card">
                            <img src={RegImage1} alt= {module.ModuleTitle} />
                            <h4>{module.ModuleTitle}</h4>
                            <p>{module.ModuleDescription}</p>
                    
                            <Link to="/tasks" className="course-link">View Tasks</Link>
                        </Link>
                        
                         
                    </div>
                    ))}
                </div>
            
            </div>
        </div>
    )
}

export default CourseContent;