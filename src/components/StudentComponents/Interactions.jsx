import React, { useState } from "react";
import ChatModal from "./InteractionChatModal";

const Interactions = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
  
    return (
        <div className="interactions-container">
            <div className="interactions-card">
                <div className="interactions-header">
                    <h2>Let's Connect</h2>
                </div>

                <div className="interactions-body">
                    <div className="interaction-lecturer-cards">
                        <div className="interaction-lecturer-card" onClick={openModal}>
                            <img src="https://via.placeholder.com/150" alt="lecturer" />
                            <h4>Dr. Jane Doe</h4>
                            <p>Software Engineering</p>
                            <p>Office Hours: 10:00 - 12:00</p>
                        </div>

                        <div className="interaction-lecturer-card">
                            <img src="https://via.placeholder.com/150" alt="lecturer" />
                            <h4>Dr. John Smith</h4>
                            <p>Computer Science</p>
                            <p>Office Hours: 14:00 - 16:00</p>
                        </div>

                        <div className="interaction-lecturer-card">
                            <img src="https://via.placeholder.com/150" alt="lecturer" />
                            <h4>Dr. Emily Clark</h4>
                            <p>Data Science</p>
                            <p>Office Hours: 09:00 - 11:00</p>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <ChatModal 
                    isOpen={showModal} 
                    onClose={closeModal} 
                />
            )}
        </div>
    );
};

export default Interactions;
