import { create } from 'zustand';
import { Auth } from 'aws-amplify';
import { AuthState, User, UserRole } from '../types';

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  signUp: (
    personalEmail: string, 
    userId: string, 
    password: string, 
    role: UserRole
  ) => Promise<void>;
  confirmSignUp: (email: string, code: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  confirmResetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setVerificationStatus: (status: boolean) => void;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  role: null,
  isVerified: false,
  isLoading: true,
  error: null,
};

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  ...initialState,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const cognitoUser = await Auth.signIn(email, password);
      
      // Check if this is first login (password reset required)
      if (cognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
        set({ 
          isLoading: false,
          error: 'PASSWORD_RESET_REQUIRED' 
        });
        return;
      }

      // Get user attributes from Cognito
      const { attributes } = cognitoUser;
      
      const user: User = {
        id: cognitoUser.username,
        personalEmail: attributes.email,
        orgEmail: attributes['custom:orgEmail'],
        userId: attributes['custom:userId'],
        role: attributes['custom:role'] as UserRole,
        isVerified: attributes['custom:isVerified'] === 'true',
        orgId: attributes['custom:orgId'],
        createdAt: attributes.createdAt || new Date().toISOString(),
      };

      set({ 
        isAuthenticated: true, 
        user,
        role: user.role,
        isVerified: user.isVerified,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Login error:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to login' 
      });
    }
  },

  signUp: async (personalEmail, userId, password, role) => {
    try {
      set({ isLoading: true, error: null });
      
      // Generate organization email
      const orgEmail = `${userId}@organization-domain-name.com`;
      
      // Sign up user with Cognito
      await Auth.signUp({
        username: personalEmail,
        password,
        attributes: {
          email: personalEmail,
          'custom:userId': userId,
          'custom:orgEmail': orgEmail,
          'custom:role': role,
          'custom:isVerified': 'false',
        },
      });
      
      set({ isLoading: false });
    } catch (error) {
      console.error('Signup error:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to sign up' 
      });
    }
  },

  confirmSignUp: async (email, code) => {
    try {
      set({ isLoading: true, error: null });
      await Auth.confirmSignUp(email, code);
      set({ isLoading: false });
    } catch (error) {
      console.error('Confirmation error:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to confirm sign up' 
      });
    }
  },

  resetPassword: async (email) => {
    try {
      set({ isLoading: true, error: null });
      await Auth.forgotPassword(email);
      set({ isLoading: false });
    } catch (error) {
      console.error('Reset password error:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to reset password' 
      });
    }
  },

  confirmResetPassword: async (email, code, newPassword) => {
    try {
      set({ isLoading: true, error: null });
      await Auth.forgotPasswordSubmit(email, code, newPassword);
      set({ isLoading: false });
    } catch (error) {
      console.error('Confirm reset password error:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to confirm password reset' 
      });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      await Auth.signOut();
      set({ ...initialState, isLoading: false });
    } catch (error) {
      console.error('Logout error:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to log out' 
      });
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const cognitoUser = await Auth.currentAuthenticatedUser();
      
      const { attributes } = cognitoUser;
      
      const user: User = {
        id: cognitoUser.username,
        personalEmail: attributes.email,
        orgEmail: attributes['custom:orgEmail'],
        userId: attributes['custom:userId'],
        role: attributes['custom:role'] as UserRole,
        isVerified: attributes['custom:isVerified'] === 'true',
        orgId: attributes['custom:orgId'],
        createdAt: attributes.createdAt || new Date().toISOString(),
      };

      set({ 
        isAuthenticated: true, 
        user,
        role: user.role,
        isVerified: user.isVerified,
        isLoading: false,
      });
    } catch (error) {
      // User is not authenticated
      set({ ...initialState, isLoading: false });
    }
  },

  setVerificationStatus: (status) => {
    const { user } = get();
    if (user) {
      set({
        isVerified: status,
        user: { ...user, isVerified: status },
      });
    }
  },
}));