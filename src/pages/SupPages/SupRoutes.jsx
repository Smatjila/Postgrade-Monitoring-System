import { Routes, Route } from 'react-router-dom';
import SupervisorLayout from '../../components/SupervisorComponents/SupLayout';
import SupDashboard from './SupDashboard';
import SupCoursesPage from './SupCoursePage';
import SupCourses from './SupCourses';
import SupInteractions from '../../components/SupervisorComponents/SupInteractions';
import Submissions from '../../components/SupervisorComponents/SupSubmissions';
import SupTasks from '../../components/SupervisorComponents/SupTasks';
const SupRoutes = () => {
    return (
        <SupervisorLayout>
            <Routes>
                <Route path="/supervisor" element={<SupDashboard />} />
                {/* /supervisor/courses */}
                <Route path="/supervisor_courses" element={<SupCourses />} />
                {/* /supervisor/course/:courseId */}
                <Route path="/supervisor_course/:courseId" element={<SupCoursesPage />} />
                {/* /supervisor/connect */}
                <Route path="/supervisor_connect" element={<SupInteractions />} />
                {/* /supervisor/submissions */}
                <Route path="/supervisor_submissions" element={<Submissions />} />
                {/* /supervisor/tasks */}
                <Route path="/supervisor_tasks" element={<SupTasks />} />
            </Routes>
        </SupervisorLayout>
    );
}

export default SupRoutes;