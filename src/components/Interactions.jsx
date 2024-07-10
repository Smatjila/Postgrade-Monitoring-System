import React, { useState } from "react";
import ChatModal from "./InteractionChatModal";
import socket from '../back-end/socket'; // Import the shared socket

const Interactions = () => {
    const [showModal, setShowModal] = useState(false);
    const [room, setRoom] = useState(""); // Set an example room name
    const [username, setUsername] = useState(""); // Set an example username

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="interactions-container">
            <div className="interactions-card">
                <div className="interactions-header">
                    <h2>Let's Connect</h2>
                </div>
                <div className="interactions-body">
                    <div className="interaction-lecturer-cards">
                        <div className="interaction-lecturer-card" onClick={openModal}>
                            <img src="https://via.placeholder.com/150" alt="lecturer" />
                            <h4>Dr. Jane Doe</h4>
                            <p>Software Engineering</p>
                            <p>Office Hours: 10:00 - 12:00</p>
                        </div>
                        <div className="interaction-lecturer-card">
                            <img src="https://via.placeholder.com/150" alt="lecturer" />
                            <h4>Dr. John Smith</h4>
                            <p>Computer Science</p>
                            <p>Office Hours: 14:00 - 16:00</p>
                        </div>
                        <div className="interaction-lecturer-card">
                            <img src="https://via.placeholder.com/150" alt="lecturer" />
                            <h4>Dr. Emily Clark</h4>
                            <p>Data Science</p>
                            <p>Office Hours: 09:00 - 11:00</p>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <ChatModal
                    isOpen={showModal}
                    onClose={closeModal}
                    socket={socket} // Pass the shared socket
                    username={username} // Pass the username
                    room={room} // Pass the room
                    lecturer="Dr. Jane Doe"
                />
            )}
        </div>
    );
};

export default Interactions;






// import React, { useState } from "react";
// import ChatModal from "./InteractionChatModal";
// import socket from '../back-end/socket'; // Import the shared socket

// const Interactions = () => {
//     const [showModal, setShowModal] = useState(false);
//     const [room, setRoom] = useState("");

//     const openModal = () => {
//         setShowModal(true);
//     };

//     const closeModal = () => {
//         setShowModal(false);
//     };

//     return (
//         <div className="interactions-container">
//             <div className="interactions-card">
//                 <div className="interactions-header">
//                     <h2>Let's Connect</h2>
//                 </div>
//                 <div className="interactions-body">
//                     <div className="interaction-lecturer-cards">
//                         <div className="interaction-lecturer-card" onClick={openModal}>
//                             <img src="https://via.placeholder.com/150" alt="lecturer" />
//                             <h4>Dr. Jane Doe</h4>
//                             <p>Software Engineering</p>
//                             <p>Office Hours: 10:00 - 12:00</p>
//                         </div>
//                         <div className="interaction-lecturer-card">
//                             <img src="https://via.placeholder.com/150" alt="lecturer" />
//                             <h4>Dr. John Smith</h4>
//                             <p>Computer Science</p>
//                             <p>Office Hours: 14:00 - 16:00</p>
//                         </div>
//                         <div className="interaction-lecturer-card">
//                             <img src="https://via.placeholder.com/150" alt="lecturer" />
//                             <h4>Dr. Emily Clark</h4>
//                             <p>Data Science</p>
//                             <p>Office Hours: 09:00 - 11:00</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {showModal && (
//                 <ChatModal
//                     isOpen={showModal}
//                     onClose={closeModal}
//                     socket={socket} // Pass the shared socket
//                     room={room}
//                     lecturer="Dr. Jane Doe"
//                 />
//             )}
//         </div>
//     );
// };

// export default Interactions;

// import React, { useState, useEffect } from "react";
// import ChatModal from "./InteractionChatModal";
// import { io } from 'socket.io-client'
// const socket = io("http://localhost:3001");

// const Interactions = () => {
//     const [showModal, setShowModal] = useState(false);
//     const [message, setMessage] = useState("");
//     const [messageReceived, setMessageReceived] = useState("");
//     const [room, setRoom] = useState("");
//     const [username, setUsername] = useState("");

//     const openModal = () => {
//         setShowModal(true);
//     };

//     const closeModal = () => {
//         setShowModal(false);
//     };

//     return (
//         <div className="interactions-container">
//             <div className="interactions-card">
//                 <div className="interactions-header">
//                     <h2>Let's Connect</h2>
//                 </div>
               
//                 <div className="interactions-body">
//                     <div className="interaction-lecturer-cards">
//                         <div className="interaction-lecturer-card" onClick={openModal}>
//                             <img src="https://via.placeholder.com/150" alt="lecturer" />
//                             <h4>Dr. Jane Doe</h4>
//                             <p>Software Engineering</p>
//                             <p>Office Hours: 10:00 - 12:00</p>
//                         </div>

//                         <div className="interaction-lecturer-card">
//                             <img src="https://via.placeholder.com/150" alt="lecturer" />
//                             <h4>Dr. John Smith</h4>
//                             <p>Computer Science</p>
//                             <p>Office Hours: 14:00 - 16:00</p>
//                         </div>

//                         <div className="interaction-lecturer-card">
//                             <img src="https://via.placeholder.com/150" alt="lecturer" />
//                             <h4>Dr. Emily Clark</h4>
//                             <p>Data Science</p>
//                             <p>Office Hours: 09:00 - 11:00</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {showModal && (
//                 <ChatModal
//                     isOpen={showModal}
//                     onClose={closeModal}
//                     socket={socket}
//                     // username={username}
//                     room={room}
//                     lecturer="Dr. Jane Doe"
                    
//                 />
//             )}
//         </div>
//     );
// };

// export default Interactions;
