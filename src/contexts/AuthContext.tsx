import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User, UserRole } from '../types';
import { auth } from '../services/auth';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: UserRole, userId: string) => Promise<void>;
  logout: () => Promise<void>;
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

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = await auth.getCurrentUser();
        if (currentUser) {
          const userAttributes = currentUser.attributes || {};
          const userData: User = {
            id: currentUser.userId,
            name: userAttributes.name || userAttributes.email,
            email: userAttributes.email,
            role: (userAttributes['custom:role'] as UserRole) || 'paperSetter',
            isVerified: true,
            createdAt: new Date().toISOString(),
          };

          setState({
            user: userData,
            isLoading: false,
            isAuthenticated: true,
          });

          // Store in cookie for persistence
          Cookies.set('user', JSON.stringify(userData), { expires: 7 });
        } else {
          setState({
            ...initialAuthState,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setState({
          ...initialAuthState,
          isLoading: false,
        });
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setState({ ...state, isLoading: true });
    
    try {
      const signInResult = await auth.signIn({ email, password });
      
      if (signInResult.isSignedIn) {
        const currentUser = await auth.getCurrentUser();
        const userAttributes = currentUser.attributes || {};
        
        const userData: User = {
          id: currentUser.userId,
          name: userAttributes.name || email,
          email: userAttributes.email,
          role: (userAttributes['custom:role'] as UserRole) || 'paperSetter',
          isVerified: true,
          createdAt: new Date().toISOString(),
        };

        Cookies.set('user', JSON.stringify(userData), { expires: 7 });
        
        setState({
          user: userData,
          isLoading: false,
          isAuthenticated: true,
        });

        toast.success('Login successful!');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setState({
        ...state,
        isLoading: false,
      });
      throw new Error('Login failed. Please check your credentials.');
    }
  };

  const register = async (email: string, password: string, role: UserRole, userId: string) => {
    setState({ ...state, isLoading: true });
    
    try {
      const { nextStep } = await auth.signUp({ email, password, role, userId });
      
      const user: User = {
        id: userId,
        name: userId,
        email,
        role,
        isVerified: false,
        createdAt: new Date().toISOString(),
      };
      
      setState({
        user,
        isLoading: false,
        isAuthenticated: false,
      });
      
      if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        toast.info('Please verify your email address');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setState({
        ...state,
        isLoading: false,
      });
      throw error;
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    setState({ ...state, isLoading: true });
    
    try {
      // In a real app, you'd call confirmSignUp here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otp !== '123456') {
        throw new Error('Invalid OTP');
      }
      
      if (state.user) {
        const updatedUser = {
          ...state.user,
          isVerified: true,
        };
        
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

  const resetPassword = async (email: string, newPassword: string) => {
    setState({ ...state, isLoading: true });
    
    try {
      await auth.resetPassword(email);
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
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      Cookies.remove('user');
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
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