const StudentDetails = ({ student }) => {
    const studentInfo = {
        name: student,
        course: 'Software Engineering',
        email: 'shaunmatjila@email.com',
        studentNumber: '123456789',
        image: 'https://avatar.iran.liara.run/username?username=Shaun+Matjila'
    }
    return (
        <div className="lecturer-details">
            <img src={studentInfo.image} alt="" />
            <h3>{studentInfo.name}</h3>
            <p>{studentInfo.course}</p>
            <p>Email: {studentInfo.email}</p>
            <p>Student Number: {studentInfo.studentNumber}</p>
        </div>
    );
}

export default StudentDetails;