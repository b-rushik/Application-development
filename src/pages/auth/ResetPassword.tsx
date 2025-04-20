import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FileText, ArrowLeft, Key } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface ResetPasswordFormData {
  email: string;
}

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>();
  
  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would send a reset link/OTP
      // For demo, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      toast.success('Password reset instructions sent to your email!');
    } catch (error) {
      toast.error('Failed to send reset instructions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/login" className="mb-6 inline-flex items-center text-primary-600 hover:text-primary-800">
            <ArrowLeft size={16} className="mr-2" />
            Back to Login
          </Link>
          <div className="flex justify-center">
            <FileText className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Reset your password</h2>
          <p className="mt-2 text-sm text-gray-600">
            We'll send you instructions to reset your password
          </p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card"
        >
          {!isSubmitted ? (
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
              
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                icon={<Key size={18} />}
              >
                Send Reset Instructions
              </Button>
            </form>
          ) : (
            <div className="px-6 py-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-50 text-success-500">
                  <CheckCircle size={32} />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Check your email</h3>
              <p className="mb-6 text-gray-600">
                We've sent password reset instructions to your email address. Please check your inbox.
              </p>
              <Button variant="outline" fullWidth onClick={() => navigate('/login')}>
                Return to Login
              </Button>
            </div>
          )}
        </motion.div>
        
        <div className="mt-6 flex items-center justify-center">
          <div className="text-sm">
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Remember your password? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;