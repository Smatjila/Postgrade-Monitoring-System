import { em } from '@mantine/core';
import React from 'react';

const LecturerDetails = ({ lecturer }) => {
  // Replace with actual lecturer details logic based on lecturer prop
  const lecturerDetails = {
    Image: 'https://via.placeholder.com/150',
    name: lecturer,
    department: 'Software Engineering',
    officeHours: '10:00 - 12:00',
    bio: 'Dr. Jane Doe is a lecturer in the Software Engineering department. She has a PhD in Computer Science and has been teaching for 10 years.',
    email: 'janedoe@email.com'
  };

  return (
    <div className="lecturer-details">
        <img src={lecturerDetails.Image} alt="" />
      <h3>{lecturerDetails.name}</h3>
      <p>{lecturerDetails.department}</p>
      <p>Office Hours: {lecturerDetails.officeHours}</p>
      <p>Email: {lecturerDetails.email}</p>
      <p>{lecturerDetails.bio}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default LecturerDetails;
