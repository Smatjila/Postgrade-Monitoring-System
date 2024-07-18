import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const Submission = ({ setPreviewUrl }) => {
    const [files, setFiles] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

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
        // Handle file submission logic here
        console.log('Files submitted:', files);
    };

    return (
        <div className="submission-container">
            {/* <h1>Submissions</h1> */}
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
            <div className="confirmation-container">
                <input
                    type="checkbox"
                    id="confirmation"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="confirmation">By checking, you confirm
                    that you have reviewed and agree to the submission guidelines 
                    and academic integrity policy.
                </label>
            </div>
            <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={!isChecked || files.length === 0}
            >
                Submit
            </button>
        </div>
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

export default Submission;
