import React from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-modal';

const NotificationModal = ({ isOpen, onRequestClose, onSend, notificationMessage, setNotificationMessage }) => {
    const handleSend = () => {
        onSend(notificationMessage);
    };

    return (
      <>
      </>
    );
};

export default NotificationModal;
