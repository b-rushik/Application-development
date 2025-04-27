import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  CheckCircle, Save, Plus, Trash2, AlertCircle, 
  User, Building, GraduationCap, BookOpen, Clock
} from 'lucide-react';

interface PersonalDetailsFormData {
  organization: string;
  college: string;
  branch: string;
  subjects: {
    name: string;
    proficiency: string;
    experience: string;
  }[];
  overallExperience: string;
}

const PaperSetterPersonalDetails: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors, isDirty },
    reset,
    watch
  } = useForm<PersonalDetailsFormData>({
    defaultValues: {
      organization: '',
      college: '',
      branch: '',
      subjects: [{ name: '', proficiency: '', experience: '' }],
      overallExperience: ''
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subjects'
  });
  
  // Load existing data if available
  useEffect(() => {
    // In a real app, you would fetch the user data from your API
    const mockUserData = {
      organization: 'Central University',
      college: 'Delhi University',
      branch: 'Computer Science',
      subjects: [
        {
          name: 'Data Structures',
          proficiency: 'Expert',
          experience: '3-4 years'
        },
        {
          name: 'Database Management',
          proficiency: 'Advanced',
          experience: '5-6 years'
        }
      ],
      overallExperience: '6 years'
    };
    
    // For demo purposes, check if the user has already submitted details
    const hasSubmittedBefore = localStorage.getItem('paperSetterDetailsSubmitted');
    
    if (hasSubmittedBefore === 'true') {
      reset(mockUserData);
      setIsVerified(true);
    }
  }, [reset]);
  
  const onSubmit = async (data: PersonalDetailsFormData) => {
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    
    try {
      // In a real app, you would send the data to your API
      console.log('Form submitted:', data);
      
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store that the user has submitted details (for demo purposes)
      localStorage.setItem('paperSetterDetailsSubmitted', 'true');
      
      setSuccessMessage('Your details have been submitted successfully! They will be verified by an admin.');
      
      // In a real app, you would refresh the form with the submitted data
      // setIsVerified(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('An error occurred while submitting your details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6 px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Personal Details</h1>
        <p className="text-gray-600">
          Provide your professional details for verification
        </p>
      </motion.div>
      
      {/* Verification Status */}
      {isVerified && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-success-50 border border-success-100 rounded-lg p-4 flex items-start"
        >
          <CheckCircle className="text-success-500 mt-0.5 mr-3 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-medium text-success-700">Verified Account</h3>
            <p className="text-success-600 mt-1">Your details have been verified by our administrators.</p>
          </div>
        </motion.div>
      )}
      
      {/* Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-success-50 border border-success-100 rounded-lg p-4 flex items-start"
        >
          <CheckCircle className="text-success-500 mt-0.5 mr-3 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-medium text-success-700">Submission Successful</h3>
            <p className="text-success-600 mt-1">{successMessage}</p>
          </div>
        </motion.div>
      )}
      
      {/* Error Message */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-error-50 border border-error-100 rounded-lg p-4 flex items-start"
        >
          <AlertCircle className="text-error-500 mt-0.5 mr-3 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-medium text-error-700">Error</h3>
            <p className="text-error-600 mt-1">{errorMessage}</p>
          </div>
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
          <h2 className="font-semibold text-gray-800">Your Professional Information</h2>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Organization Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization <span className="text-error-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building size={18} className="text-gray-400" />
                  </div>
                  <select
                    className={`input pl-10 appearance-none ${errors.organization ? 'border-error-500' : ''}`}
                    disabled={isSubmitting || isVerified}
                    {...register('organization', { required: 'Organization is required' })}
                  >
                    <option value="">Select organization type</option>
                    <option value="IIT or NIT">IIT or NIT</option>
                    <option value="Central University">Central or State University (Public)</option>
                    <option value="Private University">Central or State University (Private)</option>
                    <option value="Autonomous College">Autonomous College</option>
                    <option value="Affiliated College">Affiliated College</option>
                  </select>
                </div>
                {errors.organization && (
                  <p className="mt-1 text-sm text-error-600">{errors.organization.message}</p>
                )}
              </div>
              
              {/* College/Institution Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name of College/Institution <span className="text-error-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className={`input pl-10 ${errors.college ? 'border-error-500' : ''}`}
                    placeholder="Enter your college/institution name"
                    disabled={isSubmitting || isVerified}
                    {...register('college', { required: 'College name is required' })}
                  />
                </div>
                {errors.college && (
                  <p className="mt-1 text-sm text-error-600">{errors.college.message}</p>
                )}
              </div>
              
              {/* Branch/Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch/Department <span className="text-error-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className={`input pl-10 ${errors.branch ? 'border-error-500' : ''}`}
                    placeholder="E.g., Computer Science, Electronics"
                    disabled={isSubmitting || isVerified}
                    {...register('branch', { required: 'Branch is required' })}
                  />
                </div>
                {errors.branch && (
                  <p className="mt-1 text-sm text-error-600">{errors.branch.message}</p>
                )}
              </div>
              
              {/* Overall Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Overall Experience <span className="text-error-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className={`input pl-10 ${errors.overallExperience ? 'border-error-500' : ''}`}
                    placeholder="E.g., 5 years"
                    disabled={isSubmitting || isVerified}
                    {...register('overallExperience', { required: 'Overall experience is required' })}
                  />
                </div>
                {errors.overallExperience && (
                  <p className="mt-1 text-sm text-error-600">{errors.overallExperience.message}</p>
                )}
              </div>
            </div>
            
            {/* Subjects of Expertise */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Subjects of Expertise <span className="text-error-600">*</span>
                </label>
                {!isVerified && (
                  <button 
                    type="button" 
                    className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
                    onClick={() => append({ name: '', proficiency: '', experience: '' })}
                    disabled={isSubmitting}
                  >
                    <Plus size={16} className="mr-1" />
                    Add Subject
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="border border-gray-200 rounded-md p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Subject Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BookOpen size={16} className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            className={`input pl-10 text-sm ${errors.subjects?.[index]?.name ? 'border-error-500' : ''}`}
                            placeholder="E.g., Data Structures"
                            disabled={isSubmitting || isVerified}
                            {...register(`subjects.${index}.name` as const, { 
                              required: 'Subject name is required' 
                            })}
                          />
                        </div>
                        {errors.subjects?.[index]?.name && (
                          <p className="mt-1 text-xs text-error-600">{errors.subjects?.[index]?.name?.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Proficiency Level
                        </label>
                        <select
                          className={`input text-sm ${errors.subjects?.[index]?.proficiency ? 'border-error-500' : ''}`}
                          disabled={isSubmitting || isVerified}
                          {...register(`subjects.${index}.proficiency` as const, { 
                            required: 'Proficiency level is required' 
                          })}
                        >
                          <option value="">Select proficiency</option>
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                        {errors.subjects?.[index]?.proficiency && (
                          <p className="mt-1 text-xs text-error-600">{errors.subjects?.[index]?.proficiency?.message}</p>
                        )}
                      </div>
                      
                      <div className="relative">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Years of Experience
                        </label>
                        <div className="flex items-center">
                          <select
                            className={`input text-sm flex-grow ${errors.subjects?.[index]?.experience ? 'border-error-500' : ''}`}
                            disabled={isSubmitting || isVerified}
                            {...register(`subjects.${index}.experience` as const, { 
                              required: 'Experience is required' 
                            })}
                          >
                            <option value="">Select experience</option>
                            <option value="0-2 years">0-2 years</option>
                            <option value="3-4 years">3-4 years</option>
                            <option value="5-6 years">5-6 years</option>
                            <option value="7+ years">7+ years</option>
                          </select>
                          
                          {!isVerified && fields.length > 1 && (
                            <button
                              type="button"
                              className="ml-2 text-error-600 hover:text-error-700 p-1 rounded-md hover:bg-error-50"
                              onClick={() => remove(index)}
                              disabled={isSubmitting}
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                        {errors.subjects?.[index]?.experience && (
                          <p className="mt-1 text-xs text-error-600">{errors.subjects?.[index]?.experience?.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {errors.subjects && (
                <p className="mt-1 text-sm text-error-600">Please add at least one subject</p>
              )}
            </div>
            
            {!isVerified && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary py-2 px-6 flex items-center"
                >
                  {isSubmitting ? (
                    <>Submitting...</>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Save Details
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PaperSetterPersonalDetails;