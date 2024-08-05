import React, { useState,useEffect } from "react";
import {useAuth} from "../../Backend/AuthContext"
import {getDocs,query,collection,where} from 'firebase/firestore';
import {db,auth} from '../../Backend/Config';

const StudentDetails = ({ student }) => {
    const {CurrentUser}=useAuth()
    const [SupervisorID,setSupervisorID]=useState(false);
    const [studentDetails,setStudentDetails]=useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            setSupervisorID(user.email.substring(0, 9));
            console.log(user.email.substring(0,9));
          } else {
            setSupervisorID(null);
          }
        });
    
        return () => unsubscribe();
      }, []);
      useEffect(() => {
        const fetchModules = async () => {
          if (!SupervisorID) return;
    
          try {
            const q = query(collection(db, 'Student'), where('SupervisorID', '==', Math.floor(SupervisorID)));
            const querySnapshot = await getDocs(q);
            const studentdetsArray = [];
            querySnapshot.forEach((doc) => {
            const data=doc.data();
            studentdetsArray.push({
            CourseID:data.CourseID,
            ProfilePicture:data.ProfilePicture,
            StudentID:data.StudentID,
            StudentName:data.StudentName,
            StudentSurname:data.StudentSurname
            });
            });
            setStudentDetails(studentdetsArray);
          } catch (error) {
            console.error("Error fetching modules:", error);
          }
        };
    
        fetchModules();
        // console.log(SupervisorID+"this is the id afterr");
      }, [SupervisorID]);
    return (
        <div className="lecturer-details">
            {studentDetails.length>0?(
                studentDetails.map((student,index)=>(
                    <div key={index}>
                        <img src={student.ProfilePicture} alt="Profile"/>
                        <h3>{student.StudentName}</h3>
                        <p>Course:{student.CourseID}</p>
                        <p>Student ID:{student.StudentID}</p>
                    </div>
                ))
            ):(<p>No students details available</p>)}
        </div>
    );
}

export default StudentDetails;