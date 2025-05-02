import { useState } from 'react';
import { FileText, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';

interface HistoryEntry {
  id: string;
  subject: string;
  date: string;
  status: 'approved' | 'rejected' | 'pending';
  rating?: number;
  feedback?: string;
  requestedBy: string;
}

const History = () => {
  const [historyEntries] = useState<HistoryEntry[]>([
    {
      id: '1',
      subject: 'Data Structures',
      date: '2024-02-15T14:30:00Z',
      status: 'approved',
      rating: 85,
      requestedBy: 'ABC University'
    },
    {
      id: '2',
      subject: 'Computer Networks',
      date: '2024-02-10T09:15:00Z',
      status: 'rejected',
      rating: 65,
      feedback: 'Questions need to be more challenging. Please include more analytical problems.',
      requestedBy: 'XYZ College'
    },
    {
      id: '3',
      subject: 'Database Management',
      date: '2024-02-05T16:45:00Z',
      status: 'pending',
      requestedBy: 'PQR Institute'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Question Paper History</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Filter by:</span>
          <select className="form-input text-sm">
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="card">
        <div className="divide-y divide-gray-200">
          {historyEntries.map((entry) => (
            <div key={entry.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900">{entry.subject}</h3>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(entry.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-600">Requested by: {entry.requestedBy}</p>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  {entry.status === 'approved' && (
                    <>
                      <span className="inline-flex items-center rounded-full bg-success-50 px-2.5 py-0.5 text-xs font-medium text-success-700">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Approved
                      </span>
                      <span className="text-sm font-medium text-success-600">
                        Rating: {entry.rating}%
                      </span>
                    </>
                  )}
                  {entry.status === 'rejected' && (
                    <>
                      <span className="inline-flex items-center rounded-full bg-error-50 px-2.5 py-0.5 text-xs font-medium text-error-700">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Rejected
                      </span>
                      <span className="text-sm font-medium text-error-600">
                        Rating: {entry.rating}%
                      </span>
                    </>
                  )}
                  {entry.status === 'pending' && (
                    <span className="inline-flex items-center rounded-full bg-warning-50 px-2.5 py-0.5 text-xs font-medium text-warning-700">
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      Pending Review
                    </span>
                  )}
                </div>
              </div>

              {entry.feedback && (
                <div className="mt-4 rounded-md bg-error-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-error-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-error-800">Feedback</h3>
                      <div className="mt-2 text-sm text-error-700">
                        <p>{entry.feedback}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;