import React, { useState, useCallback } from 'react';
import Modal from 'react-modal';
import { useDropzone } from 'react-dropzone';

const CreateSubmissionModal = ({ isOpen, onRequestClose, onCreate }) => {
    const [submissionTitle, setSubmissionTitle] = useState('');
    const [submissionDescription, setSubmissionDescription] = useState('');
    const [dueDateTime, setDueDateTime] = useState('');
    const [files, setFiles] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');

    const onDrop = useCallback((acceptedFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        const fileUrl = URL.createObjectURL(acceptedFiles[0]);
        setPreviewUrl(fileUrl);
    }, [setPreviewUrl]);

    const handleFileUpload = (e) => {
        const uploadedFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
        const fileUrl = URL.createObjectURL(uploadedFiles[0]);
        setPreviewUrl(fileUrl);
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleSubmit = () => {
        const submissionDetails = {
            title: submissionTitle,
            description: submissionDescription,
            dueDateTime,
            files,
        };
        onCreate(submissionDetails);
        setSubmissionTitle('');
        setSubmissionDescription('');
        setDueDateTime('');
        setFiles([]);
        setIsChecked(false);
        setPreviewUrl('');
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="create-submission-modal"
            overlayClassName="create-submission-modal-overlay"
        >
            <div className="modal-content">
                <h2>Create Submission</h2>
                <input
                    type="text"
                    placeholder="Submission Title"
                    value={submissionTitle}
                    onChange={(e) => setSubmissionTitle(e.target.value)}
                />
                <textarea
                    placeholder="Submission Description"
                    value={submissionDescription}
                    onChange={(e) => setSubmissionDescription(e.target.value)}
                />
                <input
                    type="datetime-local"
                    value={dueDateTime}
                    onChange={(e) => setDueDateTime(e.target.value)}
                />
                <div className="dropzone-container">
                    <Dropzone onDrop={onDrop} />
                    <button className="upload-button" onClick={handleButtonClick}>
                        Select Files
                    </button>
                    <input
                        type="file"
                        id="fileInput"
                        multiple
                        onChange={handleFileUpload}
                        className="upload-input"
                        style={{ display: 'none' }}
                    />
                </div>
                {files.length > 0 && (
                    <div>
                        <h2>Uploaded Files:</h2>
                        <ul>
                            {files.map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <button
                    className="submit-button"
                    onClick={handleSubmit}
                    disabled={!isChecked || files.length === 0}
                >
                    Create
                </button>
                <button onClick={onRequestClose}>Cancel</button>
            </div>
        </Modal>
    );
};

const Dropzone = ({ onDrop }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here...</p>
            ) : (
                <p>Drag & drop some files here, or click to select files</p>
            )}
        </div>
    );
};

export default CreateSubmissionModal;
