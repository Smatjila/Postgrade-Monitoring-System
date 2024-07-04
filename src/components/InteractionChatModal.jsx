import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Chat from './Chat'
import LecturerDetails from './LecturerDetails'; // Assuming the file path is correct
import { io } from 'socket.io-client';
const socket = io("http://localhost:3001");
const ChatModal = ( {isOpen, onClose,socket,username,room,lecturer}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     setMessageReceived(data.message);
  //   });
  // }, []);
  const [currentMessage,setCurrentMessage]=useState("");
  const sendMessage= async()=>{
      if(currentMessage!==""){
          const messageData={
              room:room,
              author:username,
              message:currentMessage,
              time:
              new Date(Date.now()).getHours()+
              ":"+
              new Date(Date.now()).getMintues(),
          };
          await socket.emit("send_message",messageData);
      }
  }
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
                {/* <p>{messageReceived}</p> */}
              </div>
            </div>
          </div>
        </div>

        <div className="chat-input">
          <inp ut placeholder='Message...'
            onChange={(event)=>{
              setCurrentMessage(event.target.value);
          }}/>
          <button onClick={sendMessage}>Send Message</button>
        </div>
      </div>
   
    </Modal>

  );
};

export default ChatModal;
