import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FileUp, Clock, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';

interface PaperRequest {
  id: string;
  subject: string;
  deadline: string;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  feedback?: string;
  rating?: number;
}

const QuestionPaper = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Mock paper request data
  const paperRequest: PaperRequest = {
    id: '123',
    subject: 'Operating Systems',
    deadline: '2024-03-15T23:59:59Z',
    status: 'pending'
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File size should be less than 5MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Question paper uploaded successfully!');
      navigate('/paper-setter/history');
    } catch (error) {
      toast.error('Failed to upload question paper. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Calculate time remaining until deadline
  const getTimeRemaining = () => {
    const now = new Date().getTime();
    const deadline = new Date(paperRequest.deadline).getTime();
    const timeLeft = deadline - now;

    if (timeLeft <= 0) return 'Deadline passed';

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m remaining`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Question Paper Upload</h1>
        <div className="flex items-center space-x-2 text-warning-600">
          <Clock className="h-5 w-5" />
          <span className="text-sm font-medium">{getTimeRemaining()}</span>
        </div>
      </div>

      <div className="card p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Paper Details</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">Subject: </span>
              <span className="font-medium text-gray-900">{paperRequest.subject}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">Deadline: </span>
              <span className="font-medium text-gray-900">
                {new Date(paperRequest.deadline).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 text-lg font-medium text-gray-900">Upload Requirements</h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600">
            <li>File must be in PDF format</li>
            <li>Maximum file size: 5MB</li>
            <li>Include all sections as per the syllabus</li>
            <li>Ensure proper formatting and clarity</li>
          </ul>
        </div>

        <div className="mb-6">
          <label
            htmlFor="question-paper-upload"
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center">
              <FileUp className="mb-3 h-12 w-12 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF (MAX. 5MB)</p>
            </div>
            <input
              id="question-paper-upload"
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleFileSelect}
            />
          </label>
          {selectedFile && (
            <div className="mt-4 flex items-center justify-between rounded-lg bg-primary-50 p-4">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-primary-600" />
                <span className="font-medium text-primary-900">{selectedFile.name}</span>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-sm text-primary-600 hover:text-primary-800"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {paperRequest.status === 'rejected' && paperRequest.feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-lg bg-error-50 p-4"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-error-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-error-800">Previous Submission Feedback</h3>
                <div className="mt-2 text-sm text-error-700">
                  <p>{paperRequest.feedback}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate('/paper-setter')}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            isLoading={isUploading}
            disabled={!selectedFile}
            icon={<FileUp size={18} />}
          >
            Upload Question Paper
          </Button>
        </div>
      </div>

      <div className="rounded-lg bg-gray-50 p-4">
        <h3 className="mb-3 text-sm font-medium text-gray-900">Note:</h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
          <li>Make sure all questions are clear and unambiguous</li>
          <li>Include marking scheme if required</li>
          <li>Double-check for any errors before uploading</li>
          <li>You cannot modify the paper after submission unless rejected</li>
        </ul>
      </div>
    </div>
  );
};

export default QuestionPaper;