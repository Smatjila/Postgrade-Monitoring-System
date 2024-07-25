import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Right from '../../assets/icons/Right-icon.png';
import NotificationsPopupModal from '../StudentComponents/NotificationModal';
import "../../../src/assets/styles.css";
const SupervisorNotificationsSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputValue,setInputValue]=useState('')
  const[selectedOption,setSelectedOption]=useState('');


  const notifications = [
    { id: 1, supervisor: "Dr. Amanda Green", message: "Reminder: Please review and approve the software design proposal by the end of this week.", date: "2021-09-15", time: "10:00"},
    { id: 2, supervisor: "Prof. David White", message: "The meeting scheduled for next Monday has been postponed to Thursday.", date: "2021-09-15", time: "10:00"},
    { id: 3, supervisor: "Dr. Amanda Green", message: "Please review and provide feedback on the final project report draft by Friday.", date: "2021-09-15", time: "10:00"},
    { id: 4, supervisor: "Prof. David White", message: "The meeting scheduled for next Monday has been postponed to Thursday.", date: "2021-09-15", time: "10:00"},
    { id: 5, supervisor: "Dr. Amanda Green", message: "Please review and provide feedback on the final project report draft by Friday.", date: "2021-09-15", time: "10:00"}
  ];

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSendClick = () => {
    console.log('Input value:', inputValue);
    // Add your logic to handle the input value, e.g., send it to a server or add it to a list of notifications
    setInputValue(''); // Clear the input field after sending
  };

    const handlechoosen=(event)=>{
      setSelectedOption(event.target.value);
    }
  
  return (
    <div className="supervisor-notifications-sidebar">
      <div className="right-sidebar-header">
        <h2>Post Annoucment</h2>
        <div className="dashboard-card-view-more-arrow">
          <img
            src={Right}
            alt="View More"
            onClick={openModal}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
      <div className="right-sidebar-content">
        <div className="right-sidebar-notification-cards">
        <label>Choose Module</label>
        <select id="dropdown" value={selectedOption} onChange={handlechoosen}>
          <option value="">please choose a option</option>
        </select>
         <div className="input-card">
          <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder='Type your annocement'
          className="announcement-input"
          />
          <button onClick={handleSendClick} className="send-button">
            Send
          </button>
         </div>
        </div>
        {/* Modal for displaying all notifications */}
        <NotificationsPopupModal
          isOpen={showModal}
          notifications={notifications}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

export default SupervisorNotificationsSidebar;
