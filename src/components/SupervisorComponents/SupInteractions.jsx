import React, { useState } from "react";
import SupChatModal from "./SupChatModal";
import socket from '../../back-end/socket'; // Import the shared socket

const SupInteractions = () => {
  const [showModal, setShowModal] = useState(false);
  const [room, setRoom] = useState(""); 
  const [lecturer, setLecturer] = useState("Dr. Jane Doe");
  const [student, setStudent] = useState("");

  const openModal = (interaction) => {
    setStudent(interaction.name);
    setRoom(`room_${interaction.id}`);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const data = [
    {
      id: 1,
      name: "Shaun Matjila",
      field: "Software Engineering",
      lastInteraction: "3 hours ago",
      image: "https://avatar.iran.liara.run/username?username=Shaun+Matjila",
    },
    {
      id: 2,
      name: "Jane Smith",
      field: "Computer Science",
      lastInteraction: "1 day ago",
      image: "https://avatar.iran.liara.run/username?username=Jane+Smith",
    },
    {
      id: 3,
      name: "Emily Brown",
      field: "Data Science",
      lastInteraction: "2 hours ago",
      image: "https://avatar.iran.liara.run/username?username=Emily+Brown",
    },
  ];

  return (
    <div className="interactions-container">
      <div className="interactions-card">
        <div className="interactions-header">
          <h2>Students' Interactions</h2>
        </div>
        <div className="interactions-body">
          <div className="interactions-cards">
            {data.map((interaction) => (
              <div
                key={interaction.id}
                className="interaction-lecturer-card"
                onClick={() => openModal(interaction)}
              >
                <img src={interaction.image} alt={interaction.name} />
                <h4>{interaction.name}</h4>
                <p>{interaction.field}</p>
                <p>Interacted: {interaction.lastInteraction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <SupChatModal 
          isOpen={showModal}
          onClose={closeModal} 
          room={room}
          lecturer={lecturer}
          student={student}
        />
      )}
    </div>
  );
};

export default SupInteractions;
