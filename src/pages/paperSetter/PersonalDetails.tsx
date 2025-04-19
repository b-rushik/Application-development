import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Save, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface PersonalDetailsFormData {
  organizationName: string;
  branch: string;
  subjects: string;
  proficiencyLevel: 'high' | 'medium' | 'low';
  yearsOfExperience: number;
}

const PersonalDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, control, formState: { errors } } = useForm<PersonalDetailsFormData>({
    defaultValues: {
      organizationName: user?.organizationName || '',
      branch: user?.branch || '',
      subjects: user?.subjects?.join(', ') || '',
      proficiencyLevel: user?.proficiencyLevel || 'medium',
      yearsOfExperience: user?.yearsOfExperience || 0,
    },
  });
  
  const onSubmit = async (data: PersonalDetailsFormData) => {
    setIsLoading(true);
    
    try {
      // In a real app, you would update the user profile in the backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just show success
      setIsSubmitted(true);
      toast.success('Personal details updated successfully!');
    } catch (error) {
      toast.error('Failed to update personal details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-success-50 text-success-500">
          <CheckCircle size={48} />
        </div>
        <h2 className="mt-6 text-3xl font-bold text-gray-900">You're all set!</h2>
        <p className="mt-2 text-lg text-gray-600">
          Your personal details have been submitted successfully.
        </p>
        <p className="mt-4 text-gray-500">
          An admin will verify your details shortly. You'll be notified once verified.
        </p>
        <div className="mt-8">
          <Button onClick={() => navigate('/paper-setter')}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Personal Details</h1>
        <p className="mt-2 text-gray-600">
          Please provide your professional information to help us verify your account.
        </p>
      </div>
      
      <div className="card">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">Professional Information</h2>
        </div>
        
        <form className="px-6 py-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Name of Organization"
            type="text"
            id="organizationName"
            placeholder="e.g. Indian Institute of Technology, Mumbai"
            error={errors.organizationName?.message}
            {...register('organizationName', {
              required: 'Organization name is required',
            })}
          />
          
          <Input
            label="Branch/Department"
            type="text"
            id="branch"
            placeholder="e.g. Computer Science, Electrical Engineering"
            error={errors.branch?.message}
            {...register('branch', {
              required: 'Branch is required',
            })}
          />
          
          <Input
            label="Subjects of Expertise"
            type="text"
            id="subjects"
            placeholder="e.g. Database Management, Computer Networks, Machine Learning"
            helperText="Separate multiple subjects with commas"
            error={errors.subjects?.message}
            {...register('subjects', {
              required: 'Subjects are required',
            })}
          />
          
          <div className="mb-4">
            <label htmlFor="proficiencyLevel" className="form-label">
              Proficiency Level in Subject
            </label>
            <select
              id="proficiencyLevel"
              className="form-input"
              {...register('proficiencyLevel', {
                required: 'Proficiency level is required',
              })}
            >
              <option value="high">High - Expert/Advanced</option>
              <option value="medium">Medium - Intermediate</option>
              <option value="low">Low - Beginner</option>
            </select>
            {errors.proficiencyLevel && (
              <p className="form-error">{errors.proficiencyLevel.message}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="yearsOfExperience" className="form-label">
              Years of Experience
            </label>
            <Controller
              name="yearsOfExperience"
              control={control}
              rules={{ required: 'Years of experience is required', min: 0 }}
              render={({ field }) => (
                <input
                  type="number"
                  id="yearsOfExperience"
                  className="form-input"
                  min="0"
                  step="1"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              )}
            />
            {errors.yearsOfExperience && (
              <p className="form-error">{errors.yearsOfExperience.message}</p>
            )}
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button
              type="submit"
              isLoading={isLoading}
              icon={<Save size={18} />}
            >
              Save Details
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetails;