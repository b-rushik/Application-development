import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import AdminLoginPage from './pages/auth/AdminLoginPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/legal/PrivacyPolicyPage';
import TermsOfServicePage from './pages/legal/TermsOfServicePage';
import PaperSetterDashboard from './pages/dashboards/PaperSetterDashboard';
import PaperGetterDashboard from './pages/dashboards/PaperGetterDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import SubjectExpertDashboard from './pages/dashboards/SubjectExpertDashboard';
import SuperUserDashboard from './pages/dashboards/SuperUserDashboard';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminAccessPage from './pages/auth/AdminAccessPage';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />
      <Route path="/admin-access" element={<AdminAccessPage />} />
      
      {/* Protected routes */}
      <Route 
        path="/paper-setter/*" 
        element={
          <ProtectedRoute requiredRole="paper-setter">
            <PaperSetterDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/paper-getter/*" 
        element={
          <ProtectedRoute requiredRole="paper-getter">
            <PaperGetterDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/subject-expert/*" 
        element={
          <ProtectedRoute requiredRole="subject-expert">
            <SubjectExpertDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/super-user/*" 
        element={
          <ProtectedRoute requiredRole="super-user">
            <SuperUserDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* 404 route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;