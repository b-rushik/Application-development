import { CheckCircle, Clock, FileText, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PaperSetterDashboard = () => {
  const { user } = useAuth();

  // Mock data for dashboard statistics
  const stats = {
    totalPapers: 12,
    pendingPapers: 3,
    completedPapers: 9,
    upcomingDeadlines: 2,
  };

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'upload',
      subject: 'Data Structures & Algorithms',
      date: '2023-05-15T14:30:00Z',
      status: 'approved',
    },
    {
      id: 2, 
      type: 'request',
      subject: 'Database Management Systems',
      date: '2023-05-10T09:15:00Z',
      status: 'pending',
      deadline: '2023-05-20T23:59:59Z',
    },
    {
      id: 3,
      type: 'upload',
      subject: 'Computer Networks',
      date: '2023-05-05T16:45:00Z',
      status: 'rejected',
      feedback: 'Need more advanced problems. Please revise.',
    },
  ];

  // Calculate completion percentage for verification status
  const profileCompletion = user?.isVerified 
    ? 100 
    : (user?.organizationName && user?.branch && user?.subjects) 
      ? 80 
      : 40;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
      
      {/* Profile completion card */}
      <div className="card p-6">
        <h2 className="mb-4 text-xl font-semibold">Profile Completion</h2>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {profileCompletion < 100 
              ? 'Complete your profile to get verified' 
              : 'Your profile is complete and verified'}
          </span>
          <span className="text-sm font-medium">{profileCompletion}%</span>
        </div>
        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div 
            className={`h-full rounded-full ${
              profileCompletion === 100 
                ? 'bg-success-500' 
                : profileCompletion >= 80 
                  ? 'bg-accent-500' 
                  : 'bg-primary-500'
            }`}
            style={{ width: `${profileCompletion}%` }}
          ></div>
        </div>
        {profileCompletion < 100 && (
          <Link to="/paper-setter/personal-details">
            <button className="btn btn-primary">Complete Profile</button>
          </Link>
        )}
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">Total Papers</h3>
            <FileText className="h-6 w-6 text-primary-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalPapers}</p>
        </div>
        
        <div className="card p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">Pending</h3>
            <Clock className="h-6 w-6 text-accent-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.pendingPapers}</p>
        </div>
        
        <div className="card p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">Completed</h3>
            <CheckCircle className="h-6 w-6 text-success-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.completedPapers}</p>
        </div>
        
        <div className="card p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">Upcoming</h3>
            <AlertTriangle className="h-6 w-6 text-warning-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.upcomingDeadlines}</p>
        </div>
      </div>
      
      {/* Recent activities */}
      <div className="card">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Activities</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="px-6 py-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{activity.subject}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {activity.type === 'upload' ? 'You uploaded a paper' : 'New paper request'}
                    {' · '}
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                  {activity.status === 'rejected' && activity.feedback && (
                    <p className="mt-2 rounded-md bg-error-50 p-2 text-sm text-error-700">
                      {activity.feedback}
                    </p>
                  )}
                </div>
                <div>
                  {activity.status === 'approved' && (
                    <span className="inline-flex items-center rounded-full bg-success-50 px-2.5 py-0.5 text-xs font-medium text-success-700">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Approved
                    </span>
                  )}
                  {activity.status === 'pending' && (
                    <span className="inline-flex items-center rounded-full bg-accent-50 px-2.5 py-0.5 text-xs font-medium text-accent-700">
                      <Clock className="mr-1 h-3 w-3" />
                      Pending
                    </span>
                  )}
                  {activity.status === 'rejected' && (
                    <span className="inline-flex items-center rounded-full bg-error-50 px-2.5 py-0.5 text-xs font-medium text-error-700">
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      Needs Revision
                    </span>
                  )}
                </div>
              </div>
              {activity.deadline && (
                <div className="mt-2 flex items-center text-sm text-warning-700">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>Deadline: {new Date(activity.deadline).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaperSetterDashboard;