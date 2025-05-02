import { CheckCircle, AlertTriangle, FileText, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  // Mock data for dashboard statistics
  const stats = {
    totalUsers: 45,
    pendingVerification: 8,
    paperRequests: 12,
    pendingApproval: 5,
  };

  // Mock data for recent users
  const recentUsers = [
    {
      id: '1',
      name: 'Dr. Ramesh Kumar',
      email: 'ramesh@gmail.com',
      role: 'paperSetter',
      status: 'pending',
      joinedAt: '2023-05-15T14:30:00Z',
    },
    {
      id: '2',
      name: 'Exam Cell, ABC College',
      email: 'examcell@abc.edu',
      role: 'paperGetter',
      status: 'verified',
      joinedAt: '2023-05-12T09:15:00Z',
    },
    {
      id: '3',
      name: 'Prof. Sunita Sharma',
      email: 'sunita@yahoo.com',
      role: 'paperSetter',
      status: 'pending',
      joinedAt: '2023-05-10T16:45:00Z',
    },
  ];

  // Mock data for recent papers
  const recentPapers = [
    {
      id: '1',
      subject: 'Data Structures',
      requester: 'Exam Cell, XYZ University',
      setter: 'Dr. Ramesh Kumar',
      status: 'pending',
      rating: null,
      submittedAt: '2023-05-14T14:30:00Z',
    },
    {
      id: '2',
      subject: 'Computer Networks',
      requester: 'Exam Cell, ABC College',
      setter: 'Prof. Sunita Sharma',
      status: 'approved',
      rating: 85,
      submittedAt: '2023-05-10T09:15:00Z',
    },
    {
      id: '3',
      subject: 'Database Management',
      requester: 'Exam Cell, PQR University',
      setter: 'Dr. Anand Verma',
      status: 'rejected',
      rating: 65,
      submittedAt: '2023-05-07T16:45:00Z',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Admin</h1>
        <Link 
          to="/super-user" 
          className="mt-4 inline-flex items-center rounded-md bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-100 sm:mt-0"
        >
          Super User Access
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">Total Users</h3>
            <Users className="h-6 w-6 text-primary-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
        </div>
        
        <div className="card p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">Pending Verification</h3>
            <AlertTriangle className="h-6 w-6 text-warning-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.pendingVerification}</p>
        </div>
        
        <div className="card p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">Paper Requests</h3>
            <FileText className="h-6 w-6 text-primary-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.paperRequests}</p>
        </div>
        
        <div className="card p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">Pending Approval</h3>
            <AlertTriangle className="h-6 w-6 text-warning-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.pendingApproval}</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Users */}
        <div className="card">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Users</h2>
            <Link to="/admin/manage-users" className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentUsers.map((user) => (
              <div key={user.id} className="px-6 py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {user.email} · {user.role === 'paperSetter' ? 'Paper Setter' : 'Paper Getter'}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Joined on {new Date(user.joinedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    {user.status === 'verified' ? (
                      <span className="inline-flex items-center rounded-full bg-success-50 px-2.5 py-0.5 text-xs font-medium text-success-700">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-warning-50 px-2.5 py-0.5 text-xs font-medium text-warning-700">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Papers */}
        <div className="card">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Papers</h2>
            <Link to="/admin/evaluate-papers" className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentPapers.map((paper) => (
              <div key={paper.id} className="px-6 py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{paper.subject}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Requester: {paper.requester}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Setter: {paper.setter}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Submitted on {new Date(paper.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    {paper.status === 'approved' ? (
                      <span className="inline-flex items-center rounded-full bg-success-50 px-2.5 py-0.5 text-xs font-medium text-success-700">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Approved
                      </span>
                    ) : paper.status === 'rejected' ? (
                      <span className="inline-flex items-center rounded-full bg-error-50 px-2.5 py-0.5 text-xs font-medium text-error-700">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Rejected
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-warning-50 px-2.5 py-0.5 text-xs font-medium text-warning-700">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Pending
                      </span>
                    )}
                    {paper.rating !== null && (
                      <span className={`mt-2 text-sm font-medium ${
                        paper.rating >= 70 ? 'text-success-600' : 'text-error-600'
                      }`}>
                        Rating: {paper.rating}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;