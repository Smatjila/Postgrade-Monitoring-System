import React from 'react';
import Modal from 'react-modal';
import Submission from './Submission'; // Adjust the path based on the actual location of Submission component

const SubmissionModal = ({ isOpen, onRequestClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal"
            overlayClassName="overlay"
        >
            <div className="modal-content">
                <h2>Submit Assignment</h2>
                <Submission />
                <button className="close-modal-btn" onClick={onRequestClose}>Close</button>
            </div>
        </Modal>
    );
};

export default SubmissionModal;
