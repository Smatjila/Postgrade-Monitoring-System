import React, { useState } from "react";
import SupChatModal from "./SupChatModal";
const SupInteractions = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // Sample data for interactions (you can replace this with fetched data from API)
    const data = [
        {
            id: 1,
            name: "Shaun Matjila",
            field: "Software Engineering",
            lastInteraction: "3 hours ago",
            image: "https://avatar.iran.liara.run/username?username=Shaun+Matjila",
        },
        {
            id: 2,
            name: "Jane Smith",
            field: "Computer Science",
            lastInteraction: "1 day ago",
            image: "https://avatar.iran.liara.run/username?username=Jane+Smith",
        },
        {
            id: 3,
            name: "Emily Brown",
            field: "Data Science",
            lastInteraction: "2 hours ago",
            image: "https://avatar.iran.liara.run/username?username=Emily+Brown",
        },
    ];

    return (
        <div className="interactions-container">
            <div className="interactions-card">
                <div className="interactions-header">
                    <h2>Students' Interactions</h2>
                </div>

                <div className="interactions-body">
                    <div className="interactions-cards">
                        {data.map((interaction) => (
                            <div
                                key={interaction.id}
                                className="interaction-lecturer-card"
                                onClick={openModal}
                            >
                                <img src={interaction.image} alt={interaction.name} />
                                <h4>{interaction.name}</h4>
                                <p>{interaction.field}</p>
                                <p>Interacted: {interaction.lastInteraction}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showModal && <SupChatModal isOpen={showModal} onClose={closeModal} />}
        </div>
    );
};

export default SupInteractions;
