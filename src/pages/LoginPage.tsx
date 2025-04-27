import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';
import { loginSchema } from '../utils/validation';

interface LocationState {
  from?: { pathname: string };
}

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const location = useLocation();
  const state = location.state as LocationState;
  const from = state?.from?.pathname || '/';

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await login(data.email, data.password);
      // Redirect is handled in the login function
    } catch (error) {
      console.error('Login error:', error);
      // Error handling is done in the login function
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="bg-primary-500 text-white p-6">
        <h1 className="text-2xl font-bold">Log In to Your Account</h1>
        <p className="mt-2 text-primary-100">
          Welcome back to Gyaan-Kriti.
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Email Address"
            type="email"
            leftIcon={<Mail size={18} />}
            error={errors.email?.message?.toString()}
            {...register('email')}
          />

          <InputField
            label="Password"
            type="password"
            leftIcon={<Lock size={18} />}
            error={errors.password?.message?.toString()}
            {...register('password')}
          />

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-primary-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={loading}
            disabled={loading}
            className="mt-6"
          >
            Log In
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;