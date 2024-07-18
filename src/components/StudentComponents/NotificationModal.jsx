import React from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';

const NotificationsPopupModal = ({ isOpen, notifications, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="notifications-modal"
      overlayClassName="notifications-modal-overlay"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="notifications-modal-content"
      >
        <span className="close" onClick={onClose}>&times;</span>
        <h2>All Notifications</h2>
        <div className="notifications-list">
          {notifications.map(notification => (
            <div key={notification.id} className="notification-item">
              <div className="notification-item-header">
                <h4>{notification.supervisor}</h4>
                <span>{notification.date}</span>
              </div>
              <p>{notification.message}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </Modal>
  );
};

export default NotificationsPopupModal;
