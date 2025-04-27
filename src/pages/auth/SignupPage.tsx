import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, CheckCircle, Info } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Logo from '../../components/common/Logo';
import LoadingSpinner from '../../components/common/LoadingSpinner';

interface SignupFormInputs {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  countryCode: string;
  phoneNumber: string;
  terms: boolean;
  userType: 'paper-setter' | 'paper-getter';
}

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm<SignupFormInputs>();
  
  const password = watch('password', '');
  
  useEffect(() => {
    document.title = 'Sign Up - Gyaan Kriti';
  }, []);
  
  const validatePassword = (value: string) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const hasNumber = /\d/.test(value);
    
    if (!hasUpperCase) return 'Password must contain at least one uppercase letter';
    if (!hasLowerCase) return 'Password must contain at least one lowercase letter';
    if (!hasSpecialChar) return 'Password must contain at least one special character';
    if (!hasNumber) return 'Password must contain at least one number';
    
    return true;
  };
  
  const onSubmit = async (data: SignupFormInputs) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    
    try {
      // Format phone number with country code
      const formattedPhoneNumber = `+${data.countryCode}${data.phoneNumber}`;
      
      // Sign up with Cognito
      await Auth.signUp({
        username: data.email,
        password: data.password,
        attributes: {
          name: data.fullName,
          phone_number: formattedPhoneNumber,
          'custom:user_type': data.userType,
        },
      });
      
      setSuccessMessage('Your account has been created successfully! Please check your email for verification instructions.');
      
      // Redirect to verification page after successful signup
      setTimeout(() => {
        navigate('/verify-email', { state: { email: data.email } });
      }, 3000);
    } catch (error) {
      console.error('Signup error:', error);
      if (error instanceof Error) {
        if (error.name === 'UsernameExistsException') {
          setErrorMessage('An account with this email already exists.');
        } else {
          setErrorMessage(error.message || 'An error occurred during signup. Please try again.');
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
        <div className="container max-w-2xl mx-auto px-4">
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
              <h1 className="text-2xl font-display font-bold text-gray-900">Create Your Account</h1>
              <p className="text-gray-600 mt-2">Join Gyaan Kriti today</p>
            </div>
            
            {errorMessage && (
              <div className="mb-6 p-3 rounded-md bg-error-50 text-error-700 flex items-start">
                <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}
            
            {successMessage && (
              <div className="mb-6 p-3 rounded-md bg-success-50 text-success-700 flex items-start">
                <CheckCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
                    I am a: <span className="text-error-600">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`relative flex border rounded-md p-3 cursor-pointer transition-colors ${
                      watch('userType') === 'paper-setter' 
                        ? 'bg-primary-50 border-primary-500' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        value="paper-setter"
                        className="sr-only"
                        {...register('userType', { required: 'Please select your role' })}
                      />
                      <span className="flex flex-col">
                        <span className="font-medium text-gray-900">Paper Setter</span>
                        <span className="text-xs text-gray-500">Create question papers</span>
                      </span>
                      {watch('userType') === 'paper-setter' && (
                        <CheckCircle size={18} className="absolute top-3 right-3 text-primary-600" />
                      )}
                    </label>
                    
                    <label className={`relative flex border rounded-md p-3 cursor-pointer transition-colors ${
                      watch('userType') === 'paper-getter' 
                        ? 'bg-primary-50 border-primary-500' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        value="paper-getter"
                        className="sr-only"
                        {...register('userType', { required: 'Please select your role' })}
                      />
                      <span className="flex flex-col">
                        <span className="font-medium text-gray-900">Paper Getter</span>
                        <span className="text-xs text-gray-500">Request question papers</span>
                      </span>
                      {watch('userType') === 'paper-getter' && (
                        <CheckCircle size={18} className="absolute top-3 right-3 text-primary-600" />
                      )}
                    </label>
                  </div>
                  {errors.userType && (
                    <p className="mt-1 text-sm text-error-600">{errors.userType.message}</p>
                  )}
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-error-600">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    className={`input ${errors.fullName ? 'border-error-500' : ''}`}
                    disabled={isLoading}
                    {...register('fullName', { 
                      required: 'Full name is required' 
                    })}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-error-600">{errors.fullName.message}</p>
                  )}
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {watch('userType') === 'paper-setter' ? 'Official College Email ID' : 'Exam Cell Email ID'}
                    <span className="text-error-600">*</span>
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
                    Password <span className="text-error-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      className={`input pr-10 ${errors.password ? 'border-error-500' : ''}`}
                      disabled={isLoading}
                      {...register('password', { 
                        required: 'Password is required',
                        minLength: {
                          value: 4,
                          message: 'Password must be at least 4 characters'
                        },
                        maxLength: {
                          value: 20,
                          message: 'Password must not exceed 20 characters'
                        },
                        validate: validatePassword
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
                  <div className="mt-2 text-xs text-gray-500 flex items-start">
                    <Info size={12} className="mr-1 mt-0.5 flex-shrink-0" />
                    Password must be 4-20 characters with at least one uppercase letter, one lowercase letter, one number, and one special character.
                  </div>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password <span className="text-error-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      className={`input pr-10 ${errors.confirmPassword ? 'border-error-500' : ''}`}
                      disabled={isLoading}
                      {...register('confirmPassword', { 
                        required: 'Please confirm your password',
                        validate: value => value === password || 'The passwords do not match'
                      })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-error-600">{errors.confirmPassword.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Country Code <span className="text-error-600">*</span>
                  </label>
                  <input
                    id="countryCode"
                    type="text"
                    placeholder="91"
                    className={`input ${errors.countryCode ? 'border-error-500' : ''}`}
                    disabled={isLoading}
                    {...register('countryCode', { 
                      required: 'Country code is required',
                      pattern: {
                        value: /^\d+$/,
                        message: 'Please enter numbers only'
                      }
                    })}
                  />
                  {errors.countryCode && (
                    <p className="mt-1 text-sm text-error-600">{errors.countryCode.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number <span className="text-error-600">*</span>
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    className={`input ${errors.phoneNumber ? 'border-error-500' : ''}`}
                    disabled={isLoading}
                    {...register('phoneNumber', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^\d{10}$/,
                        message: 'Please enter a valid 10-digit phone number'
                      }
                    })}
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-error-600">{errors.phoneNumber.message}</p>
                  )}
                </div>
                
                <div className="col-span-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        className={`checkbox ${errors.terms ? 'border-error-500' : ''}`}
                        disabled={isLoading}
                        {...register('terms', { 
                          required: 'You must agree to the terms and conditions' 
                        })}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="font-medium text-gray-700">
                        I agree to the <a href="/terms" target="_blank" className="text-primary-600 hover:text-primary-500">Terms and Conditions</a> <span className="text-error-600">*</span>
                      </label>
                      {errors.terms && (
                        <p className="mt-1 text-sm text-error-600">{errors.terms.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-2.5"
              >
                {isLoading ? <LoadingSpinner size="sm" color="text-white" /> : 'Create Account'}
              </button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Already have an account?</span>{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Sign in
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default SignupPage;