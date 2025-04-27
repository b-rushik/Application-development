import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Download, Star, CheckCircle, Clock, DollarSign } from 'lucide-react';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

const PaperGetterDashboard = () => {
  // Mock data - would come from API in real implementation
  const upcomingExams = [
    {
      id: 'e1',
      subject: 'Data Structures and Algorithms',
      date: '2025-06-15',
      daysLeft: 10,
      status: 'paper_ready',
      paperSetter: 'Dr. Rajat Sharma'
    },
    {
      id: 'e2',
      subject: 'Database Management Systems',
      date: '2025-06-20',
      daysLeft: 15,
      status: 'in_review',
      paperSetter: 'Prof. Amit Verma'
    },
    {
      id: 'e3',
      subject: 'Computer Networks',
      date: '2025-07-10',
      daysLeft: 35,
      status: 'in_progress',
      paperSetter: 'Dr. Priya Mehta'
    }
  ];
  
  const recentPapers = [
    {
      id: 'p1',
      subject: 'Object Oriented Programming',
      examDate: '2025-05-10',
      downloadedOn: '2025-05-10T08:30:00Z',
      rating: 4.8
    },
    {
      id: 'p2',
      subject: 'Operating Systems',
      examDate: '2025-05-05',
      downloadedOn: '2025-05-05T09:15:00Z',
      rating: 4.5
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-2xl font-bold mb-2">Paper Getter Dashboard</h1>
        <p className="text-gray-600">
          Request exam papers, check status, and download papers when ready.
        </p>
      </motion.div>
      
      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-card p-6"
      >
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/paper-getter/request-paper" className="block">
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-primary-300 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-3">
                <FileText size={24} className="text-primary-600" />
              </div>
              <h3 className="font-medium">Request New Paper</h3>
              <p className="text-sm text-gray-600 mt-1">Create a new paper request</p>
            </div>
          </Link>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-secondary-300 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mb-3">
              <Clock size={24} className="text-secondary-600" />
            </div>
            <h3 className="font-medium">Check Status</h3>
            <p className="text-sm text-gray-600 mt-1">View ongoing requests</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-accent-300 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center mb-3">
              <DollarSign size={24} className="text-accent-600" />
            </div>
            <h3 className="font-medium">Payment History</h3>
            <p className="text-sm text-gray-600 mt-1">View your payment records</p>
          </div>
        </div>
      </motion.div>
      
      {/* Upcoming Exams Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Upcoming Exams</h2>
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="divide-y">
            {upcomingExams.map((exam) => (
              <div key={exam.id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{exam.subject}</h3>
                    <p className="text-gray-600 text-sm">Paper by: {exam.paperSetter}</p>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    exam.status === 'paper_ready' 
                      ? 'bg-success-100 text-success-700' 
                      : exam.status === 'in_review'
                      ? 'bg-warning-100 text-warning-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {exam.status === 'paper_ready' && 'Paper Ready'}
                    {exam.status === 'in_review' && 'In Review'}
                    {exam.status === 'in_progress' && 'In Progress'}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={16} className="mr-1" />
                    <span>Exam Date: {new Date(exam.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{exam.daysLeft} days left</span>
                  </div>
                  
                  {exam.status === 'paper_ready' && (
                    <Button 
                      size="sm"
                      leftIcon={<Download size={16} />}
                      onClick={() => {
                        // Handle download action
                      }}
                    >
                      Download Paper
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Recent Papers Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-4">Recently Downloaded Papers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentPapers.map((paper) => (
            <div key={paper.id} className="bg-white rounded-lg shadow-card p-5">
              <h3 className="font-semibold">{paper.subject}</h3>
              <p className="text-gray-600 text-sm mb-3">
                Exam Date: {new Date(paper.examDate).toLocaleDateString()}
              </p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Star size={16} className="text-warning-500 mr-1" />
                  <span className="font-medium">{paper.rating}/5</span>
                </div>
                
                <div className="flex text-sm text-gray-500">
                  <CheckCircle size={16} className="text-success-500 mr-1" />
                  <span>Downloaded on {new Date(paper.downloadedOn).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PaperGetterDashboard;