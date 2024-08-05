import React, { useState, useEffect } from "react";
import { useAuth } from "../../Backend/AuthContext";
import { getDocs, query, collection, where } from 'firebase/firestore';
import { db, auth } from '../../Backend/Config';
import SupChatModal from "./SupChatModal";
import StudentDetails from "./StudentDetails";

const SupInteractions = () => {
    const { CurrentUser } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentDetails, setStudentDetails] = useState([]);
    const [supervisorDetails, setSupervisorDetails] = useState([]);
    const [SupervisorID, setSupervisorID] = useState(null);
    const [filterCourseID, setFilterCourseID] = useState(null);
    const [courseOptions, setCourseOptions] = useState([]);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userId = user.email.substring(0, 9);
                setSupervisorID(userId);
                
                // Fetch user role
                const userDoc = await getDocs(query(collection(db, 'Supervisor'), where('SupervisorID', '==', userId)));
                if (!userDoc.empty) {
                    setRole('Supervisor');
                } else {
                    const studentDoc = await getDocs(query(collection(db, 'Student'), where('StudentID', '==', userId)));
                    if (!studentDoc.empty) {
                        setRole('Student');
                    }
                }
            } else {
                setSupervisorID(null);
                setRole(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchModules = async () => {
            if (!SupervisorID || !role) return;

            try {
                let q;
                if (role === 'Supervisor') {
                    q = collection(db, 'Student');
                    if (filterCourseID) {
                        q = query(q, where('SupervisorID', 'array-contains', SupervisorID), where('CourseID', '==', filterCourseID));
                    } else {
                        q = query(q, where('SupervisorID', 'array-contains', SupervisorID));
                    }
                } else if (role === 'Student') {
                    q = collection(db, 'Supervisor');
                    q = query(q, where('StudentID', '==', SupervisorID));
                }

                const querySnapshot = await getDocs(q);
                const studentdetsArray = [];
                const supervisorsArray = [];
                const courseIdArray = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (role === 'Supervisor') {
                        courseIdArray.push(data.CourseID);
                        studentdetsArray.push({
                            ProfilePicture: data.ProfilePicture,
                            StudentID: data.StudentID,
                            StudentName: data.StudentName,
                            StudentSurname: data.StudentSurname,
                            lastInteraction: "Just now" // Replace with actual data if available
                        });
                    } else if (role === 'Student') {
                        supervisorsArray.push({
                            ProfilePicture: data.ProfilePicture,
                            SupervisorID: data.SupervisorID,
                            SupervisorName: data.SupervisorName,
                            SupervisorSurname: data.SupervisorSurname,
                        });
                    }
                });
                setStudentDetails(studentdetsArray);
                setSupervisorDetails(supervisorsArray);
                setCourseOptions(courseIdArray);
            } catch (error) {
                console.error("Error fetching details:", error);
            }
        };

        fetchModules();
    }, [SupervisorID, role, filterCourseID]);

    const openModal = (person) => {
        setSelectedStudent(person);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedStudent(null);
        setShowModal(false);
    };

    const handleFilterByCourseID = (CourseID) => {
        setFilterCourseID(CourseID);
    }

    return (
        <div className="interactions-container">
            <div className="interactions-card">
                <div className="interactions-header">
                    <h2>{role === 'Supervisor' ? "Students' Interactions" : "Supervisors' Interactions"}</h2>
                </div>
                <div className="interactions-body">
                    {role === 'Supervisor' && (
                        <div className="course-filter">
                            <label>Filter by Course ID:</label>
                            <select onChange={(e) => handleFilterByCourseID(e.target.value)}>
                                <option value="">All courses</option>
                                {courseOptions.map((course, index) => (
                                    <option key={index} value={course}>{course}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className="interactions-cards">
                        {role === 'Supervisor' ? (
                            studentDetails.length > 0 ? (
                                studentDetails.map((student, index) => (
                                    <div
                                        key={index}
                                        className="interaction-lecturer-card"
                                        onClick={() => openModal(student)}
                                    >
                                        <img src={student.ProfilePicture} alt={student.StudentName} />
                                        <h4>{student.StudentName} {student.StudentSurname}</h4>
                                        <p>Stu No.{student.StudentID}</p>
                                        <p>Course Id:
                                            {student.CourseID && student.CourseID.map((id, idx) => (
                                                <span key={idx}>{id}{idx < student.CourseID.length - 1 ? ',' : ''}</span>
                                            ))}</p>
                                        <p>Interacted: {student.lastInteraction}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No student interactions available</p>
                            )
                        ) : (
                            supervisorDetails.length > 0 ? (
                                supervisorDetails.map((supervisor, index) => (
                                    <div
                                        key={index}
                                        className="interaction-lecturer-card"
                                        onClick={() => openModal(supervisor)}
                                    >
                                        <img src={supervisor.ProfilePicture} alt={supervisor.SupervisorName} />
                                        <h4>{supervisor.SupervisorName} {supervisor.SupervisorSurname}</h4>
                                        <p>Supervisor No.{supervisor.SupervisorID}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No supervisor interactions available</p>
                            )
                        )}
                    </div>
                </div>
            </div>
            {showModal && (
                <SupChatModal isOpen={showModal} onClose={closeModal}>
                    {selectedStudent && <StudentDetails student={selectedStudent} />}
                </SupChatModal>
            )}
        </div>
    );
};

export default SupInteractions;
