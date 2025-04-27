import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import Logo from '../common/Logo';

const AuthLayout = () => {
  const { isAuthenticated, user } = useAuth();
  
  // If the user is authenticated, redirect to the appropriate dashboard
  if (isAuthenticated && user) {
    const dashboardPath = getDashboardPathForRole(user.role);
    return <Navigate to={dashboardPath} replace />;
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 flex flex-col"
    >
      <div className="p-4 border-b bg-white shadow-sm">
        <div className="container-custom flex justify-between items-center">
          <Logo />
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center py-8 px-4">
        <Outlet />
      </div>
      
      <div className="p-4 bg-gray-100 border-t">
        <div className="container-custom text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Gyaan-Kriti. All rights reserved.
        </div>
      </div>
    </motion.div>
  );
};

// Helper function to determine the correct dashboard path for a role
const getDashboardPathForRole = (role: string): string => {
  switch (role) {
    case 'paper_setter':
      return '/paper-setter';
    case 'paper_getter':
      return '/paper-getter';
    case 'admin':
      return '/admin';
    case 'subject_expert':
      return '/subject-expert';
    case 'super_user':
      return '/super-user';
    default:
      return '/';
  }
};

export default AuthLayout;