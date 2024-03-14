import AuthContainer from '@/components/AuthContainer'
import Home from '@/pages/Home'
import { Route, Routes, Navigate } from 'react-router-dom'
import StudentAuth from '@/pages/StudentAuth'

import DashboardLayout from '@/components/layouts/dashboardLayout';
import { dashboardConfig } from '@/config/studentDashboard'
import ProtectedRoute from '@/components/ProtectedRoute'
import Student_unit_notes from '@/pages/academics/student_unit_notes';

function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route path="/auth" element={<AuthContainer />}>
                <Route
                    path="student"
                    element={<StudentAuth />}
                />
            </Route>
            <Route
                path="/student/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route
                    path=""
                    element={<Navigate to="/student/dashboard/profile" />}
                />
                <Route
                    path="/student/dashboard/student_unit_notes"
                    element={<Student_unit_notes />}
                />
                {dashboardConfig.sideBarNav.map((item, index) => {
                    return (
                        <Route
                            key={index}
                            path={item.href}
                            element={<div>{item.component}</div>}
                        />
                        
                    )
                })}
                {/* <Route   
                path="student_unit_notes"
                element={<Student_unit_notes />}
                /> */}
            </Route>
        </Routes>
    )
}

export default AppRoutes
