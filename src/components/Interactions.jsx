import React, { useState, useEffect } from "react";
import ChatModal from "./InteractionChatModal";
import { io } from 'socket.io-client'
const socket = io("http://localhost:3001");

const Interactions = () => {
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const [room, setRoom] = useState("");
    const [username, setUsername] = useState("");

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
        }
    };
    const sendMessage = () => {
        socket.emit("send_message", { room, message });
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageReceived(data.message);
        });
    }, []);
    return (
        <div className="interactions-container">
            <div className="interactions-card">
                <div className="interactions-header">
                    <h2>Let's Connect</h2>
                </div>
                <input type="text" placeholder="John.." onChange={(event) => { setUsername(event.target.value) }} />
                <input
                    type="text"
                    placeholder="Room Number"
                    onChange={(event) => {
                        setRoom(event.target.value);
                    }}
                />
                    <button onClick={joinRoom}>Join room</button>
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
                    socket={socket}
                    username={username}
                    room={room}
                    lecturer="Dr. Jane Doe"
                />
            )}
        </div>
    );
};

export default Interactions;
