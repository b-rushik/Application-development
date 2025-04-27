import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while authentication is being checked
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated but not authorized, redirect to appropriate page
  if (user && !allowedRoles.includes(user.role)) {
    // Redirect to the appropriate dashboard based on role
    const redirectPath = getDashboardPathForRole(user.role);
    return <Navigate to={redirectPath} replace />;
  }

  // If authenticated and authorized, render the children
  return <>{children}</>;
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

export default PrivateRoute;