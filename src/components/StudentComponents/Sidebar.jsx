import { useState, useEffect } from 'react';
import Logo from '../../assets/images/UJ_Logo.png';
import Grid from '../../assets/icons/Grid-icon.png';
import Collaboration from '../../assets/icons/Collaboration-icon.png';
import Logout from '../../assets/icons/Logout-icon.png';
import Tasks from '../../assets/icons/Tasks-icon.png';
import Courses from '../../assets/icons/Course-icon.png';
import UserIcon from '../../assets/icons/User-icon.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../Backend/Config'; // Assuming you have configured db
import '../../App.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [userID, setUserID] = useState('');
  const [ProfilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        const studentID = user.email.substring(0, 9); // Assuming studentID is the first 9 digits of the email
        fetchUserData(studentID);
        setUserName(user.email); // Defaulting to email for display until data loads
      } else {
        // User is signed out.
        setUserName('');
        setUserSurname('');
        setUserID('');
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (studentID) => {
    try {
      const userRef = doc(db, 'Student', studentID); // Use `doc` function with `db`
      const docSnap = await getDoc(userRef); // Use `getDoc` function to retrieve document
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUserName(userData.StudentName);
        setUserSurname(userData.StudentSurname);
        setUserID(userData.StudentID);
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
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={Logo} alt='UJ Logo' />
      </div>
      <div className="sidebar-content">
        <ul>
          <li>
            <img src={Grid} alt='Grid Icon' className='icon'/>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Dashboard</Link>
          </li>
          <li>
            <img src={Courses} alt='Courses Icon' className='icon'/>
            <Link to="/courses" className={location.pathname === '/courses' ? 'active' : ''}>Courses</Link>
          </li>
          <li>
            <img src={Tasks} alt='Tasks Icon' className='icon'/>
            <Link to="/tasks" className={location.pathname === '/tasks' ? 'active' : ''}>Tasks</Link>
          </li>
          <li>
            <img src={Collaboration} alt='Collaboration Icon' className='icon'/>
            <Link to="/connect" className={location.pathname === '/connect' ? 'active' : ''}>Connect</Link>
          </li>
          <li>
            <img src={Logout} alt='Logout Icon' className='icon'/>
            <Link to="#" onClick={UserLogOut}>Log Out</Link>
          </li>
        </ul>
        <div className='sidebar-additional-card'>
          <h3>Student Details</h3>
          <div className='profile-container'>
            <img src={ProfilePicture} alt="Avatar" className='profile-avatar' />
            <div className='profile-details'>
              <h4>{userName} {userSurname}</h4> 
              <p>{userID}</p> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
