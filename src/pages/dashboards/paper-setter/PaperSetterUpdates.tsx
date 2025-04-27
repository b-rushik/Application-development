import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileUp, Calendar, Clock, FileText, AlertCircle, Download, 
  CheckCircle, XCircle, Info
} from 'lucide-react';

interface PaperRequest {
  id: string;
  subjectName: string;
  examDate: string;
  deadline: string;
  status: 'pending' | 'uploaded' | 'approved' | 'rejected';
  paperGetterId: string;
  paperGetterName: string;
  institution: string;
  syllabusLink: string;
  modelPaperLink: string;
  difficulty: string;
  rejectionReason?: string;
}

const PaperSetterUpdates: React.FC = () => {
  const [paperRequests, setPaperRequests] = useState<PaperRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  useEffect(() => {
    // In a real app, you would fetch the paper requests from your API
    const mockPaperRequests: PaperRequest[] = [
      {
        id: 'PR001',
        subjectName: 'Database Management Systems',
        examDate: '2025-05-15',
        deadline: '2025-05-05',
        status: 'pending',
        paperGetterId: 'PG123',
        paperGetterName: 'ABC College',
        institution: 'ABC Engineering College',
        syllabusLink: '#',
        modelPaperLink: '#',
        difficulty: 'Medium'
      },
      {
        id: 'PR002',
        subjectName: 'Computer Networks',
        examDate: '2025-05-20',
        deadline: '2025-05-10',
        status: 'pending',
        paperGetterId: 'PG456',
        paperGetterName: 'XYZ University',
        institution: 'XYZ University',
        syllabusLink: '#',
        modelPaperLink: '#',
        difficulty: 'High'
      },
      {
        id: 'PR003',
        subjectName: 'Data Structures',
        examDate: '2025-04-10',
        deadline: '2025-03-31',
        status: 'uploaded',
        paperGetterId: 'PG789',
        paperGetterName: 'LMN Institute',
        institution: 'LMN Institute of Technology',
        syllabusLink: '#',
        modelPaperLink: '#',
        difficulty: 'Medium'
      },
      {
        id: 'PR004',
        subjectName: 'Operating Systems',
        examDate: '2025-04-25',
        deadline: '2025-04-15',
        status: 'rejected',
        paperGetterId: 'PG101',
        paperGetterName: 'PQR College',
        institution: 'PQR College of Engineering',
        syllabusLink: '#',
        modelPaperLink: '#',
        difficulty: 'High',
        rejectionReason: 'The paper does not meet the standards. Please include more analytical questions and reduce the number of objective questions.'
      },
      {
        id: 'PR005',
        subjectName: 'Web Technologies',
        examDate: '2025-05-05',
        deadline: '2025-04-25',
        status: 'approved',
        paperGetterId: 'PG202',
        paperGetterName: 'STU University',
        institution: 'STU University',
        syllabusLink: '#',
        modelPaperLink: '#',
        difficulty: 'Low'
      }
    ];
    
    // Simulate API call
    setTimeout(() => {
      setPaperRequests(mockPaperRequests);
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  
  const handleUpload = async (requestId: string) => {
    if (!selectedFile) {
      setUploadError('Please select a file to upload');
      return;
    }
    
    setUploadingId(requestId);
    setUploadSuccess(null);
    setUploadError(null);
    
    try {
      // In a real app, you would upload the file to your API
      console.log(`Uploading file for request ${requestId}:`, selectedFile);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the status of the paper request
      setPaperRequests(prevRequests => 
        prevRequests.map(request => 
          request.id === requestId 
            ? { ...request, status: 'uploaded' } 
            : request
        )
      );
      
      setUploadSuccess('Question paper uploaded successfully!');
      setSelectedFile(null);
      
      // Reset the file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError('An error occurred while uploading the file. Please try again.');
    } finally {
      setUploadingId(null);
    }
  };
  
  const getDaysRemaining = (deadlineStr: string) => {
    const today = new Date();
    const deadline = new Date(deadlineStr);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-warning-100 text-warning-800';
      case 'uploaded':
        return 'bg-primary-100 text-primary-800';
      case 'approved':
        return 'bg-success-100 text-success-800';
      case 'rejected':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} className="text-warning-600" />;
      case 'uploaded':
        return <FileUp size={16} className="text-primary-600" />;
      case 'approved':
        return <CheckCircle size={16} className="text-success-600" />;
      case 'rejected':
        return <XCircle size={16} className="text-error-600" />;
      default:
        return null;
    }
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="space-y-6 px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Updates</h1>
        <p className="text-gray-600">
          View and manage your paper setting requests
        </p>
      </motion.div>
      
      {/* Success Message */}
      {uploadSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-success-50 border border-success-100 rounded-lg p-4 flex items-start"
        >
          <CheckCircle className="text-success-500 mt-0.5 mr-3 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-medium text-success-700">Success</h3>
            <p className="text-success-600 mt-1">{uploadSuccess}</p>
          </div>
        </motion.div>
      )}
      
      {/* Error Message */}
      {uploadError && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-error-50 border border-error-100 rounded-lg p-4 flex items-start"
        >
          <AlertCircle className="text-error-500 mt-0.5 mr-3 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-medium text-error-700">Error</h3>
            <p className="text-error-600 mt-1">{uploadError}</p>
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
          <h2 className="font-semibold text-gray-800">Paper Requests</h2>
        </div>
        
        <div className="p-0">
          {loading ? (
            <div className="py-8 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {paperRequests.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No paper requests available at the moment.</p>
                </div>
              ) : (
                paperRequests.map((request) => (
                  <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{request.subjectName}</h3>
                        <p className="text-gray-600 text-sm">{request.institution}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClasses(request.status)}`}>
                          {getStatusIcon(request.status)}
                          <span className="ml-1 capitalize">{request.status}</span>
                        </span>
                        <span className="text-sm text-gray-500">
                          Difficulty: <span className="font-medium">{request.difficulty}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <Calendar size={18} className="text-gray-400 mr-2" />
                        <div>
                          <p className="text-xs text-gray-500">Exam Date</p>
                          <p className="text-sm font-medium">{formatDate(request.examDate)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock size={18} className="text-gray-400 mr-2" />
                        <div>
                          <p className="text-xs text-gray-500">Deadline</p>
                          <p className="text-sm font-medium">
                            {formatDate(request.deadline)}
                            <span className={`ml-2 text-xs ${getDaysRemaining(request.deadline) < 3 ? 'text-error-600' : 'text-gray-500'}`}>
                              ({getDaysRemaining(request.deadline)} days left)
                            </span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <FileText size={18} className="text-gray-400 mr-2" />
                        <div>
                          <p className="text-xs text-gray-500">Request ID</p>
                          <p className="text-sm font-medium">{request.id}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <a 
                        href={request.syllabusLink} 
                        className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      >
                        <Download size={14} className="mr-1" />
                        Download Syllabus
                      </a>
                      
                      <a 
                        href={request.modelPaperLink} 
                        className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      >
                        <Download size={14} className="mr-1" />
                        Download Model Paper
                      </a>
                    </div>
                    
                    {request.status === 'rejected' && request.rejectionReason && (
                      <div className="mb-4 bg-error-50 border border-error-100 rounded-md p-3 text-sm text-error-700 flex items-start">
                        <Info size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Reason for Rejection:</p>
                          <p>{request.rejectionReason}</p>
                        </div>
                      </div>
                    )}
                    
                    {(request.status === 'pending' || request.status === 'rejected') && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="mb-3">
                          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">
                            Upload Question Paper (PDF format only)
                          </label>
                          <input
                            id="file-upload"
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            Max file size: 10MB. If multiple sets are required, combine them in a single PDF.
                          </p>
                        </div>
                        
                        <button
                          type="button"
                          className="btn-primary py-2 px-4 flex items-center"
                          onClick={() => handleUpload(request.id)}
                          disabled={uploadingId === request.id || !selectedFile}
                        >
                          {uploadingId === request.id ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <FileUp size={18} className="mr-2" />
                              Upload Paper
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PaperSetterUpdates;