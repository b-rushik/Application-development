import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Clock, FileCheck, AlertCircle } from 'lucide-react';
import Button from '../../components/common/Button';

const PaperSetterDashboard = () => {
  const [loading, setLoading] = useState(false);
  
  // Mock data - would come from API in real implementation
  const upcomingPapers = [
    {
      id: 'p1',
      subject: 'Data Structures and Algorithms',
      requestedBy: 'ABC University',
      deadline: '2025-06-15',
      daysLeft: 10,
      status: 'pending'
    },
    {
      id: 'p2',
      subject: 'Database Management Systems',
      requestedBy: 'XYZ College',
      deadline: '2025-06-20',
      daysLeft: 15,
      status: 'pending'
    }
  ];
  
  const recentActivity = [
    {
      id: 'a1',
      type: 'paper_uploaded',
      subject: 'Computer Networks',
      timestamp: '2025-05-15T10:30:00Z',
      status: 'under_review'
    },
    {
      id: 'a2',
      type: 'paper_reviewed',
      subject: 'Operating Systems',
      timestamp: '2025-05-10T14:45:00Z',
      status: 'approved',
      rating: 92
    },
    {
      id: 'a3',
      type: 'payment_received',
      subject: 'Operating Systems',
      timestamp: '2025-05-11T09:15:00Z',
      amount: 5000
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-2xl font-bold mb-2">Welcome to your Dashboard</h1>
        <p className="text-gray-600">
          Manage your question papers, check updates, and track your payment status.
        </p>
      </motion.div>
      
      {/* Upcoming Papers Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {upcomingPapers.map((paper) => (
          <div key={paper.id} className="bg-white rounded-lg shadow-card p-5 border border-l-4 border-l-primary-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{paper.subject}</h3>
                <p className="text-gray-600 text-sm">Requested by: {paper.requestedBy}</p>
              </div>
              <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                {paper.daysLeft} days left
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={16} className="mr-1" />
                <span>Due: {new Date(paper.deadline).toLocaleDateString()}</span>
              </div>
              
              <Button 
                size="sm"
                leftIcon={<Upload size={16} />}
                onClick={() => {
                  // Handle upload action
                }}
              >
                Upload Paper
              </Button>
            </div>
          </div>
        ))}
      </motion.div>
      
      {/* Recent Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="divide-y">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start">
                  <div className="mr-4">
                    {activity.type === 'paper_uploaded' && (
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <Upload size={20} className="text-primary-600" />
                      </div>
                    )}
                    {activity.type === 'paper_reviewed' && (
                      <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center">
                        <FileCheck size={20} className="text-success-500" />
                      </div>
                    )}
                    {activity.type === 'payment_received' && (
                      <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                        <AlertCircle size={20} className="text-accent-600" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">
                        {activity.type === 'paper_uploaded' && 'Paper Uploaded'}
                        {activity.type === 'paper_reviewed' && 'Paper Reviewed'}
                        {activity.type === 'payment_received' && 'Payment Received'}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mt-1">{activity.subject}</p>
                    
                    {activity.type === 'paper_reviewed' && (
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Rating:</span>{' '}
                        <span className={`${
                          activity.rating >= 90 ? 'text-success-500' : 
                          activity.rating >= 75 ? 'text-warning-500' : 
                          'text-error-500'
                        }`}>
                          {activity.rating}/100
                        </span>
                      </div>
                    )}
                    
                    {activity.type === 'payment_received' && activity.amount && (
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Amount:</span>{' '}
                        <span className="text-success-500">₹{activity.amount}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Statistics Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-white rounded-lg shadow-card p-5">
          <h3 className="text-gray-500 font-medium mb-2">Total Papers Set</h3>
          <p className="text-3xl font-bold text-primary-600">12</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-5">
          <h3 className="text-gray-500 font-medium mb-2">Average Rating</h3>
          <p className="text-3xl font-bold text-success-500">89/100</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-5">
          <h3 className="text-gray-500 font-medium mb-2">Earnings</h3>
          <p className="text-3xl font-bold text-accent-500">₹25,000</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PaperSetterDashboard;