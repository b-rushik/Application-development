import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FileText, ArrowLeft, UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { UserRole } from '../../types';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  userId: string;
  role: UserRole;
}

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const password = watch('password');
  
  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    
    try {
      await registerUser(data.email, data.password, data.role, data.userId);
      toast.success('Registration successful! Please verify your email.');
      navigate('/verify-otp');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="mb-6 inline-flex items-center text-primary-600 hover:text-primary-800">
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
          <div className="flex justify-center">
            <FileText className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card"
        >
          <form className="px-6 py-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="form-label">I am a</label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Paper Setter', value: 'paperSetter' },
                  { label: 'Paper Getter', value: 'paperGetter' },
                ].map((option) => (
                  <label 
                    key={option.value} 
                    className="flex cursor-pointer items-center rounded-md border border-gray-300 p-3 hover:border-primary-500"
                  >
                    <input
                      type="radio"
                      value={option.value}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      {...register('role', { required: 'Please select a role' })}
                    />
                    <span className="ml-2">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.role && <p className="form-error">{errors.role.message}</p>}
            </div>
            
            <Input
              label="Email address"
              type="email"
              id="email"
              placeholder="example@university.edu"
              error={errors.email?.message}
              helperText="For Paper Setters: Use personal email. For Paper Getters: Use exam cell email."
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Please enter a valid email',
                },
              })}
            />
            
            <Input
              label="User ID"
              type="text"
              id="userId"
              placeholder="Enter your preferred user ID"
              error={errors.userId?.message}
              helperText="This will be used to create your organization email: userId@organization-domain-name.com"
              {...register('userId', {
                required: 'User ID is required',
                minLength: {
                  value: 3,
                  message: 'User ID must be at least 3 characters',
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+$/,
                  message: 'User ID can only contain letters, numbers, and .-_',
                },
              })}
            />
            
            <Input
              label="Password"
              type="password"
              id="password"
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            
            <Input
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match',
              })}
            />
            
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              icon={<UserPlus size={18} />}
            >
              Create Account
            </Button>
          </form>
        </motion.div>
        
        <div className="mt-6 flex items-center justify-center">
          <div className="text-sm">
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;