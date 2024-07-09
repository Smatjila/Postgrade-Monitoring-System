// Keep sidebar and header in this file

import RightSidebar from "./RightSidebar";
import Sidebar from "./Sidebar";

const Layout = (props) => {
    return (
        <div className="layout">
            <Sidebar />
            {props.children}
            <RightSidebar />
        </div>
    )
}

export default Layout;