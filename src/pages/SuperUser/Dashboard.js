import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getUserRole } from '../../utils/auth';
import SuperUserMenu from '../../components/SuperUser/Menu';

const SuperUserDashboard = () => {
  const [user, setUser] = useState(null);
  const [systemStats, setSystemStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getCurrentUser();
      const role = await getUserRole();
      
      if (role !== 'SUPER_USER') {
        navigate('/');
        return;
      }
      
      setUser(currentUser);
      
      // Fetch system statistics
      try {
        const stats = await API.graphql({
          query: `query GetSystemStats {
            countPaperSetters
            countPaperGetters
            countActiveRequests
            countCompletedPapers
          }`
        });
        setSystemStats(stats.data);
      } catch (error) {
        console.error('Error fetching system stats:', error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="dashboard">
      <h1>Super User Dashboard</h1>
      <SuperUserMenu />
      <div className="dashboard-content">
        {user && (
          <>
            <h2>Welcome, Super User {user.attributes.email}</h2>
            
            <div className="system-stats">
              <h3>System Statistics</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <h4>Paper Setters</h4>
                  <p>{systemStats.countPaperSetters || 0}</p>
                </div>
                <div className="stat-card">
                  <h4>Paper Getters</h4>
                  <p>{systemStats.countPaperGetters || 0}</p>
                </div>
                <div className="stat-card">
                  <h4>Active Requests</h4>
                  <p>{systemStats.countActiveRequests || 0}</p>
                </div>
                <div className="stat-card">
                  <h4>Completed Papers</h4>
                  <p>{systemStats.countCompletedPapers || 0}</p>
                </div>
              </div>
            </div>
            
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <button 
                onClick={() => navigate('/super-user/data-access')}
                className="btn btn-primary"
              >
                Access All Data
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SuperUserDashboard;