import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getUserRole } from '../../utils/auth';
import PaperSetterMenu from '../../components/PaperSetter/Menu';

const PaperSetterDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      const role = await getUserRole();
      
      if (role !== 'PAPER_SETTER') {
        navigate('/');
        return;
      }
      
      setUser(currentUser);
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="dashboard">
      <h1>Paper Setter Dashboard</h1>
      <PaperSetterMenu />
      <div className="dashboard-content">
        {user && (
          <div className="user-info">
            <h2>Welcome, {user.attributes.email}</h2>
            <p>You have access to create and upload question papers.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaperSetterDashboard;