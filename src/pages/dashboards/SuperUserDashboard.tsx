import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Database, Settings, Search, Download, Filter, MoreVertical } from 'lucide-react';
import Button from '../../components/common/Button';

const SuperUserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - would come from API in real implementation
  const users = [
    {
      id: 'u1',
      name: 'Dr. Rajat Kumar',
      role: 'paper_setter',
      email: 'rajat.kumar@university.edu',
      status: 'active',
      lastActive: '2025-05-15T10:30:00Z'
    },
    {
      id: 'u2',
      name: 'ABC University',
      role: 'paper_getter',
      email: 'exam.cell@abc.edu',
      status: 'active',
      lastActive: '2025-05-14T15:45:00Z'
    },
    {
      id: 'u3',
      name: 'Prof. Priya Mehta',
      role: 'subject_expert',
      email: 'priya.mehta@gyaan-kriti.com',
      status: 'active',
      lastActive: '2025-05-13T09:20:00Z'
    },
    {
      id: 'u4',
      name: 'John Admin',
      role: 'admin',
      email: 'john.admin@gyaan-kriti.com',
      status: 'inactive',
      lastActive: '2025-05-10T14:30:00Z'
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-2xl font-bold mb-2">Super User Dashboard</h1>
        <p className="text-gray-600">
          System-wide administration and management console.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold">1,234</h3>
              <p className="text-sm text-success-500 mt-1">↑ 12% this month</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              <Users size={24} className="text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Database Size</p>
              <h3 className="text-2xl font-bold">2.4 GB</h3>
              <p className="text-sm text-warning-500 mt-1">70% capacity</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center">
              <Database size={24} className="text-secondary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">System Status</p>
              <h3 className="text-2xl font-bold">Healthy</h3>
              <p className="text-sm text-success-500 mt-1">All services up</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-success-100 flex items-center justify-center">
              <Settings size={24} className="text-success-600" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* User Management Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="p-5 border-b">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">User Management</h2>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Filter size={16} />}
                  >
                    Filter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Download size={16} />}
                  >
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'paper_setter' ? 'bg-blue-100 text-blue-800' :
                        user.role === 'paper_getter' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.role.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'active' ? 'bg-success-100 text-success-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.lastActive).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-gray-400 hover:text-gray-500">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-4 border-t">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing 1 to 4 of 4 entries
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded text-sm disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 border rounded text-sm disabled:opacity-50" disabled>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SuperUserDashboard;