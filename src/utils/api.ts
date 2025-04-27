import axios from 'axios';

// Create an axios instance with default config
export const api = axios.create({
  baseURL: 'https://api.your-domain.com', // Replace with actual API URL in production
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    
    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Token expired - force logout
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Mock API for development - remove in production
if (import.meta.env.DEV) {
  // This is just for development purposes
  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    role: 'paper_setter',
    verified: true,
  };
  
  // Mock login
  api.interceptors.request.use((config) => {
    // For demonstration only - to be removed in production
    if (config.url === '/auth/login' && config.method === 'post') {
      return Promise.resolve({
        data: {
          token: 'mock-token',
          user: mockUser,
        },
      }) as any;
    }
    return config;
  });
}