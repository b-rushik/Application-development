import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as cognito from '../utils/cognito';

type UserRole = 'paper_setter' | 'paper_getter' | 'admin' | 'subject_expert' | 'super_user';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  verified: boolean;
  organizationId?: string;
  rating?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role?: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const userData = await cognito.getCurrentUser();
        if (userData) {
          setUser({
            id: userData.sub,
            email: userData.email,
            name: userData['custom:name'],
            role: userData['custom:role'] as UserRole,
            verified: userData['custom:verified'] === 'true',
            organizationId: userData['custom:organizationId'],
            rating: userData['custom:rating'] ? parseFloat(userData['custom:rating']) : undefined
          });
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (email: string, password: string, role?: string) => {
    try {
      setLoading(true);
      const result = await cognito.signIn(email, password);
      
      if (result.user) {
        setUser({
          id: result.user.sub,
          email: result.user.email,
          name: result.user['custom:name'],
          role: result.user['custom:role'] as UserRole,
          verified: result.user['custom:verified'] === 'true',
          organizationId: result.user['custom:organizationId'],
          rating: result.user['custom:rating'] ? parseFloat(result.user['custom:rating']) : undefined
        });

        // Redirect based on role
        const dashboardPath = getDashboardPathForRole(result.user['custom:role'] as UserRole);
        navigate(dashboardPath);
        
        toast.success('Logged in successfully');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: any) => {
    try {
      setLoading(true);
      await cognito.signUp(userData.email, userData.password, {
        'custom:name': userData.fullName,
        'custom:role': userData.role,
        'custom:verified': 'false',
        'custom:organizationId': userData.organizationId || '',
        'custom:rating': '0',
        email: userData.email,
        phone_number: userData.mobileNumber
      });
      
      toast.success('Registration successful! Please verify your email.');
      navigate('/login');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    cognito.signOut();
    setUser(null);
    navigate('/');
    toast.info('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const getDashboardPathForRole = (role: UserRole): string => {
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