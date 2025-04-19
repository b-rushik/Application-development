import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';

// Paper Setter API
export const createPaperSetterProfile = async (profileData) => {
  try {
    const result = await API.graphql({
      query: mutations.createPaperSetter,
      variables: { input: profileData }
    });
    return result.data.createPaperSetter;
  } catch (error) {
    console.error('Error creating paper setter profile:', error);
    throw error;
  }
};

// Paper Getter API
export const createPaperRequest = async (requestData) => {
  try {
    const result = await API.graphql({
      query: mutations.createPaperRequest,
      variables: { input: requestData }
    });
    return result.data.createPaperRequest;
  } catch (error) {
    console.error('Error creating paper request:', error);
    throw error;
  }
};

// Admin API
export const verifyUser = async (userId, status) => {
  try {
    const result = await API.graphql({
      query: mutations.updateUserVerification,
      variables: { input: { id: userId, verified: status } }
    });
    return result.data.updateUserVerification;
  } catch (error) {
    console.error('Error verifying user:', error);
    throw error;
  }
};

// Common API
export const fetchSubjectExperts = async () => {
  try {
    const result = await API.graphql({ query: queries.listSubjectExperts });
    return result.data.listSubjectExperts.items;
  } catch (error) {
    console.error('Error fetching subject experts:', error);
    throw error;
  }
};