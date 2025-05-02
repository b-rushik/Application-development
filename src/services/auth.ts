import { signUp, signIn, signOut, getCurrentUser, resetPassword, confirmResetPassword } from 'aws-amplify/auth';
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
      const { userId: newUserId, nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            'custom:role': role,
            'custom:userId': userId,
          }
        }
      });
      return { userId: newUserId, nextStep };
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  signIn: async ({ email, password }: SignInParams) => {
    try {
      const { nextStep } = await signIn({ username: email, password });
      return nextStep;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  signOut: async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      return await getCurrentUser();
    } catch (error) {
      return null;
    }
  },

  resetPassword: async (email: string) => {
    try {
      await resetPassword({ username: email });
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  },

  confirmResetPassword: async (email: string, code: string, newPassword: string) => {
    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword
      });
    } catch (error) {
      console.error('Error confirming password reset:', error);
      throw error;
    }
  }
};