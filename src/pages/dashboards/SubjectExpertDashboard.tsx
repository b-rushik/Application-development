import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Star, Clock, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import Button from '../../components/common/Button';

const SubjectExpertDashboard = () => {
  // Mock data - would come from API in real implementation
  const pendingReviews = [
    {
      id: 'r1',
      subject: 'Data Structures and Algorithms',
      paperSetter: 'Dr. Rajat Kumar',
      submittedOn: '2025-05-15T10:30:00Z',
      deadline: '2025-05-17T10:30:00Z',
      status: 'pending'
    },
    {
      id: 'r2',
      subject: 'Database Management Systems',
      paperSetter: 'Prof. Meera Singh',
      submittedOn: '2025-05-14T14:45:00Z',
      deadline: '2025-05-16T14:45:00Z',
      status: 'in_progress'
    }
  ];

  const completedReviews = [
    {
      id: 'cr1',
      subject: 'Operating Systems',
      paperSetter: 'Dr. Amit Verma',
      reviewedOn: '2025-05-10T09:15:00Z',
      rating: 92,
      status: 'approved'
    },
    {
      id: 'cr2',
      subject: 'Computer Networks',
      paperSetter: 'Prof. Priya Mehta',
      reviewedOn: '2025-05-08T11:30:00Z',
      rating: 88,
      status: 'approved'
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-2xl font-bold mb-2">Subject Expert Dashboard</h1>
        <p className="text-gray-600">
          Review question papers and maintain quality standards.
        </p>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Papers Reviewed</p>
              <h3 className="text-2xl font-bold">24</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              <FileText size={24} className="text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Average Rating</p>
              <h3 className="text-2xl font-bold">90%</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-warning-100 flex items-center justify-center">
              <Star size={24} className="text-warning-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Pending Reviews</p>
              <h3 className="text-2xl font-bold">3</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center">
              <Clock size={24} className="text-secondary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Earnings</p>
              <h3 className="text-2xl font-bold">₹12,000</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-success-100 flex items-center justify-center">
              <DollarSign size={24} className="text-success-600" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pending Reviews Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Pending Reviews</h2>
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="divide-y">
            {pendingReviews.map((review) => (
              <div key={review.id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{review.subject}</h3>
                    <p className="text-gray-600 text-sm">Set by: {review.paperSetter}</p>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    review.status === 'pending'
                      ? 'bg-warning-100 text-warning-700'
                      : 'bg-primary-100 text-primary-700'
                  }`}>
                    {review.status === 'pending' ? 'Pending' : 'In Progress'}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={16} className="mr-1" />
                    <span>
                      Submitted: {new Date(review.submittedOn).toLocaleDateString()}
                    </span>
                    <span className="mx-2">•</span>
                    <span>
                      Due: {new Date(review.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <Button 
                    size="sm"
                    onClick={() => {
                      // Handle review action
                    }}
                  >
                    Start Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Completed Reviews Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-4">Completed Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {completedReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-card p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold">{review.subject}</h3>
                  <p className="text-gray-600 text-sm">Set by: {review.paperSetter}</p>
                </div>
                <div className="flex items-center">
                  <Star size={16} className="text-warning-500 mr-1" />
                  <span className="font-medium">{review.rating}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle size={16} className="text-success-500 mr-1" />
                  <span>
                    Reviewed on {new Date(review.reviewedOn).toLocaleDateString()}
                  </span>
                </div>
                
                <Button 
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    // Handle view details action
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SubjectExpertDashboard;