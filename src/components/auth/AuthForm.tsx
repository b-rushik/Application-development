import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserRole } from '../../types';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Mail, Lock, User as UserIcon } from 'lucide-react';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: any) => void;
  isLoading: boolean;
  error: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({ 
  type, 
  onSubmit, 
  isLoading, 
  error 
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const isLogin = type === 'login';

  const handleFormSubmit = (data: any) => {
    if (!isLogin && !selectedRole) {
      return;
    }
    
    onSubmit({
      ...data,
      role: selectedRole,
    });
  };

  const RoleSelector = () => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select your role
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          type="button"
          className={`p-4 border rounded-md text-left transition-colors ${
            selectedRole === UserRole.PAPER_SETTER
              ? 'border-primary-500 bg-primary-50 text-primary-700'
              : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
          }`}
          onClick={() => setSelectedRole(UserRole.PAPER_SETTER)}
        >
          <h3 className="font-medium">Paper Setter</h3>
          <p className="text-sm text-gray-500">For teachers and professors who create question papers</p>
        </button>
        <button
          type="button"
          className={`p-4 border rounded-md text-left transition-colors ${
            selectedRole === UserRole.PAPER_GETTER
              ? 'border-primary-500 bg-primary-50 text-primary-700'
              : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
          }`}
          onClick={() => setSelectedRole(UserRole.PAPER_GETTER)}
        >
          <h3 className="font-medium">Paper Getter</h3>
          <p className="text-sm text-gray-500">For exam coordinators who require question papers</p>
        </button>
        <button
          type="button"
          className={`p-4 border rounded-md text-left transition-colors ${
            selectedRole === UserRole.ADMIN
              ? 'border-primary-500 bg-primary-50 text-primary-700'
              : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
          }`}
          onClick={() => setSelectedRole(UserRole.ADMIN)}
        >
          <h3 className="font-medium">Admin</h3>
          <p className="text-sm text-gray-500">For system administrators</p>
        </button>
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {isLogin ? 'Log in to your account' : 'Create a new account'}
      </h2>
      
      {error && (
        <div className="bg-error-50 text-error-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {!isLogin && <RoleSelector />}
        
        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={<Mail size={18} />}
            error={errors.email?.message as string}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              }
            })}
          />
          
          {!isLogin && (
            <Input
              label="User ID"
              placeholder="Choose a unique user ID"
              icon={<UserIcon size={18} />}
              error={errors.userId?.message as string}
              {...register('userId', { 
                required: 'User ID is required',
                minLength: {
                  value: 4,
                  message: 'User ID must be at least 4 characters long',
                }
              })}
            />
          )}
          
          <Input
            label="Password"
            type="password"
            placeholder={isLogin ? "Enter your password" : "Choose a strong password"}
            icon={<Lock size={18} />}
            error={errors.password?.message as string}
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              }
            })}
          />
        </div>
        
        {isLogin && (
          <div className="mt-2 text-right">
            <a href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
              Forgot your password?
            </a>
          </div>
        )}
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          className="mt-6"
          isLoading={isLoading}
        >
          {isLogin ? 'Sign in' : 'Create account'}
        </Button>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <a href="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign up
              </a>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <a href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign in
              </a>
            </>
          )}
        </div>
      </form>
    </Card>
  );
};

export default AuthForm;