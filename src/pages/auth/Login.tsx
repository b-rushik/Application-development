import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FileText, ArrowLeft, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      await login(data.email, data.password);
      toast.success('Login successful!');
      
      // Redirect based on role (will happen in auth provider)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to login. Please try again.');
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
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              create a new account
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
            <Input
              label="Email address"
              type="email"
              id="email"
              placeholder="example@university.edu"
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Please enter a valid email',
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
            
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <Link
                to="/reset-password"
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                Forgot password?
              </Link>
            </div>
            
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              icon={<LogIn size={18} />}
            >
              Sign in
            </Button>
          </form>
        </motion.div>
        
        <div className="mt-6 flex items-center justify-center">
          <div className="text-sm">
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              Need an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;