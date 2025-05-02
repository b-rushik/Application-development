import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FileUp, Calendar, Clock, Send } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface RequestPaperFormData {
  course: string;
  branch: string;
  subject: string;
  difficultyLevel: 'hard' | 'medium' | 'low';
  numSets: number;
  examDate: string;
  examTime: string;
}

const RequestPaper = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [syllabusFile, setSyllabusFile] = useState<File | null>(null);
  const [modelPaperFile, setModelPaperFile] = useState<File | null>(null);
  
  const { register, handleSubmit, control, formState: { errors } } = useForm<RequestPaperFormData>({
    defaultValues: {
      numSets: 1,
      difficultyLevel: 'medium',
    },
  });
  
  const onSubmit = async (data: RequestPaperFormData) => {
    if (!syllabusFile) {
      toast.error('Please upload a syllabus file');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you would upload the files and submit the form data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Paper request submitted successfully!');
      navigate('/paper-getter/select-faculty');
    } catch (error) {
      toast.error('Failed to submit paper request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSyllabusUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSyllabusFile(e.target.files[0]);
    }
  };
  
  const handleModelPaperUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setModelPaperFile(e.target.files[0]);
    }
  };
  
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Request Question Paper</h1>
        <p className="mt-2 text-gray-600">
          Fill in the details below to request a new question paper.
        </p>
      </div>
      
      <div className="card">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">Paper Request Details</h2>
        </div>
        
        <form className="px-6 py-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Course"
            type="text"
            id="course"
            placeholder="e.g. B.Tech, M.Tech, BCA, MCA"
            error={errors.course?.message}
            {...register('course', {
              required: 'Course is required',
            })}
          />
          
          <Input
            label="Branch"
            type="text"
            id="branch"
            placeholder="e.g. Computer Science, Electronics, Civil"
            error={errors.branch?.message}
            {...register('branch', {
              required: 'Branch is required',
            })}
          />
          
          <Input
            label="Subject"
            type="text"
            id="subject"
            placeholder="e.g. Database Management, Computer Networks"
            error={errors.subject?.message}
            {...register('subject', {
              required: 'Subject is required',
            })}
          />
          
          <div className="mb-4">
            <label className="form-label">Syllabus Upload (PDF)</label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="syllabus-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileUp className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 5MB)</p>
                </div>
                <input
                  id="syllabus-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleSyllabusUpload}
                />
              </label>
            </div>
            {syllabusFile && (
              <p className="mt-2 text-sm text-gray-600">
                Selected file: {syllabusFile.name}
              </p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="difficultyLevel" className="form-label">
              Paper Difficulty Level
            </label>
            <select
              id="difficultyLevel"
              className="form-input"
              {...register('difficultyLevel', {
                required: 'Difficulty level is required',
              })}
            >
              <option value="hard">Hard (Professors from IIT/NIT)</option>
              <option value="medium">Medium (Professors from Central/State Universities)</option>
              <option value="low">Low (People from Autonomous/Affiliated Colleges)</option>
            </select>
            {errors.difficultyLevel && (
              <p className="form-error">{errors.difficultyLevel.message}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="numSets" className="form-label">
              Number of Sets Required
            </label>
            <Controller
              name="numSets"
              control={control}
              rules={{ required: 'Number of sets is required', min: 1, max: 10 }}
              render={({ field }) => (
                <input
                  type="number"
                  id="numSets"
                  className="form-input"
                  min="1"
                  max="10"
                  step="1"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                />
              )}
            />
            {errors.numSets && (
              <p className="form-error">{errors.numSets.message}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="form-label">Model Paper Upload (Optional)</label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="model-paper-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileUp className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 5MB)</p>
                </div>
                <input
                  id="model-paper-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleModelPaperUpload}
                />
              </label>
            </div>
            {modelPaperFile && (
              <p className="mt-2 text-sm text-gray-600">
                Selected file: {modelPaperFile.name}
              </p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="examDate" className="form-label flex items-center">
              <Calendar size={18} className="mr-2 text-gray-500" />
              Exam Date
            </label>
            <input
              type="date"
              id="examDate"
              className="form-input"
              min={new Date().toISOString().split('T')[0]}
              {...register('examDate', {
                required: 'Exam date is required',
              })}
            />
            {errors.examDate && (
              <p className="form-error">{errors.examDate.message}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="examTime" className="form-label flex items-center">
              <Clock size={18} className="mr-2 text-gray-500" />
              Exam Time
            </label>
            <input
              type="time"
              id="examTime"
              className="form-input"
              {...register('examTime', {
                required: 'Exam time is required',
              })}
            />
            {errors.examTime && (
              <p className="form-error">{errors.examTime.message}</p>
            )}
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button
              type="submit"
              isLoading={isLoading}
              icon={<Send size={18} />}
            >
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestPaper;