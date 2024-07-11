import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from './Dashboard';
import Connect from './Connect';
import Courses from './Courses';
import CoursePage from './CoursePage';
import Submission from '../components/Submission';
import ProgressTasks from '../components/ProgressTasks'; // Import ProgressTasks

const PageRoutes = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/course/:courseId" element={<CoursePage />} />
                <Route path="/tasks" element={<ProgressTasks />} />
                <Route path="/tasks/course/:id" element={<ProgressTasks />} /> {/* Route for filtered tasks */}
                <Route path="/submission" element={<Submission />} />
                <Route path="/connect" element={<Connect />} />
            </Routes>
        </Layout>
    );
}

export default PageRoutes;
