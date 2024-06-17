import { useState } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import StudentDetails from './StudentDetails'; // Assuming the file path is correct

const SupChatModal = ({ isOpen, onClose }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          className="chat-modal"
          overlayClassName="chat-modal-overlay"
          ariaHideApp={false} // Disable appElement warning
        >
          <motion.div
            className="chat-modal-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <div
              className="chat-modal-header"
              onMouseEnter={toggleDetails}
              onMouseLeave={toggleDetails}
            >
              <img
                src="https://avatar.iran.liara.run/username?username=Shaun+Matjila"
                alt="student"
              />
              <div>
                <h2>Shaun Matjila</h2>
                <p>Course: Software Engineering</p>
              </div>
              {showDetails && <StudentDetails student="Shaun Matjila" />}{' '}
              {/* Pass student details */}
            </div>

            <div className="chat-modal-body">
              <div className="chat-messages">
                {/* Student's messages first */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="chat-message student"
                >
                  <div className="message-content">
                    <p>You: I have a question about the assignment.</p>
                  </div>
                </motion.div>

                {/* Lecturer's response */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="chat-message lecturer"
                >
                  <div className="message-content">
                    <p>Dr. Jane Doe: Hello! How can I help you today?</p>
                  </div>
                </motion.div>

                {/* More student messages */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="chat-message student"
                >
                  <div className="message-content">
                    <p>You: I'm not sure how to get started.</p>
                  </div>
                </motion.div>

                {/* Another lecturer response */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="chat-message lecturer"
                >
                  <div className="message-content">
                    <p>Dr. Jane Doe: Sure! What do you need help with?</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="chat-input">
              <input type="text" placeholder="Type your message here..." />
              <button className="chat-send">Send</button>
            </div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default SupChatModal;
