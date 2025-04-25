import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import AuthForm from '../components/auth/AuthForm';
import { useAuthStore } from '../store/authStore';
import { UserRole } from '../types';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, isLoading, error } = useAuthStore();

  const handleRegister = async (data: { 
    email: string; 
    userId: string; 
    password: string; 
    role: UserRole 
  }) => {
    try {
      await signUp(
        data.email,
        data.userId,
        data.password,
        data.role
      );
      navigate('/verify-email', { 
        state: { email: data.email } 
      });
    } catch (e) {
      // Error is handled by the store
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthForm 
          type="register" 
          onSubmit={handleRegister} 
          isLoading={isLoading}
          error={error}
        />
      </div>
    </Layout>
  );
};

export default Register;