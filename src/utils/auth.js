import { Auth } from 'aws-amplify';

// Sign up a new user
export const signUp = async (username, password, email, role) => {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
        'custom:role': role
      }
    });
    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Confirm sign up with OTP
export const confirmSignUp = async (username, code) => {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.error('Error confirming sign up:', error);
    throw error;
  }
};

// Sign in a user
export const signIn = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
    return user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Get current authenticated user
export const getCurrentUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Sign out
export const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Get user role
export const getUserRole = async () => {
  const user = await getCurrentUser();
  return user?.attributes?.['custom:role'];
};