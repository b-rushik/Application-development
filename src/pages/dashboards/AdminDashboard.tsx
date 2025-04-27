import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Star, AlertCircle, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import Button from '../../components/common/Button';

const AdminDashboard = () => {
  // Mock data - would come from API in real implementation
  const paperSetters = [
    {
      id: 'ps1',
      name: 'Dr. Rajat Kumar',
      organizationId: 'IIT001',
      subject: 'Data Structures',
      mobile: '+91 98765 43210',
      paymentStatus: 'pending',
      examDate: '2025-06-15',
      verified: true,
      rating: 4.8
    },
    {
      id: 'ps2',
      name: 'Prof. Meera Singh',
      organizationId: 'CENT002',
      subject: 'Database Systems',
      mobile: '+91 98765 43211',
      paymentStatus: 'completed',
      examDate: '2025-06-20',
      verified: false,
      rating: 4.5
    }
  ];

  const paperGetters = [
    {
      id: 'pg1',
      name: 'ABC University',
      organizationId: 'UNI001',
      subject: 'Data Structures',
      mobile: '+91 98765 43212',
      paymentStatus: 'completed',
      examDate: '2025-06-15'
    },
    {
      id: 'pg2',
      name: 'XYZ College',
      organizationId: 'COL002',
      subject: 'Database Systems',
      mobile: '+91 98765 43213',
      paymentStatus: 'pending',
      examDate: '2025-06-20'
    }
  ];

  const subjectExperts = [
    {
      id: 'se1',
      name: 'Dr. Priya Mehta',
      subjects: ['Data Structures', 'Algorithms'],
      email: 'priya.mehta@gyaan-kriti.com',
      mobile: '+91 98765 43214',
      papersReviewed: 15,
      rating: 4.9
    },
    {
      id: 'se2',
      name: 'Prof. Amit Verma',
      subjects: ['Database Systems', 'Big Data'],
      email: 'amit.verma@gyaan-kriti.com',
      mobile: '+91 98765 43215',
      papersReviewed: 12,
      rating: 4.7
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage users, review papers, and oversee system operations.
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
              <p className="text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold">256</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              <Users size={24} className="text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Active Papers</p>
              <h3 className="text-2xl font-bold">42</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center">
              <FileText size={24} className="text-secondary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Pending Reviews</p>
              <h3 className="text-2xl font-bold">15</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-warning-100 flex items-center justify-center">
              <AlertCircle size={24} className="text-warning-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold">₹1.2L</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-success-100 flex items-center justify-center">
              <DollarSign size={24} className="text-success-600" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Paper Setters Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Paper Setters</h2>
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name & ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paperSetters.map((setter) => (
                  <tr key={setter.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium">{setter.name}</div>
                        <div className="text-sm text-gray-500">{setter.organizationId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div>{setter.subject}</div>
                        <div className="text-sm text-gray-500">
                          Exam: {new Date(setter.examDate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {setter.mobile}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {setter.verified ? (
                          <CheckCircle size={16} className="text-success-500 mr-1" />
                        ) : (
                          <XCircle size={16} className="text-error-500 mr-1" />
                        )}
                        <span className={setter.verified ? 'text-success-700' : 'text-error-700'}>
                          {setter.verified ? 'Verified' : 'Pending'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Button
                        size="sm"
                        variant={setter.verified ? 'outline' : 'primary'}
                        onClick={() => {
                          // Handle verification action
                        }}
                      >
                        {setter.verified ? 'View Details' : 'Verify'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Subject Experts Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-4">Subject Experts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjectExperts.map((expert) => (
            <div key={expert.id} className="bg-white rounded-lg shadow-card p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{expert.name}</h3>
                  <p className="text-gray-600 text-sm">{expert.email}</p>
                </div>
                <div className="flex items-center">
                  <Star size={16} className="text-warning-500 mr-1" />
                  <span className="font-medium">{expert.rating}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="text-sm">
                  <span className="text-gray-500">Subjects: </span>
                  {expert.subjects.join(', ')}
                </div>
                <div className="text-sm mt-1">
                  <span className="text-gray-500">Papers Reviewed: </span>
                  {expert.papersReviewed}
                </div>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">{expert.mobile}</span>
                <Button size="sm" variant="outline">Manage Access</Button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;