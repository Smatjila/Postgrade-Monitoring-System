import React, { useState } from 'react';
import Modal from 'react-modal';
import LecturerDetails from './LecturerDetails'; // Assuming the file path is correct

const ChatModal = ({ isOpen, onClose }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="chat-modal"
      overlayClassName="chat-modal-overlay"
    >
      <div className="chat-modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div className="chat-modal-header" onMouseEnter={toggleDetails} onMouseLeave={toggleDetails}>
          <img src="https://via.placeholder.com/150" alt="lecturer" />
          <div>
            <h2>Dr. Jane Doe</h2>
            <p>Software Engineering</p>
          </div>
          {showDetails && <LecturerDetails lecturer="Dr. Jane Doe" />} {/* Pass lecturer details */}
        </div>

        <div className="chat-modal-body">
          <div className="chat-messages">
            <div className="chat-message lecturer">
              <div className="message-content">
                <p>Dr. Jane Doe: Hello! How can I help you today?</p>
              </div>
            </div>

            <div className="chat-message student">
              <div className="message-content">
                <p>You: I have a question about the assignment.</p>
              </div>
            </div>

            <div className="chat-message lecturer">
              <div className="message-content">
                <p>Dr. Jane Doe: Sure! What do you need help with?</p>
              </div>
            </div>

            <div className="chat-message student">
              <div className="message-content">
                <p>You: I'm not sure how to get started.</p>
              </div>
            </div>
            
          </div>
        </div>

        <div className="chat-input">
          <input type='text' placeholder='Type your message here...' />
          <button className='chat-send'>Send</button>
        </div>
      </div>
    </Modal>
  );
};

export default ChatModal;
