import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import StudentDetails from './StudentDetails'; // Assuming the file path is correct
import socket from '../../back-end/socket'; // Import the shared socket

const SupChatModal = ({ isOpen, onClose, room, lecturer, student }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);

  useEffect(() => {
    if (isOpen && !hasJoinedRoom) {
      console.log(`Joining room: ${room}`);
      socket.emit('join_room', room);
      setHasJoinedRoom(true);

      const handleMessageReceive = (data) => {
        console.log('Message received:', data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };

      socket.on('receive_message', handleMessageReceive);

      return () => {
        socket.off('receive_message', handleMessageReceive);
        setHasJoinedRoom(false);
      };
    }
  }, [isOpen, room, hasJoinedRoom]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: lecturer,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      console.log('Sending message:', messageData);
      await socket.emit("send_message", messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setCurrentMessage("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          className="chat-modal"
          overlayClassName="chat-modal-overlay"
          ariaHideApp={false}
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
              {showDetails && <StudentDetails student="Shaun Matjila" />}
            </div>

            <div className="chat-modal-body">
              <div className="chat-messages">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`chat-message ${msg.author === lecturer ? "lecturer" : "student"}`}
                  >
                    <div className="message-content">
                      <p><strong>{msg.author}:</strong> {msg.message}</p>
                      <span>{msg.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message here..."
                value={currentMessage}
                onChange={(event) => setCurrentMessage(event.target.value)}
              />
              <button className="chat-send" onClick={sendMessage}>Send</button>
            </div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default SupChatModal;
