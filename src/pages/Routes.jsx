import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Connect from './Connect';
import Tasks from './Tasks';
import Courses from './Courses';
import CoursePage from './CoursePage';
import Submission from '../components/Submission';

const PageRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course" element={<CoursePage />} />
            <Route path="/submission" element={<Submission />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path='/connect' element={<Connect />} />
        </Routes>
    );
}

export default PageRoutes;