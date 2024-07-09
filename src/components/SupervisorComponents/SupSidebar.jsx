import { useState, useEffect } from 'react';
import Logo from '../../assets/images/UJ_Logo.png';
import Grid from '../../assets/icons/Grid-icon.png';
import Collaboration from '../../assets/icons/Collaboration-icon.png';
import Logout from '../../assets/icons/Logout-icon.png';
import Tasks from '../../assets/icons/Tasks-icon.png';
import Courses from '../../assets/icons/Course-icon.png';
import Submit from '../../assets/icons/Submit-icon.png';
import UserIcon from '../../assets/icons/User-icon.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../Backend/Config';
import { getDoc, doc } from 'firebase/firestore';
import './Styles.css'; 

const SupSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [userID, setUserID] = useState('');
  const [ProfilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const SupervisorID = user.email.substring(0, 9);
        fetchUserData(SupervisorID);
        setUserName(user.email); 
      } else {
        // User is signed out.
        setUserName('');
        setUserSurname('');
        setUserID('');
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (SupervisorID) => {
    try {
      const userRef = doc(db, 'Supervisor', SupervisorID); 
      const docSnap = await getDoc(userRef); 
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUserName(userData.SupervisorName);
        setUserSurname(userData.SupervisorSurname);
        setUserID(userData.SupervisorID);
        if(userData.ProfilePicture === ""){
          setProfilePicture(UserIcon)
        } else {
          setProfilePicture(userData.ProfilePicture)
        }
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  const UserLogOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <div className="sup-sidebar">
      <div className="sup-sidebar-header">
        <img src={Logo} alt='UJ Logo' />
      </div>
      <div className="sup-sidebar-content">
        <ul>
          <li>
            <img src={Grid} alt='Grid Icon' className='sup-icon'/>
            <Link to="/supervisor" className={location.pathname === '/supervisor' ? 'sup-active' : ''}>Dashboard</Link>
          </li>
          <li>
            <img src={Courses} alt='Courses Icon' className='sup-icon'/>
            <Link to="/supervisor_courses" className={location.pathname === '/supervisor_courses' ? 'sup-active' : ''}>Courses</Link>
          </li>
          <li>
            <img src={Submit} alt='Tasks Icon' className='sup-icon'/>
            <Link to="/supervisor_submissions" className={location.pathname === '/supervisor_submissions' ? 'sup-active' : ''}>Submissions</Link>
          </li>
          <li>
            <img src={Tasks} alt='Tasks Icon' className='sup-icon'/>
            <Link to="/supervisor_tasks" className={location.pathname === '/supervisor_tasks' ? 'sup-active' : ''}>Tasks</Link>
          </li>
          <li>
            <img src={Collaboration} alt='Collaboration Icon' className='sup-icon'/>
            <Link to="/supervisor_connect" className={location.pathname === '/supervisor_connect' ? 'sup-active' : ''}>Connect</Link>
          </li>
          <li>
            <img src={Logout} alt='Logout Icon' className='sup-icon'/>
            <Link to="#" className="sup-logout" onClick={UserLogOut}>Log Out</Link>
          </li>
        </ul>
        <div className='sup-sidebar-additional-card'>
          <h3>Supervisor Details</h3>
          <div className='sup-profile-container'>
            <img src={ProfilePicture} alt="Avatar" className='sup-profile-avatar' />
            <div className='sup-profile-details'>
              <h4>{userName} {userSurname}</h4>
              <p>{userID}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupSidebar;
