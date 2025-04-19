import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import LoadingSpinner from '../ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: UserRole | UserRole[];
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if the user has the required role(s)
  if (role) {
    const roles = Array.isArray(role) ? role : [role];
    
    if (!roles.includes(user.role)) {
      // Redirect based on user's actual role
      const redirectPath = `/${user.role.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      return <Navigate to={redirectPath} replace />;
    }
    
    // For paper getters, check if they're verified
    if (user.role === 'paperGetter' && !user.isVerified) {
      return (
        <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
          <div className="card max-w-lg p-8">
            <h2 className="mb-4 text-2xl font-bold text-primary-800">Account Not Verified</h2>
            <p className="mb-6 text-gray-600">
              Your account is pending verification by an administrator. You will be notified when your account is verified.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary"
            >
              Refresh Status
            </button>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;