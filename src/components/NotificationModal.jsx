import React from 'react';
import Modal from 'react-modal';

const NotificationsPopupModal = ({ isOpen, notifications, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="notifications-modal"
      overlayClassName="notifications-modal-overlay"
    >
      <div className="notifications-modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>All Notifications</h2>
        <div className="notifications-list">
          {notifications.map(notification => (
            <div key={notification.id} className="notification-item">
              <div className="notification-item-header">
                <h4>{notification.lecturer}</h4>
                <span>{notification.date}</span>
              </div>
              <p>{notification.message}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default NotificationsPopupModal;
