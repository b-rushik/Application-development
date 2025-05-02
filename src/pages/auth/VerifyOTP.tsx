import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { CheckCircle, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface VerifyOTPFormData {
  otp: string;
}

const VerifyOTP = () => {
  const { user, verifyOtp } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<VerifyOTPFormData>();
  
  const onSubmit = async (data: VerifyOTPFormData) => {
    if (!user) {
      toast.error('No user found. Please register first.');
      navigate('/register');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await verifyOtp(user.email, data.otp);
      toast.success('Email verified successfully!');
      
      // Redirect based on user role
      if (user.role === 'paperSetter') {
        navigate('/paper-setter/personal-details');
      } else if (user.role === 'paperGetter') {
        navigate('/paper-getter');
      } else if (user.role === 'admin') {
        navigate('/admin');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // If no user in context, redirect to register
  if (!user) {
    navigate('/register');
    return null;
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center">
            <FileText className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Verify your email</h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a verification code to {user?.email}
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
              label="Enter verification code"
              type="text"
              id="otp"
              placeholder="123456"
              error={errors.otp?.message}
              {...register('otp', {
                required: 'Verification code is required',
                minLength: {
                  value: 6,
                  message: 'Verification code must be 6 digits',
                },
                maxLength: {
                  value: 6,
                  message: 'Verification code must be 6 digits',
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Verification code must contain only numbers',
                },
              })}
            />
            
            <p className="mb-6 text-sm text-gray-500">
              For demo purposes, the verification code is "123456"
            </p>
            
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              icon={<CheckCircle size={18} />}
            >
              Verify Email
            </Button>
          </form>
        </motion.div>
        
        <div className="mt-6 flex items-center justify-center">
          <button
            type="button"
            onClick={() => toast.info('Verification code resent!')}
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Didn't receive the code? Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;