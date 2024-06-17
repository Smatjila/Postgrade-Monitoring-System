import SupSidebar from "./SupSidebar";
import SupCourseRightSidebar from "./SupCourseRightSidebar";


const SupCoursePageLayout = ({ children }) => {
    return (
        <div className="course-page-layout">
            <SupSidebar />
            {children}
            <SupCourseRightSidebar />
        </div>
    )
}

export default SupCoursePageLayout;