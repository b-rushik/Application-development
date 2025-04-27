import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Lock, Mail, User } from 'lucide-react';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';

const SuperUserLoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: 'rushikburla2019@gmail.com',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      // Check if credentials match the hardcoded values for super user
      if (data.email !== 'rushikburla2019@gmail.com') {
        throw new Error('Invalid email');
      }
      
      // Use the login function with role specification
      await login(data.email, data.password, 'super_user');
      // Redirect is handled in the login function
    } catch (error) {
      console.error('Super user login error:', error);
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
      <div className="bg-gray-800 text-white p-6">
        <div className="flex items-center justify-center mb-4">
          <User size={28} className="mr-2" />
          <h1 className="text-2xl font-bold">Super User Login</h1>
        </div>
        <p className="text-center text-gray-300">
          System administrator access for Gyaan-Kriti platform.
        </p>
      </div>

      <div className="p-6">
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
            placeholder="Enter Gyaan-kriti@123"
            {...register('password')}
          />

          <div className="mt-4 p-4 bg-gray-50 rounded-md text-sm text-gray-700">
            <p>
              <strong>Note:</strong> This login is restricted to super users with highest level of access.
              All activities are logged for security purposes.
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
            Log In
          </Button>
        </form>
      </div>

      <div className="p-4 bg-gray-100 border-t text-center text-sm text-gray-600">
        <p>
          If you need assistance, please contact the system administrator.
        </p>
      </div>
    </motion.div>
  );
};

export default SuperUserLoginPage;