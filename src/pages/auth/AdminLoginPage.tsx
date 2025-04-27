import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, UserCog } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Logo from '../../components/common/Logo';
import LoadingSpinner from '../../components/common/LoadingSpinner';

interface AdminLoginFormInputs {
  email: string;
  password: string;
  personalEmail?: string;
}

const AdminLoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isNewAccount, setIsNewAccount] = useState(false);
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<AdminLoginFormInputs>();
  
  useEffect(() => {
    document.title = 'Admin Login - Gyaan Kriti';
  }, []);
  
  const onSubmit = async (data: AdminLoginFormInputs) => {
    setIsLoading(true);
    setErrorMessage(null);
    
    // Check for hardcoded admin credentials
    if (data.email === 'kattyperry123@gmail.com' && data.password === 'Orlando@4bloom') {
      // If it's a new account setup and personal email is provided
      if (isNewAccount && data.personalEmail) {
        // Here you would create the admin account
        // This is a simplified version for demonstration
        setTimeout(() => {
          navigate('/admin');
        }, 1500);
      } else if (!isNewAccount) {
        // Regular login
        setTimeout(() => {
          navigate('/admin');
        }, 1500);
      } else {
        setErrorMessage('Please provide your personal email for account setup.');
        setIsLoading(false);
      }
    } else {
      setErrorMessage('Invalid admin credentials.');
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Header />
      
      <div className="min-h-screen pt-24 pb-12 flex flex-col justify-center">
        <div className="container max-w-md mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card p-8"
          >
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                  <UserCog size={28} className="text-primary-600" />
                </div>
              </div>
              <h1 className="text-2xl font-display font-bold text-gray-900">Admin Access</h1>
              <p className="text-gray-600 mt-2">Sign in to admin dashboard</p>
            </div>
            
            {errorMessage && (
              <div className="mb-6 p-3 rounded-md bg-error-50 text-error-700 flex items-start">
                <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  defaultValue="kattyperry123@gmail.com"
                  className={`input ${errors.email ? 'border-error-500' : ''}`}
                  disabled={isLoading}
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Please enter a valid email address'
                    }
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    defaultValue="Orlando@4bloom"
                    className={`input pr-10 ${errors.password ? 'border-error-500' : ''}`}
                    disabled={isLoading}
                    {...register('password', { 
                      required: 'Password is required'
                    })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-error-600">{errors.password.message}</p>
                )}
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newAccount"
                    type="checkbox"
                    className="checkbox"
                    onChange={(e) => setIsNewAccount(e.target.checked)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="newAccount" className="font-medium text-gray-700">
                    I'm a new admin setting up my account
                  </label>
                </div>
              </div>
              
              {isNewAccount && (
                <div>
                  <label htmlFor="personalEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Personal Email
                  </label>
                  <input
                    id="personalEmail"
                    type="email"
                    className={`input ${errors.personalEmail ? 'border-error-500' : ''}`}
                    disabled={isLoading}
                    {...register('personalEmail', { 
                      required: isNewAccount ? 'Personal email is required for new accounts' : false,
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Please enter a valid email address'
                      }
                    })}
                  />
                  {errors.personalEmail && (
                    <p className="mt-1 text-sm text-error-600">{errors.personalEmail.message}</p>
                  )}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-2.5"
              >
                {isLoading ? <LoadingSpinner size="sm" color="text-white" /> : (isNewAccount ? 'Set Up Account' : 'Sign In')}
              </button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <Link to="/admin-access" className="font-medium text-primary-600 hover:text-primary-500">
                Back to Admin Portal
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default AdminLoginPage;