// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../Backend/AuthContext";
// import { getDocs, query, collection, where } from 'firebase/firestore';
// import { db, auth } from '../../Backend/Config';
// import SupChatModal from "./SupChatModal";
// import StudentDetails from "./StudentDetails";

// const SupInteractions = () => {
//     const { CurrentUser } = useAuth();
//     const [showModal, setShowModal] = useState(false);
//     const [selectedStudent, setSelectedStudent] = useState(null);
//     const [studentDetails, setStudentDetails] = useState([]);
//     const [SupervisorID, setSupervisorID] = useState(null);
//     const [filterCourseID, setFilterCourseID] = useState(null);
//     const [courseOptions, setCourseOptions] = useState([]);

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged((user) => {
//             if (user) {
//                 setSupervisorID(user.email.substring(0, 9));
//             } else {
//                 setSupervisorID(null);
//             }
//         });

//         return () => unsubscribe();
//     }, []);

//     useEffect(() => {
//         const fetchModules = async () => {
//             if (!SupervisorID) return;

//             try {
//                 let q = collection(db, 'Student');
//                 if (filterCourseID) {
//                     q = query(q, where('SupervisorID', 'array-contains', SupervisorID), where('CourseID', '==', filterCourseID));
//                 } else {
//                     q = query(q, where('SupervisorID', 'array-contains', SupervisorID));
//                 }

//                 const querySnapshot = await getDocs(q);
//                 const studentdetsArray = [];
//                 const courseIdaArray = new Set();

//                 querySnapshot.forEach((doc) => {
//                     const data = doc.data();
//                     courseIdaArray.add(data.CourseID);
//                     studentdetsArray.push({
//                         ProfilePicture: data.ProfilePicture,
//                         StudentID: data.StudentID,
//                         StudentName: data.StudentName,
//                         StudentSurname: data.StudentSurname,
//                         lastInteraction: "Just now" // Placeholder, replace with actual data if available
//                     });
//                 });

//                 setStudentDetails(studentdetsArray);
//                 setCourseOptions(Array.from(courseIdaArray));

//             } catch (error) {
//                 console.error("Error fetching student details:", error);
//             }
//         };

//         fetchModules();
//     }, [SupervisorID, filterCourseID]);

//     const openModal = (student) => {
//         setSelectedStudent(student);
//         setShowModal(true);
//     };

//     const closeModal = () => {
//         setSelectedStudent(null);
//         setShowModal(false);
//     };

//     const handleFilterByCourseID = (event) => {
//         setFilterCourseID(event.target.value);
//     };

//     return (
//         <div className="interactions-container">
//             <div className="interactions-card">
//                 <div className="interactions-header">
//                     <h2>Students' Interactions</h2>
//                 </div>
//                 <div className="interactions-body">
//                     <div className="course-filter">
//                         <label>Filter by Course ID:</label>
//                         <select onChange={handleFilterByCourseID}>
//                             <option value="">All courses</option>
//                             {courseOptions.map((course, index) => (
//                                 <option key={index} value={course}>{course}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="interactions-cards">
//                         {studentDetails.length > 0 ? (
//                             studentDetails.map((student, index) => (
//                                 <div
//                                     key={index}
//                                     className="interaction-lecturer-card"
//                                     onClick={() => openModal(student)}
//                                 >
//                                     <img src={student.ProfilePicture} alt={student.StudentName} />
//                                     <h4>{student.StudentName} {student.StudentSurname}</h4>
//                                     <p>Stu No.{student.StudentID}</p>
//                                     <p>Course Id:
//                                         {student.CourseID && student.CourseID.map((id, idx) => (
//                                             <span key={idx}>{id}{idx < student.CourseID.length - 1 ? ',' : ''}</span>
//                                         ))}
//                                     </p>
//                                     <p>Interacted: {student.lastInteraction}</p>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No student interactions available</p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             {showModal && (
//                 <SupChatModal isOpen={showModal} onClose={closeModal}>
//                     {selectedStudent && <StudentDetails student={selectedStudent} />}
//                 </SupChatModal>
//             )}
//         </div>
//     );
// };

// export default SupInteractions;
