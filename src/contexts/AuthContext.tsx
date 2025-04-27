import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../utils/api';

type UserRole = 'paper_setter' | 'paper_getter' | 'admin' | 'subject_expert' | 'super_user';

interface User {
  id: string;
  name: string;
  email: string;
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
        const token = localStorage.getItem('token');
        if (token) {
          // Validate token and get user info
          const response = await api.get('/auth/me');
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (email: string, password: string, role?: string) => {
    try {
      setLoading(true);
      
      let endpoint = '/auth/login';
      if (role === 'admin') {
        endpoint = '/auth/admin-login';
      } else if (role === 'super_user') {
        endpoint = '/auth/super-user-login';
      } else if (role === 'subject_expert') {
        endpoint = '/auth/subject-expert-login';
      }
      
      const response = await api.post(endpoint, { email, password });
      const { token, user } = response.data;
      
      // Save token to local storage
      localStorage.setItem('token', token);
      setUser(user);
      
      // Redirect based on role
      if (user.role === 'paper_setter') {
        navigate('/paper-setter');
      } else if (user.role === 'paper_getter') {
        navigate('/paper-getter');
      } else if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'subject_expert') {
        navigate('/subject-expert');
      } else if (user.role === 'super_user') {
        navigate('/super-user');
      }
      
      toast.success('Logged in successfully');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: any) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data;
      
      // Save token to local storage
      localStorage.setItem('token', token);
      setUser(user);
      
      // Redirect based on role
      if (user.role === 'paper_setter') {
        navigate('/paper-setter');
      } else if (user.role === 'paper_getter') {
        navigate('/paper-getter');
      }
      
      toast.success('Registration successful');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
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