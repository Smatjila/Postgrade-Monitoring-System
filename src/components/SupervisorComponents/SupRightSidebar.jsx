import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Right from '../../assets/icons/Right-icon.png';
import NotificationsPopupModal from '../StudentComponents/NotificationModal';
import "../../../src/assets/styles.css";
import { useAuth } from "../../Backend/AuthContext";
import { getDocs, query, collection, where } from 'firebase/firestore'; // Import Firestore functions
import { db, auth } from '../../Backend/Config';

const SupervisorNotificationsSidebar = () => {
const {CurentUser}=useAuth();
const [SupervisorID,setSupervisorID]=useState(null);
const [showModal, setShowModal] = useState(false);
const [inputValue,setInputValue]=useState('')
const [moduleTitles,setModuleTitles]=useState([])
const[selectedOption,setSelectedOption]=useState('');
  const notifications = [
    { id: 1, supervisor: "Dr. Amanda Green", message: "Reminder: Please review and approve the software design proposal by the end of this week.", date: "2021-09-15", time: "10:00"},
    { id: 2, supervisor: "Prof. David White", message: "The meeting scheduled for next Monday has been postponed to Thursday.", date: "2021-09-15", time: "10:00"},
    { id: 3, supervisor: "Dr. Amanda Green", message: "Please review and provide feedback on the final project report draft by Friday.", date: "2021-09-15", time: "10:00"},
    { id: 4, supervisor: "Prof. David White", message: "The meeting scheduled for next Monday has been postponed to Thursday.", date: "2021-09-15", time: "10:00"},
    { id: 5, supervisor: "Dr. Amanda Green", message: "Please review and provide feedback on the final project report draft by Friday.", date: "2021-09-15", time: "10:00"}
  ];
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setSupervisorID(user.email.substring(0, 9));
        console.log(user.email.substring(0,9));
      } else {
        setSupervisorID(null);
      }
    });

    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    const fetchModules = async () => {   
      
      if (!SupervisorID) return;

      try {
        const q = query(collection(db, 'Module'), where('SupervisorID', '==', Math.floor(SupervisorID)));
        const querySnapshot = await getDocs(q);
        const modulesArray = [];
        querySnapshot.forEach((doc) => {
          modulesArray.push(doc.data().ModuleTitle);
        });
        setModuleTitles(modulesArray);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchModules();
    // console.log(SupervisorID+"this is the id afterr");
  }, [SupervisorID]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSendClick = () => {
    console.log('Input value:', inputValue);
    // Add your logic to handle the input value, e.g., send it to a server or add it to a list of notifications
    setInputValue(''); // Clear the input field after sending
  };

    const handlechoosen=(event)=>{
      setSelectedOption(event.target.value);
    }
    const moduleOptions=moduleTitles.map((title)=>(<option key={title} value={title}>  
    {title  }
    </option>));
  return (
    <div className="supervisor-notifications-sidebar">
      <div className="right-sidebar-header">
        <h2>Post Annoucment</h2>
        <div className="dashboard-card-view-more-arrow">
          <img
            src={Right}
            alt="View More"
            onClick={openModal}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
      <div className="right-sidebar-content">
        <div className="right-sidebar-notification-cards">
        <label>Choose Module</label>
        <select id="dropdown" value={selectedOption} onChange={handlechoosen}>
          <option value="">please choose a option</option>
          {moduleOptions}
        </select>
         <div className="input-card">
          <textarea
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder='Type your annocement'
          className="announcement-input"
          />
          <button onClick={handleSendClick} className="send-button">
            Send
          </button>
         </div>
        </div>
        {/* Modal for displaying all notifications */}
        <NotificationsPopupModal
          isOpen={showModal}
          notifications={notifications}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

export default SupervisorNotificationsSidebar;
