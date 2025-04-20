import { CheckCircle, Clock, FileText, AlertTriangle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';

const PaperGetterDashboard = () => {
  const { user } = useAuth();

  // Mock data for dashboard statistics
  const stats = {
    totalRequests: 8,
    pendingApproval: 2,
    approved: 5,
    rejected: 1,
  };

  // Mock data for recent activities
  const recentRequests = [
    {
      id: 1,
      subject: 'Operating Systems',
      date: '2023-05-15T14:30:00Z',
      status: 'approved',
      examDate: '2023-06-15T09:00:00Z',
    },
    {
      id: 2, 
      subject: 'Computer Architecture',
      date: '2023-05-10T09:15:00Z',
      status: 'pending',
      examDate: '2023-06-10T09:00:00Z',
    },
    {
      id: 3,
      subject: 'Software Engineering',
      date: '2023-05-05T16:45:00Z',
      status: 'rejected',
      feedback: 'Request format incorrect. Please resubmit with proper syllabus document.',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
      
      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link to="/paper-getter/request-paper" className="block">
          <div className="card p-6 transition-all hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
              <FileText size={24} />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Request New Paper</h3>
            <p className="text-gray-600">Create a new question paper request with your requirements</p>
          </div>
        </Link>
        
        <Link to="/paper-getter/select-faculty" className="block">
          <div className="card p-6 transition-all hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-100 text-secondary-600">
              <Search size={24} />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Select Faculty</h3>
            <p className="text-gray-600">Browse and select faculty members for your paper requests</p>
          </div>
        </Link>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">Total Requests</h3>
            <FileText className="h-6 w-6 text-primary-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalRequests}</p>
        </div>
        
        <div className="card p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">Pending</h3>
            <Clock className="h-6 w-6 text-accent-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.pendingApproval}</p>
        </div>
        
        <div className="card p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">Approved</h3>
            <CheckCircle className="h-6 w-6 text-success-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.approved}</p>
        </div>
        
        <div className="card p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">Rejected</h3>
            <AlertTriangle className="h-6 w-6 text-error-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.rejected}</p>
        </div>
      </div>
      
      {/* Recent requests */}
      <div className="card">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Paper Requests</h2>
          <Link to="/paper-getter/paper-status">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>
        <div className="divide-y divide-gray-200">
          {recentRequests.map((request) => (
            <div key={request.id} className="px-6 py-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{request.subject}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Requested on {new Date(request.date).toLocaleDateString()}
                    {request.examDate && (
                      <> · Exam date: {new Date(request.examDate).toLocaleDateString()}</>
                    )}
                  </p>
                  {request.status === 'rejected' && request.feedback && (
                    <p className="mt-2 rounded-md bg-error-50 p-2 text-sm text-error-700">
                      {request.feedback}
                    </p>
                  )}
                </div>
                <div>
                  {request.status === 'approved' && (
                    <span className="inline-flex items-center rounded-full bg-success-50 px-2.5 py-0.5 text-xs font-medium text-success-700">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Approved
                    </span>
                  )}
                  {request.status === 'pending' && (
                    <span className="inline-flex items-center rounded-full bg-accent-50 px-2.5 py-0.5 text-xs font-medium text-accent-700">
                      <Clock className="mr-1 h-3 w-3" />
                      Pending
                    </span>
                  )}
                  {request.status === 'rejected' && (
                    <span className="inline-flex items-center rounded-full bg-error-50 px-2.5 py-0.5 text-xs font-medium text-error-700">
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      Rejected
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaperGetterDashboard;