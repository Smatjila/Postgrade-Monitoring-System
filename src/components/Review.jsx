import React from 'react';
import Modal from 'react-modal';

const ReviewSubmissionModal = ({ isOpen, onRequestClose, documentUrl }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal"
            overlayClassName="overlay"
        >
            <div className="modal-content">
                <h2>Review Submission</h2>
                {documentUrl ? (
                    <iframe src={`https://docs.google.com/viewer?url=${documentUrl}&embedded=true`} title="Preview" className="preview-iframe" />
                ) : (
                    <p>No document available for preview</p>
                )}
                <button className="close-modal-btn" onClick={onRequestClose}>Close</button>
            </div>
        </Modal>
    );
};

export default ReviewSubmissionModal;
