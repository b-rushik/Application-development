import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/common/PrivateRoute';
import PaperSetterDashboard from './pages/dashboards/PaperSetterDashboard';
import PaperGetterDashboard from './pages/dashboards/PaperGetterDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import SubjectExpertDashboard from './pages/dashboards/SubjectExpertDashboard';
import SuperUserDashboard from './pages/dashboards/SuperUserDashboard';
import NotFoundPage from './pages/NotFoundPage';
import AuthLayout from './components/layouts/AuthLayout';
import DashboardLayout from './components/layouts/DashboardLayout';
import { AuthProvider } from './contexts/AuthContext';
import AdminLoginPage from './pages/AdminLoginPage';
import SuperUserLoginPage from './pages/SuperUserLoginPage';

function App() {
  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          
          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/super-user-login" element={<SuperUserLoginPage />} />
          </Route>
          
          {/* Protected routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/paper-setter" element={
              <PrivateRoute allowedRoles={['paper_setter']}>
                <PaperSetterDashboard />
              </PrivateRoute>
            } />
            
            <Route path="/paper-getter" element={
              <PrivateRoute allowedRoles={['paper_getter']}>
                <PaperGetterDashboard />
              </PrivateRoute>
            } />
            
            <Route path="/admin" element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            } />
            
            <Route path="/subject-expert" element={
              <PrivateRoute allowedRoles={['subject_expert']}>
                <SubjectExpertDashboard />
              </PrivateRoute>
            } />
            
            <Route path="/super-user" element={
              <PrivateRoute allowedRoles={['super_user']}>
                <SuperUserDashboard />
              </PrivateRoute>
            } />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default App;