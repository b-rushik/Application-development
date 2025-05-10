import { useState } from 'react';
import { User, Shield, CheckCircle, AlertTriangle, Search, Filter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { UserRole } from '../../types';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'pending' | 'verified' | 'rejected';
  organization?: string;
  joinedAt: string;
  lastActive?: string;
}

const ManageUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Mock users data
  const users: UserData[] = [
    {
      id: '1',
      name: 'Dr. Ramesh Kumar',
      email: 'ramesh.kumar@university.edu',
      role: 'paperSetter',
      status: 'verified',
      organization: 'IIT Mumbai',
      joinedAt: '2024-01-15T14:30:00Z',
      lastActive: '2024-02-20T09:15:00Z',
    },
    {
      id: '2',
      name: 'Exam Cell, ABC College',
      email: 'examcell@abc.edu',
      role: 'paperGetter',
      status: 'pending',
      organization: 'ABC College',
      joinedAt: '2024-02-18T10:20:00Z',
    },
    {
      id: '3',
      name: 'Prof. Sunita Sharma',
      email: 'sunita.sharma@college.edu',
      role: 'paperSetter',
      status: 'rejected',
      organization: 'XYZ University',
      joinedAt: '2024-02-10T16:45:00Z',
    },
    {
      id: '4',
      name: 'John Admin',
      email: 'john.admin@system.edu',
      role: 'admin',
      status: 'verified',
      organization: 'System Administration',
      joinedAt: '2023-12-01T09:00:00Z',
      lastActive: '2024-02-20T11:30:00Z',
    },
  ];

  // Filter users based on search query and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.organization?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleVerify = async (userId: string, action: 'verify' | 'reject') => {
    setIsVerifying(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(
        action === 'verify' 
          ? 'User verified successfully!' 
          : 'User rejected successfully!'
      );
    } catch (error) {
      toast.error('Failed to update user status');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSendReminder = async (email: string) => {
    try {
      // Simulate sending reminder email
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Reminder email sent successfully!');
    } catch (error) {
      toast.error('Failed to send reminder email');
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-5 w-5 text-primary-500" />;
      case 'paperSetter':
      case 'paperGetter':
        return <User className="h-5 w-5 text-secondary-500" />;
      default:
        return <User className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: UserData['status']) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center rounded-full bg-success-50 px-2.5 py-0.5 text-xs font-medium text-success-700">
            <CheckCircle className="mr-1 h-3 w-3" />
            Verified
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
            Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Total Users: {users.length}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="form-label flex items-center">
              <Search size={18} className="mr-2 text-gray-500" />
              Search Users
            </label>
            <Input
              type="text"
              placeholder="Search by name, email, or organization"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label flex items-center">
              <User size={18} className="mr-2 text-gray-500" />
              Filter by Role
            </label>
            <select
              className="form-input"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="paperSetter">Paper Setter</option>
              <option value="paperGetter">Paper Getter</option>
              <option value="admin">Admin</option>
            </select>
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
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card overflow-hidden"
          >
            <div className="border-b border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getRoleIcon(user.role)}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                {getStatusBadge(user.status)}
              </div>
            </div>

            <div className="p-4">
              <div className="mb-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium text-gray-900">
                    {user.role === 'paperSetter' ? 'Paper Setter' :
                     user.role === 'paperGetter' ? 'Paper Getter' :
                     'Administrator'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Organization</p>
                  <p className="font-medium text-gray-900">{user.organization || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="font-medium text-gray-900">
                    {new Date(user.joinedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {user.lastActive && (
                <p className="mb-4 text-sm text-gray-500">
                  Last active: {new Date(user.lastActive).toLocaleString()}
                </p>
              )}

              <div className="flex justify-end space-x-3">
                {user.status === 'pending' && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => handleSendReminder(user.email)}
                      icon={<Mail size={18} />}
                    >
                      Send Reminder
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleVerify(user.id, 'reject')}
                      isLoading={isVerifying}
                      className="text-error-600 hover:bg-error-50 hover:text-error-700"
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleVerify(user.id, 'verify')}
                      isLoading={isVerifying}
                    >
                      Verify User
                    </Button>
                  </>
                )}
                {user.status === 'rejected' && (
                  <Button
                    onClick={() => handleVerify(user.id, 'verify')}
                    isLoading={isVerifying}
                  >
                    Approve User
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="card p-8 text-center">
            <p className="text-gray-500">No users found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;