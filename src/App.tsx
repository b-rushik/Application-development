import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import AppLayout from './layouts/AppLayout';
import LandingPage from './pages/LandingPage';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFound from './pages/NotFound';

// Auth Pages
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const VerifyOTP = lazy(() => import('./pages/auth/VerifyOTP'));

// Role-based Dashboards
const PaperSetterDashboard = lazy(() => import('./pages/paperSetter/Dashboard'));
const PaperGetterDashboard = lazy(() => import('./pages/paperGetter/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const SuperUserDashboard = lazy(() => import('./pages/superUser/Dashboard'));

// Paper Setter Pages
const PersonalDetails = lazy(() => import('./pages/paperSetter/PersonalDetails'));
const History = lazy(() => import('./pages/paperSetter/History'));
const Updates = lazy(() => import('./pages/paperSetter/Updates'));
const QuestionPaper = lazy(() => import('./pages/paperSetter/QuestionPaper'));

// Paper Getter Pages
const RequestPaper = lazy(() => import('./pages/paperGetter/RequestPaper'));
const SelectFaculty = lazy(() => import('./pages/paperGetter/SelectFaculty'));
const PaperStatus = lazy(() => import('./pages/paperGetter/PaperStatus'));

// Admin Pages
const ManageUsers = lazy(() => import('./pages/admin/ManageUsers'));
const EvaluatePapers = lazy(() => import('./pages/admin/EvaluatePapers'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><LoadingSpinner size="large" /></div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />

            {/* Protected Routes with AppLayout */}
            <Route element={<AppLayout />}>
              {/* Paper Setter Routes */}
              <Route path="/paper-setter" element={<ProtectedRoute role="paperSetter"><PaperSetterDashboard /></ProtectedRoute>} />
              <Route path="/paper-setter/personal-details" element={<ProtectedRoute role="paperSetter"><PersonalDetails /></ProtectedRoute>} />
              <Route path="/paper-setter/history" element={<ProtectedRoute role="paperSetter"><History /></ProtectedRoute>} />
              <Route path="/paper-setter/updates" element={<ProtectedRoute role="paperSetter"><Updates /></ProtectedRoute>} />
              <Route path="/paper-setter/question-paper" element={<ProtectedRoute role="paperSetter"><QuestionPaper /></ProtectedRoute>} />

              {/* Paper Getter Routes */}
              <Route path="/paper-getter" element={<ProtectedRoute role="paperGetter"><PaperGetterDashboard /></ProtectedRoute>} />
              <Route path="/paper-getter/request-paper" element={<ProtectedRoute role="paperGetter"><RequestPaper /></ProtectedRoute>} />
              <Route path="/paper-getter/select-faculty" element={<ProtectedRoute role="paperGetter"><SelectFaculty /></ProtectedRoute>} />
              <Route path="/paper-getter/paper-status" element={<ProtectedRoute role="paperGetter"><PaperStatus /></ProtectedRoute>} />

              {/* Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/manage-users" element={<ProtectedRoute role="admin"><ManageUsers /></ProtectedRoute>} />
              <Route path="/admin/evaluate-papers" element={<ProtectedRoute role="admin"><EvaluatePapers /></ProtectedRoute>} />

              {/* Super User Routes */}
              <Route path="/super-user" element={<ProtectedRoute role="superUser"><SuperUserDashboard /></ProtectedRoute>} />
            </Route>

            {/* Not Found and redirects */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable />
    </AuthProvider>
  );
}

export default App;