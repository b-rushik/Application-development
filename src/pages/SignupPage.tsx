import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { User, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import SelectField from '../components/common/SelectField';
import { useAuth } from '../contexts/AuthContext';
import { paperSetterSignupSchema, paperGetterSignupSchema } from '../utils/validation';

const countryCodes = [
  { value: '+91', label: 'India (+91)' },
  { value: '+1', label: 'USA (+1)' },
  { value: '+44', label: 'UK (+44)' },
  { value: '+61', label: 'Australia (+61)' },
  { value: '+86', label: 'China (+86)' },
  { value: '+81', label: 'Japan (+81)' },
];

const SignupPage = () => {
  const [userType, setUserType] = useState<'paper_setter' | 'paper_getter'>('paper_setter');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const schema = userType === 'paper_setter' ? paperSetterSignupSchema : paperGetterSignupSchema;
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      countryCode: '+91',
      mobileNumber: '',
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      // Combine data with user type
      const userData = {
        ...data,
        role: userType,
      };
      
      await signup(userData);
      toast.success('Registration successful!');
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchUserType = (type: 'paper_setter' | 'paper_getter') => {
    setUserType(type);
    reset(); // Reset form when switching user type
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="bg-primary-500 text-white p-6">
        <h1 className="text-2xl font-bold">Create an Account</h1>
        <p className="mt-2 text-primary-100">
          Join Gyaan-Kriti to revolutionize educational assessment.
        </p>
      </div>

      <div className="p-6">
        {/* User Type Selection */}
        <div className="flex mb-6 border rounded-md overflow-hidden">
          <button
            type="button"
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              userType === 'paper_setter'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => switchUserType('paper_setter')}
          >
            Paper Setter
          </button>
          <button
            type="button"
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              userType === 'paper_getter'
                ? 'bg-secondary-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => switchUserType('paper_getter')}
          >
            Paper Getter
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Full Name"
            leftIcon={<User size={18} />}
            error={errors.fullName?.message?.toString()}
            {...register('fullName')}
          />

          <InputField
            label={userType === 'paper_setter' ? "Official College Email ID" : "Exam Cell Email ID"}
            type="email"
            leftIcon={<Mail size={18} />}
            error={errors.email?.message?.toString()}
            helperText={
              userType === 'paper_setter'
                ? "Please use your college or university email"
                : "Please use your exam cell email"
            }
            {...register('email')}
          />

          <InputField
            label="Password"
            type="password"
            error={errors.password?.message?.toString()}
            helperText="Must be 4-20 characters with at least one uppercase, one lowercase, and one special character"
            {...register('password')}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField
              label="Country Code"
              options={countryCodes}
              error={errors.countryCode?.message?.toString()}
              className="md:col-span-1"
              {...register('countryCode')}
            />

            <InputField
              label="Mobile Number"
              leftIcon={<Phone size={18} />}
              error={errors.mobileNumber?.message?.toString()}
              className="md:col-span-2"
              {...register('mobileNumber')}
            />
          </div>

          <div className="mt-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  {...register('termsAccepted')}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I accept the{' '}
                  <a 
                    href="#" 
                    className="text-primary-500 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('/terms-and-conditions.pdf', '_blank');
                    }}
                  >
                    Terms and Conditions
                  </a>
                </label>
                {errors.termsAccepted && (
                  <p className="form-error">{errors.termsAccepted.message?.toString()}</p>
                )}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={loading}
            disabled={loading}
          >
            Create Account
          </Button>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-500 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div className="p-6 bg-gray-50 border-t">
        <div className="flex space-x-6">
          <div className="flex items-start flex-1">
            <CheckCircle className="text-success-500 mt-1 mr-2 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-medium">Secure Platform</h3>
              <p className="text-sm text-gray-600">Your data is encrypted and never shared.</p>
            </div>
          </div>
          <div className="flex items-start flex-1">
            <AlertCircle className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-medium">Verification Required</h3>
              <p className="text-sm text-gray-600">Your account will be verified by our admins.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SignupPage;