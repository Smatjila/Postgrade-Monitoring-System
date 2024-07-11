import React from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-modal';

const NotificationModal = ({ isOpen, onRequestClose, onSend, notificationMessage, setNotificationMessage }) => {
    const handleSend = () => {
        onSend(notificationMessage);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="sup-modal"
            overlayClassName="sup-overlay"
        >
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="sup-modal-content"
            >
                <h2>Send Notification</h2>
                <textarea
                    value={notificationMessage}
                    onChange={(e) => setNotificationMessage(e.target.value)}
                    placeholder="Type your message here"
                    rows="5"
                    cols="50"
                />
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="sup-close-modal-btn"
                    onClick={handleSend}
                >
                    Send
                </motion.button>
                <button className="sup-close-modal-btn" onClick={onRequestClose}>Close</button>
            </motion.div>
        </Modal>
    );
};

export default NotificationModal;
