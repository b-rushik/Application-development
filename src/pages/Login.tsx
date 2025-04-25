import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import AuthForm from '../components/auth/AuthForm';
import { useAuthStore } from '../store/authStore';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (e) {
      // Error is handled by the store
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthForm 
          type="login" 
          onSubmit={handleLogin} 
          isLoading={isLoading}
          error={error}
        />
      </div>
    </Layout>
  );
};

export default Login;