// RightSidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Right from '../assets/icons/Right-icon.png';
import NotificationsPopupModal from './NotificationModal';
const RightSidebar = () => {
  const [showModal, setShowModal] = useState(false);

  const notifications = [
    { id: 1, lecturer: "Prof Shaun Blue", message: "Please note that the Software Project deadline has been extended to the 30th of November 2024." },
    { id: 2, lecturer: "Dr. June Stop", message: "The last day to submit your research paper is the 15th of December 2024." },
    { id: 3, lecturer: "Prof Shaun Blue", message: "Please note that the Software Project deadline has been extended to the 30th of November 2024." }
  ];

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="right-sidebar">
      <div className="right-sidebar-header">
        <h2>Notifications</h2>
        <div className="dashboard-card-view-more-arrow">
          {/* Use an icon or image that triggers the modal */}
          <img
            src={Right}
            alt="View More"
            onClick={openModal}
            style={{ cursor: 'pointer',
             }}
          />
        </div>
      </div>

      <div className="right-sidebar-content">
        <div className="right-sidebar-notification-cards">
          {notifications.map(notification => (
            <div key={notification.id} className="right-sidebar-notification-card">
              <div className="right-sidebar-notification-card-details">
                <h4 className="right-sidebar-notification-card-details-lecturer">{notification.lecturer}</h4>
                <p className="right-sidebar-notification-card-details-message">{notification.message}</p>
              </div>
            </div>
          ))}
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

export default RightSidebar;
