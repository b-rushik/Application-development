import { useState } from 'react';
import { Bell, Calendar, Clock, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Update {
  id: string;
  type: 'deadline' | 'feedback' | 'approval' | 'rejection';
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  deadline?: string;
  subject?: string;
  rating?: number;
}

const Updates = () => {
  const [updates] = useState<Update[]>([
    {
      id: '1',
      type: 'deadline',
      title: 'New Question Paper Request',
      message: 'You have been selected to create a question paper for Operating Systems.',
      date: '2024-02-20T09:00:00Z',
      isRead: false,
      deadline: '2024-03-15T23:59:59Z',
      subject: 'Operating Systems'
    },
    {
      id: '2',
      type: 'feedback',
      title: 'Revision Required',
      message: 'Please review and address the feedback for Computer Networks paper.',
      date: '2024-02-18T14:30:00Z',
      isRead: true,
      deadline: '2024-02-21T18:00:00Z',
      subject: 'Computer Networks'
    },
    {
      id: '3',
      type: 'approval',
      title: 'Paper Approved',
      message: 'Your Database Management Systems paper has been approved.',
      date: '2024-02-15T11:20:00Z',
      isRead: true,
      subject: 'Database Management Systems',
      rating: 85
    },
    {
      id: '4',
      type: 'rejection',
      title: 'Paper Needs Revision',
      message: 'Your Data Structures paper requires significant revisions. Please check the detailed feedback.',
      date: '2024-02-12T16:45:00Z',
      isRead: true,
      subject: 'Data Structures',
      rating: 65
    }
  ]);

  const getUpdateIcon = (type: Update['type']) => {
    switch (type) {
      case 'deadline':
        return <Clock className="h-6 w-6 text-primary-500" />;
      case 'feedback':
        return <AlertTriangle className="h-6 w-6 text-warning-500" />;
      case 'approval':
        return <CheckCircle className="h-6 w-6 text-success-500" />;
      case 'rejection':
        return <AlertTriangle className="h-6 w-6 text-error-500" />;
      default:
        return <Bell className="h-6 w-6 text-gray-400" />;
    }
  };

  const getUpdateClass = (type: Update['type']) => {
    switch (type) {
      case 'deadline':
        return 'border-l-primary-500 bg-primary-50';
      case 'feedback':
        return 'border-l-warning-500 bg-warning-50';
      case 'approval':
        return 'border-l-success-500 bg-success-50';
      case 'rejection':
        return 'border-l-error-500 bg-error-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Updates</h1>
        <div className="flex items-center space-x-4">
          <select className="form-input text-sm">
            <option value="all">All Updates</option>
            <option value="unread">Unread</option>
            <option value="deadlines">Deadlines</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {updates.map((update) => (
          <motion.div
            key={update.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`card border-l-4 ${getUpdateClass(update.type)} ${
              !update.isRead ? 'ring-2 ring-primary-500 ring-opacity-50' : ''
            }`}
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">{getUpdateIcon(update.type)}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{update.title}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(update.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {update.subject && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FileText className="h-4 w-4" />
                      <span>{update.subject}</span>
                    </div>
                  )}
                  
                  <p className="text-gray-600">{update.message}</p>
                  
                  {update.deadline && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-warning-500" />
                      <span className="font-medium text-warning-700">
                        Deadline: {new Date(update.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  
                  {update.rating && (
                    <div className="mt-2 flex items-center space-x-2">
                      <span className={`text-sm font-medium ${
                        update.rating >= 70 ? 'text-success-600' : 'text-error-600'
                      }`}>
                        Rating: {update.rating}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Updates;