import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Lock, Mail, Shield, User } from 'lucide-react';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';
import { adminLoginSchema } from '../utils/validation';
import { Link } from 'react-router-dom';

const AdminLoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPersonalEmailForm, setShowPersonalEmailForm] = useState(false);
  const [personalEmail, setPersonalEmail] = useState('');
  const { login } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: 'kattyperry123@gmail.com',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      // Check if credentials match the hardcoded values
      if (data.email === 'kattyperry123@gmail.com' && data.password === 'Orlando@4bloom') {
        setShowPersonalEmailForm(true);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePersonalEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Process admin login with role specification
      await login('kattyperry123@gmail.com', 'Orlando@4bloom', 'admin');
      // Redirect is handled in the login function
    } catch (error) {
      console.error('Admin login error:', error);
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
      <div className="bg-primary-600 text-white p-6">
        <div className="flex items-center justify-center mb-4">
          <Shield size={28} className="mr-2" />
          <h1 className="text-2xl font-bold">Admin Login</h1>
        </div>
        <p className="text-center text-primary-100">
          Secure access for Gyaan-Kriti administrators.
        </p>
      </div>

      <div className="p-6">
        {!showPersonalEmailForm ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputField
              label="Email Address"
              type="email"
              leftIcon={<Mail size={18} />}
              error={errors.email?.message?.toString()}
              disabled
              {...register('email')}
            />

            <InputField
              label="Password"
              type="password"
              leftIcon={<Lock size={18} />}
              error={errors.password?.message?.toString()}
              {...register('password')}
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={loading}
              disabled={loading}
              className="mt-6"
            >
              Continue
            </Button>
          </form>
        ) : (
          <form onSubmit={handlePersonalEmailSubmit} className="space-y-4">
            <div className="mb-6 text-center">
              <p className="text-gray-700 mb-2">Please provide your personal email</p>
              <div className="w-16 h-1 bg-primary-500 mx-auto"></div>
            </div>
            
            <InputField
              label="Personal Email Address"
              type="email"
              leftIcon={<Mail size={18} />}
              value={personalEmail}
              onChange={(e) => setPersonalEmail(e.target.value)}
              required
            />

            <InputField
              label="Country Code & Mobile Number"
              type="tel"
              placeholder="+91 98765 43210"
              required
            />

            <InputField
              label="Organization User ID"
              type="text"
              placeholder="Enter a unique ID for your organization"
              required
            />

            <div className="mt-4 p-4 bg-primary-50 rounded-md text-sm text-gray-700">
              <p>
                <strong>Note:</strong> This information will be used to create your organization admin account.
                You will receive an OTP at your personal email for verification.
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={loading}
              disabled={loading}
              className="mt-6"
            >
              Create Admin Account
            </Button>
          </form>
        )}
      </div>

      <div className="p-4 bg-gray-50 border-t">
        <div className="text-center text-sm text-gray-600 space-y-2">
          <p>
            This login is restricted to authorized administrators only.
          </p>
          <p>
            Are you a Super User?{' '}
            <Link to="/super-user-login" className="text-primary-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminLoginPage;