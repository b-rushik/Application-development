import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getUserRole } from '../../utils/auth';
import PaperGetterMenu from '../../components/PaperGetter/Menu';

const PaperGetterDashboard = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getCurrentUser();
      const role = await getUserRole();
      
      if (role !== 'PAPER_GETTER') {
        navigate('/');
        return;
      }
      
      setUser(currentUser);
      
      // Fetch paper requests
      try {
        const result = await API.graphql({
          query: `query ListPaperRequests($filter: ModelPaperRequestFilterInput) {
            listPaperRequests(filter: $filter) {
              items {
                id
                course
                subject
                status
                examDate
              }
            }
          }`,
          variables: {
            filter: {
              paperGetterId: { eq: currentUser.username }
            }
          }
        });
        setRequests(result.data.listPaperRequests.items);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="dashboard">
      <h1>Paper Getter Dashboard</h1>
      <PaperGetterMenu />
      <div className="dashboard-content">
        {user && (
          <>
            <h2>Welcome, {user.attributes.email}</h2>
            <div className="requests-list">
              <h3>Your Paper Requests</h3>
              {requests.length > 0 ? (
                <ul>
                  {requests.map(request => (
                    <li key={request.id}>
                      {request.subject} - {request.status} (Exam: {new Date(request.examDate).toLocaleDateString()})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No paper requests found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaperGetterDashboard;