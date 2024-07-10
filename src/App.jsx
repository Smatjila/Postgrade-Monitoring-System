import React from 'react';

// import Sidebar from './components/Sidebar';
// import RightSidebar from './components/RightSidebar';
// import DashboardContent from './components/DashboardContent';
// import Dashboard from './pages/Dashboard';
import PageRoutes from './pages/Routes';
import SupSidebar from './components/SupervisorComponents/SupSidebar';
import SupervisorNotificationsSidebar from './components/SupervisorComponents/SupRightSidebar';
import SupRoutes from './pages/SupPages/SupRoutes';


function App() {

  return (
    <>
      <SupSidebar />
      <SupervisorNotificationsSidebar /> 
       <SupRoutes />
      <PageRoutes />
      
    </>
  )
}

export default App
