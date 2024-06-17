import React from 'react';
import SupSidebar from './SupSidebar';
import SupervisorNotificationsSidebar from './SupRightSidebar';

const SupervisorLayout = (props) => {
  return (
    <div className="supervisor-layout">
      <SupSidebar />
      {props.children}
      <SupervisorNotificationsSidebar />
    </div>
  );
};

export default SupervisorLayout;
