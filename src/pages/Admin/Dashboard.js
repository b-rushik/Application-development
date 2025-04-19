import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getUserRole } from '../../utils/auth';
import AdminMenu from '../../components/Admin/Menu';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [pendingPapers, setPendingPapers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getCurrentUser();
      const role = await getUserRole();
      
      if (role !== 'ADMIN') {
        navigate('/');
        return;
      }
      
      setUser(currentUser);
      
      // Fetch pending verifications
      try {
        const verifications = await API.graphql({
          query: `query ListPaperSetters($filter: ModelPaperSetterFilterInput) {
            listPaperSetters(filter: $filter) {
              items {
                id
                organization
                branch
                verified
              }
            }
          }`,
          variables: {
            filter: {
              verified: { eq: false }
            }
          }
        });
        setPendingVerifications(verifications.data.listPaperSetters.items);
      } catch (error) {
        console.error('Error fetching verifications:', error);
      }
      
      // Fetch pending papers
      try {
        const papers = await API.graphql({
          query: `query ListPaperRequests($filter: ModelPaperRequestFilterInput) {
            listPaperRequests(filter: $filter) {
              items {
                id
                subject
                paperSetterId
                status
              }
            }
          }`,
          variables: {
            filter: {
              status: { eq: 'UNDER_REVIEW' }
            }
          }
        });
        setPendingPapers(papers.data.listPaperRequests.items);
      } catch (error) {
        console.error('Error fetching papers:', error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <AdminMenu />
      <div className="dashboard-content">
        {user && (
          <>
            <h2>Welcome, Admin {user.attributes.email}</h2>
            
            <div className="pending-tasks">
              <h3>Pending Verifications</h3>
              {pendingVerifications.length > 0 ? (
                <ul>
                  {pendingVerifications.map(user => (
                    <li key={user.id}>
                      {user.organization} - {user.branch}
                      <button onClick={() => navigate(`/admin/verify-user/${user.id}`)}>
                        Review
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No pending verifications.</p>
              )}
              
              <h3>Papers Under Review</h3>
              {pendingPapers.length > 0 ? (
                <ul>
                  {pendingPapers.map(paper => (
                    <li key={paper.id}>
                      {paper.subject} - Setter: {paper.paperSetterId}
                      <button onClick={() => navigate(`/admin/review-paper/${paper.id}`)}>
                        Review
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No papers under review.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;