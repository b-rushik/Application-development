import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import LoadingSpinner from '../common/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const userGroups = user.signInUserSession.accessToken.payload['cognito:groups'] || [];
        
        setIsAuthenticated(true);
        
        // Set user role based on Cognito groups
        if (userGroups.includes(requiredRole)) {
          setUserRole(requiredRole);
        } else {
          setUserRole(userGroups[0] || null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUserRole(null);
      }
    };
    
    checkAuth();
  }, [requiredRole]);
  
  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (userRole !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'paper-setter') {
      return <Navigate to="/paper-setter" replace />;
    } else if (userRole === 'paper-getter') {
      return <Navigate to="/paper-getter" replace />;
    } else if (userRole === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (userRole === 'subject-expert') {
      return <Navigate to="/subject-expert" replace />;
    } else if (userRole === 'super-user') {
      return <Navigate to="/super-user" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;