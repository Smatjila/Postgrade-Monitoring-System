import CourseSidebar from './CourseRightSidebar';
import Sidebar from "./Sidebar";

const CoursePageLayout = (props) => {
    return (
        <div className="course-page-layout">
            <Sidebar />
            {props.children}
            <CourseSidebar />
        </div>
    )
}

export default CoursePageLayout;