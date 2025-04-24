import { useState } from 'react';
import { FileText, Download, Star, CheckCircle, AlertTriangle, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface PaperSubmission {
  id: string;
  subject: string;
  submittedBy: {
    name: string;
    organization: string;
  };
  requestedBy: {
    name: string;
    organization: string;
  };
  submittedDate: string;
  examDate: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  rating?: number;
  feedback?: string;
}

const EvaluatePapers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');

  // Mock paper submissions data
  const papers: PaperSubmission[] = [
    {
      id: '1',
      subject: 'Operating Systems',
      submittedBy: {
        name: 'Dr. Ramesh Kumar',
        organization: 'IIT Mumbai'
      },
      requestedBy: {
        name: 'ABC University',
        organization: 'Exam Cell'
      },
      submittedDate: '2024-02-15T14:30:00Z',
      examDate: '2024-03-15T09:00:00Z',
      status: 'pending'
    },
    {
      id: '2',
      subject: 'Database Management',
      submittedBy: {
        name: 'Prof. Sunita Sharma',
        organization: 'Delhi University'
      },
      requestedBy: {
        name: 'XYZ College',
        organization: 'Exam Department'
      },
      submittedDate: '2024-02-10T09:15:00Z',
      examDate: '2024-03-10T09:00:00Z',
      status: 'approved',
      rating: 85,
      feedback: 'Excellent paper with well-structured questions.'
    },
    {
      id: '3',
      subject: 'Computer Networks',
      submittedBy: {
        name: 'Dr. Anand Verma',
        organization: 'NIT Delhi'
      },
      requestedBy: {
        name: 'PQR Institute',
        organization: 'Examination Cell'
      },
      submittedDate: '2024-02-05T16:45:00Z',
      examDate: '2024-03-05T09:00:00Z',
      status: 'rejected',
      rating: 65,
      feedback: 'Questions need to be more challenging. Please include more analytical problems.'
    }
  ];

  // Filter papers based on search query and status
  const filteredPapers = papers.filter(paper => {
    const matchesSearch = 
      paper.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.submittedBy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.requestedBy.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || paper.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleDownload = async (paperId: string) => {
    try {
      // Simulate paper download
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Paper downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download paper');
    }
  };

  const handleEvaluate = async (paperId: string) => {
    if (!rating) {
      toast.error('Please provide a rating');
      return;
    }

    setIsEvaluating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Paper evaluated successfully!');
      setSelectedPaper(null);
      setRating(0);
      setFeedback('');
    } catch (error) {
      toast.error('Failed to submit evaluation');
    } finally {
      setIsEvaluating(false);
    }
  };

  const getStatusBadge = (status: PaperSubmission['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center rounded-full bg-success-50 px-2.5 py-0.5 text-xs font-medium text-success-700">
            <CheckCircle className="mr-1 h-3 w-3" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center rounded-full bg-error-50 px-2.5 py-0.5 text-xs font-medium text-error-700">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-warning-50 px-2.5 py-0.5 text-xs font-medium text-warning-700">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Pending Review
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Evaluate Papers</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Total Papers: {papers.length}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="form-label flex items-center">
              <Search size={18} className="mr-2 text-gray-500" />
              Search Papers
            </label>
            <Input
              type="text"
              placeholder="Search by subject or faculty name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label flex items-center">
              <Filter size={18} className="mr-2 text-gray-500" />
              Filter by Status
            </label>
            <select
              className="form-input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Papers List */}
      <div className="space-y-4">
        {filteredPapers.map((paper) => (
          <motion.div
            key={paper.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card overflow-hidden"
          >
            <div className="border-b border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{paper.subject}</h3>
                    <p className="text-sm text-gray-500">
                      Submitted by {paper.submittedBy.name} ({paper.submittedBy.organization})
                    </p>
                  </div>
                </div>
                {getStatusBadge(paper.status)}
              </div>
            </div>

            <div className="p-4">
              <div className="mb-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-gray-500">Requested By</p>
                  <p className="font-medium text-gray-900">
                    {paper.requestedBy.name}
                    <span className="block text-sm text-gray-500">{paper.requestedBy.organization}</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submitted Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(paper.submittedDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Exam Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(paper.examDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {paper.rating && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Rating</p>
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(paper.rating / 20) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-medium text-gray-900">{paper.rating}%</span>
                  </div>
                </div>
              )}

              {paper.feedback && (
                <div className="mb-4 rounded-md bg-gray-50 p-3">
                  <p className="text-sm font-medium text-gray-900">Feedback</p>
                  <p className="mt-1 text-sm text-gray-600">{paper.feedback}</p>
                </div>
              )}

              {selectedPaper === paper.id ? (
                <div className="space-y-4 border-t border-gray-200 pt-4">
                  <div>
                    <label className="form-label">Rating (0-100)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="form-input"
                      value={rating}
                      onChange={(e) => setRating(parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <label className="form-label">Feedback</label>
                    <textarea
                      className="form-input min-h-[100px]"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Provide detailed feedback about the paper..."
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedPaper(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handleEvaluate(paper.id)}
                      isLoading={isEvaluating}
                    >
                      Submit Evaluation
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => handleDownload(paper.id)}
                    icon={<Download size={18} />}
                  >
                    Download Paper
                  </Button>
                  {paper.status === 'pending' && (
                    <Button
                      onClick={() => setSelectedPaper(paper.id)}
                    >
                      Evaluate Paper
                    </Button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {filteredPapers.length === 0 && (
          <div className="card p-8 text-center">
            <p className="text-gray-500">No papers found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluatePapers;