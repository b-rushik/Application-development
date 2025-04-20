import { API } from 'aws-amplify';

const API_NAME = 'qpmsApi';

export const api = {
  // User Management
  createUser: async (userData: any) => {
    return API.post(API_NAME, '/users', { body: userData });
  },
  
  updateUser: async (userId: string, userData: any) => {
    return API.put(API_NAME, `/users/${userId}`, { body: userData });
  },
  
  getUser: async (userId: string) => {
    return API.get(API_NAME, `/users/${userId}`, {});
  },

  // Paper Management
  createPaperRequest: async (requestData: any) => {
    return API.post(API_NAME, '/paper-requests', { body: requestData });
  },
  
  updatePaperRequest: async (requestId: string, requestData: any) => {
    return API.put(API_NAME, `/paper-requests/${requestId}`, { body: requestData });
  },
  
  getPaperRequest: async (requestId: string) => {
    return API.get(API_NAME, `/paper-requests/${requestId}`, {});
  },
  
  listPaperRequests: async (filters?: any) => {
    return API.get(API_NAME, '/paper-requests', { queryStringParameters: filters });
  },

  // Paper Submission
  submitPaper: async (submissionData: any) => {
    return API.post(API_NAME, '/paper-submissions', { body: submissionData });
  },
  
  evaluatePaper: async (submissionId: string, evaluationData: any) => {
    return API.put(API_NAME, `/paper-submissions/${submissionId}/evaluate`, { body: evaluationData });
  },
  
  getPaperSubmission: async (submissionId: string) => {
    return API.get(API_NAME, `/paper-submissions/${submissionId}`, {});
  },
};