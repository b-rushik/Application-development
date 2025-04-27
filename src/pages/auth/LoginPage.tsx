import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Logo from '../../components/common/Logo';
import LoadingSpinner from '../../components/common/LoadingSpinner';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormInputs>();
  
  useEffect(() => {
    document.title = 'Log In - Gyaan Kriti';
  }, []);
  
  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      const user = await Auth.signIn(data.email, data.password);
      
      // Redirect based on user group/role
      const userGroups = user.signInUserSession.accessToken.payload['cognito:groups'] || [];
      
      if (userGroups.includes('paper-setter')) {
        navigate('/paper-setter');
      } else if (userGroups.includes('paper-getter')) {
        navigate('/paper-getter');
      } else if (userGroups.includes('admin')) {
        navigate('/admin');
      } else if (userGroups.includes('subject-expert')) {
        navigate('/subject-expert');
      } else if (userGroups.includes('super-user')) {
        navigate('/super-user');
      } else {
        // Fallback to home if no group is assigned
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        if (error.name === 'UserNotConfirmedException') {
          setErrorMessage('Please verify your email before logging in.');
        } else if (error.name === 'NotAuthorizedException') {
          setErrorMessage('Incorrect username or password.');
        } else {
          setErrorMessage('An error occurred during login. Please try again.');
        }
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
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
                <Logo className="h-10 w-10" />
              </div>
              <h1 className="text-2xl font-display font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-600 mt-2">Sign in to your account</p>
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
                  autoComplete="email"
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
                    autoComplete="current-password"
                    className={`input pr-10 ${errors.password ? 'border-error-500' : ''}`}
                    disabled={isLoading}
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 4,
                        message: 'Password must be at least 4 characters'
                      }
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
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="checkbox"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </Link>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-2.5"
              >
                {isLoading ? <LoadingSpinner size="sm" color="text-white" /> : 'Sign In'}
              </button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Don't have an account?</span>{' '}
              <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
                Sign up
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default LoginPage;