import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { UserRole } from '../types';

interface SignUpParams {
  email: string;
  password: string;
  role: UserRole;
  userId: string;
}

interface SignInParams {
  email: string;
  password: string;
}

export const auth = {
  signUp: async ({ email, password, role, userId }: SignUpParams) => {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          'custom:role': role,
          'custom:userId': userId,
        },
      });
      return user;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  signIn: async ({ email, password }: SignInParams) => {
    try {
      const user = await Auth.signIn(email, password);
      return user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  signOut: async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  getCurrentUser: async (): Promise<CognitoUser | null> => {
    try {
      return await Auth.currentAuthenticatedUser();
    } catch (error) {
      return null;
    }
  },

  resetPassword: async (email: string) => {
    try {
      await Auth.forgotPassword(email);
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  },

  confirmResetPassword: async (email: string, code: string, newPassword: string) => {
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
    } catch (error) {
      console.error('Error confirming password reset:', error);
      throw error;
    }
  },
};