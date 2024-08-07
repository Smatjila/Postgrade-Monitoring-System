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
        setHasJoinedRoom(false); // Reset the state when the modal is closed or the component is unmounted
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
          ariaHideApp={false} // Disable appElement warning
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
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.author === lecturer ? "user" : "lecturer"}`}>
                <div className="message-content">
                  <p><strong><img src="https://via.placeholder.com/150" alt="lecturer" /></strong> {msg.message}</p>
                  <span>{msg.author}:{msg.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-input">
          <input
            placeholder="Message..."
            value={currentMessage}
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
          />
          <button onClick={sendMessage}>Send Message</button>
        </div>
      </div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default SupChatModal;
