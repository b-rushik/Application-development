import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, User, FileText, FileCheck, AlertTriangle,
  CalendarClock, ArrowRight, Check
} from 'lucide-react';

const PaperSetterHome: React.FC = () => {
  const [userName, setUserName] = useState('John Smith');
  const [isVerified, setIsVerified] = useState(true);
  const [rating, setRating] = useState(4.5);
  const [organizationId, setOrganizationId] = useState('PS12345');
  const [pendingPapers, setPendingPapers] = useState(2);
  const [completedPapers, setCompletedPapers] = useState(5);
  
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Stats for display
  const stats = [
    {
      name: 'Pending Papers',
      value: pendingPapers,
      icon: <FileText size={20} className="text-accent-500" />,
      color: 'bg-accent-50 text-accent-700',
    },
    {
      name: 'Completed Papers',
      value: completedPapers,
      icon: <FileCheck size={20} className="text-success-500" />,
      color: 'bg-success-50 text-success-700',
    },
    {
      name: 'Verification Status',
      value: isVerified ? 'Verified' : 'Pending',
      icon: isVerified ? <Check size={20} className="text-success-500" /> : <AlertTriangle size={20} className="text-warning-500" />,
      color: isVerified ? 'bg-success-50 text-success-700' : 'bg-warning-50 text-warning-700',
    },
    {
      name: 'Your Rating',
      value: rating.toFixed(1) + '/5',
      icon: <User size={20} className="text-primary-500" />,
      color: 'bg-primary-50 text-primary-700',
    },
  ];
  
  // Notifications or alerts
  const alerts = [
    {
      title: 'Paper Request',
      description: 'You have a new paper request for Database Management Systems',
      date: '1 day ago',
      link: '/paper-setter/updates',
    },
    {
      title: 'Upcoming Deadline',
      description: 'Computer Networks paper due in 3 days',
      date: '2 days ago',
      link: '/paper-setter/updates',
    },
  ];
  
  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">{currentDate}</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="mr-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
              {userName.split(' ').map(name => name[0]).join('')}
            </div>
          </div>
          <div>
            <p className="font-medium text-gray-900">{userName}</p>
            <p className="text-sm text-gray-500">ID: {organizationId}</p>
          </div>
        </motion.div>
      </div>
      
      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-md ${stat.color.split(' ')[0]}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className={`text-xl font-semibold ${stat.color.split(' ')[1]}`}>{stat.value}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Alerts and Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
          <h2 className="font-semibold text-gray-800 flex items-center">
            <BellRing size={18} className="mr-2 text-primary-600" />
            Recent Notifications
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {alerts.map((alert, index) => (
            <div key={index} className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{alert.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                  <span className="text-xs text-gray-500 mt-2 inline-block">{alert.date}</span>
                </div>
                <Link 
                  to={alert.link} 
                  className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium"
                >
                  View
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 bg-gray-50 px-5 py-3">
          <Link 
            to="/paper-setter/updates" 
            className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center justify-center"
          >
            View all notifications
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </motion.div>
      
      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
          <h2 className="font-semibold text-gray-800">Quick Actions</h2>
        </div>
        
        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/paper-setter/updates" 
            className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3">
              <FileText size={24} className="text-primary-600" />
            </div>
            <span className="font-medium text-gray-900">View Requests</span>
          </Link>
          
          <Link 
            to="/paper-setter/personal-details" 
            className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mb-3">
              <User size={24} className="text-secondary-600" />
            </div>
            <span className="font-medium text-gray-900">Update Profile</span>
          </Link>
          
          <Link 
            to="/paper-setter/payment" 
            className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mb-3">
              <CreditCard size={24} className="text-accent-600" />
            </div>
            <span className="font-medium text-gray-900">Payment Status</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

// Components used in the file
const BellRing = CalendarClock;
const CreditCard = FileCheck;

export default PaperSetterHome;