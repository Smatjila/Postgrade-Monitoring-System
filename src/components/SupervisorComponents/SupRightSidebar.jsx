import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Right from '../../assets/icons/Right-icon.png';
import NotificationsPopupModal from '../NotificationModal';

const SupervisorNotificationsSidebar = () => {
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="supervisor-notifications-sidebar">
      <div className="right-sidebar-header">
        <h2>Notifications</h2>
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
          {notifications.map(notification => (
            <div key={notification.id} className="right-sidebar-notification-card">
              <div className="right-sidebar-notification-card-details">
                <h4 className="right-sidebar-notification-card-details-lecturer">{notification.supervisor}</h4>
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

export default SupervisorNotificationsSidebar;
