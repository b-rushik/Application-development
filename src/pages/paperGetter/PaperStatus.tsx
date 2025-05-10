import { useState } from 'react';
import { FileText, Clock, CheckCircle, AlertTriangle, Download, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '../../components/ui/Button';

interface PaperRequest {
  id: string;
  subject: string;
  requestDate: string;
  examDate: string;
  status: 'pending' | 'assigned' | 'submitted' | 'reviewed' | 'approved' | 'rejected';
  faculty?: {
    name: string;
    organization: string;
  };
  downloadUrl?: string;
  downloadPassword?: string;
  rating?: number;
  feedback?: string;
}

const PaperStatus = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Mock paper requests data
  const paperRequests: PaperRequest[] = [
    {
      id: '1',
      subject: 'Operating Systems',
      requestDate: '2024-02-15T14:30:00Z',
      examDate: '2024-03-15T09:00:00Z',
      status: 'approved',
      faculty: {
        name: 'Dr. Ramesh Kumar',
        organization: 'IIT Mumbai'
      },
      downloadUrl: '#',
      downloadPassword: 'OS2024#exam',
      rating: 85
    },
    {
      id: '2',
      subject: 'Computer Networks',
      requestDate: '2024-02-10T09:15:00Z',
      examDate: '2024-03-10T09:00:00Z',
      status: 'submitted',
      faculty: {
        name: 'Prof. Sunita Sharma',
        organization: 'NIT Delhi'
      }
    },
    {
      id: '3',
      subject: 'Database Management',
      requestDate: '2024-02-05T16:45:00Z',
      examDate: '2024-03-05T09:00:00Z',
      status: 'rejected',
      faculty: {
        name: 'Dr. Anand Verma',
        organization: 'Delhi University'
      },
      feedback: 'Paper requirements not met. Please submit a new request.'
    }
  ];

  const getStatusIcon = (status: PaperRequest['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-success-500" />;
      case 'rejected':
        return <AlertTriangle className="h-5 w-5 text-error-500" />;
      case 'submitted':
      case 'reviewed':
        return <Clock className="h-5 w-5 text-accent-500" />;
      default:
        return <Clock className="h-5 w-5 text-primary-500" />;
    }
  };

  const getStatusText = (status: PaperRequest['status']) => {
    switch (status) {
      case 'pending':
        return 'Waiting for faculty assignment';
      case 'assigned':
        return 'Paper setter assigned';
      case 'submitted':
        return 'Paper submitted for review';
      case 'reviewed':
        return 'Under final review';
      case 'approved':
        return 'Ready for download';
      case 'rejected':
        return 'Request rejected';
      default:
        return 'Processing';
    }
  };

  const getStatusClass = (status: PaperRequest['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-success-50 text-success-700 border-success-200';
      case 'rejected':
        return 'bg-error-50 text-error-700 border-error-200';
      case 'submitted':
      case 'reviewed':
        return 'bg-accent-50 text-accent-700 border-accent-200';
      default:
        return 'bg-primary-50 text-primary-700 border-primary-200';
    }
  };

  const handleDownload = async (request: PaperRequest) => {
    if (!request.downloadUrl || !request.downloadPassword) {
      toast.error('Download not available yet');
      return;
    }

    setIsDownloading(true);
    try {
      // Simulate download
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Question paper downloaded successfully!');
      // In a real app, this would trigger the actual file download
    } catch (error) {
      toast.error('Failed to download question paper');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Paper Status</h1>

      <div className="space-y-4">
        {paperRequests.map((request) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card overflow-hidden"
          >
            <div className="border-b border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900">{request.subject}</h3>
                </div>
                <div className={`rounded-full border px-3 py-1 text-sm font-medium ${getStatusClass(request.status)}`}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(request.status)}
                    <span>{getStatusText(request.status)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Request Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(request.requestDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Exam Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(request.examDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {request.faculty && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Assigned Faculty</p>
                  <p className="font-medium text-gray-900">
                    {request.faculty.name} - {request.faculty.organization}
                  </p>
                </div>
              )}

              {request.rating && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Paper Rating</p>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-gray-900">{request.rating}%</span>
                  </div>
                </div>
              )}

              {request.feedback && (
                <div className="mb-4 rounded-md bg-error-50 p-3">
                  <p className="text-sm font-medium text-error-800">Feedback</p>
                  <p className="mt-1 text-sm text-error-600">{request.feedback}</p>
                </div>
              )}

              {request.status === 'approved' && (
                <div className="space-y-3">
                  <div className="rounded-md bg-gray-50 p-3">
                    <p className="text-sm font-medium text-gray-900">Download Password</p>
                    <div className="mt-1 flex items-center space-x-2">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={request.downloadPassword}
                        readOnly
                        className="form-input text-sm"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-sm text-primary-600 hover:text-primary-800"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>
                  
                  <Button
                    fullWidth
                    onClick={() => handleDownload(request)}
                    isLoading={isDownloading}
                    icon={<Download size={18} />}
                  >
                    Download Question Paper
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PaperStatus;