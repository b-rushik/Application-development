import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User, UserRole } from '../types';
import Cookies from 'js-cookie';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: UserRole, userId: string) => Promise<void>;
  logout: () => void;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  resetPassword: (email: string, newPassword: string) => Promise<void>;
}

const initialAuthState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(initialAuthState);

  // Initialize auth state from cookies
  useEffect(() => {
    const userDataStr = Cookies.get('user');
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        setState({
          user: userData,
          isLoading: false,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error('Failed to parse user data from cookie', error);
        setState({
          ...initialAuthState,
          isLoading: false,
        });
      }
    } else {
      setState({
        ...initialAuthState,
        isLoading: false,
      });
    }
  }, []);

  // Mock login implementation (replace with real API calls in production)
  const login = async (email: string, password: string) => {
    // Simulate API call
    setState({ ...state, isLoading: true });
    
    try {
      // This is where you'd make an actual API call
      // For now, we'll simulate a successful login with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email domain
      let role: UserRole = 'paperSetter';
      if (email.includes('admin')) {
        role = 'admin';
      } else if (email.includes('examcell')) {
        role = 'paperGetter';
      }
      
      const user: User = {
        id: Math.random().toString(36).substring(2, 15),
        name: email.split('@')[0],
        email,
        role,
        isVerified: role === 'admin',
        createdAt: new Date().toISOString(),
      };
      
      // Store user in cookie
      Cookies.set('user', JSON.stringify(user), { expires: 7 });
      
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Login error:', error);
      setState({
        ...state,
        isLoading: false,
      });
      throw new Error('Login failed. Please check your credentials.');
    }
  };

  // Mock register implementation
  const register = async (email: string, password: string, role: UserRole, userId: string) => {
    setState({ ...state, isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate organization email
      const orgEmail = `${userId}@organization-domain-name.com`;
      
      const user: User = {
        id: Math.random().toString(36).substring(2, 15),
        name: userId,
        email,
        personalEmail: email,
        orgEmail,
        role,
        isVerified: false,
        createdAt: new Date().toISOString(),
      };
      
      // In a real app, the user wouldn't be authenticated yet until OTP verification
      setState({
        user,
        isLoading: false,
        isAuthenticated: false,
      });
      
      // Return success to trigger OTP verification flow
    } catch (error) {
      console.error('Registration error:', error);
      setState({
        ...state,
        isLoading: false,
      });
      throw new Error('Registration failed. Please try again.');
    }
  };

  // Mock OTP verification
  const verifyOtp = async (email: string, otp: string) => {
    setState({ ...state, isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you'd validate the OTP with your backend
      if (otp !== '123456') { // Mock OTP check
        throw new Error('Invalid OTP');
      }
      
      // If the user exists in state, update and set as authenticated
      if (state.user) {
        const updatedUser = {
          ...state.user,
          isVerified: true,
        };
        
        // Store user in cookie
        Cookies.set('user', JSON.stringify(updatedUser), { expires: 7 });
        
        setState({
          user: updatedUser,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setState({
        ...state,
        isLoading: false,
      });
      throw error;
    }
  };

  // Mock password reset
  const resetPassword = async (email: string, newPassword: string) => {
    setState({ ...state, isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you'd call your backend to reset the password
      
      setState({
        ...state,
        isLoading: false,
      });
    } catch (error) {
      console.error('Password reset error:', error);
      setState({
        ...state,
        isLoading: false,
      });
      throw new Error('Password reset failed. Please try again.');
    }
  };

  // Logout
  const logout = () => {
    // Remove cookie
    Cookies.remove('user');
    
    // Reset state
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    verifyOtp,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};