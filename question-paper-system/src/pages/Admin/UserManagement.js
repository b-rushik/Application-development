import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { getCurrentUser } from '../../utils/auth';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        let query;
        if (filter === 'PAPER_SETTERS') {
          query = `query ListPaperSetters {
            listPaperSetters {
              items {
                id
                organization
                branch
                verified
                rating
              }
            }
          }`;
        } else if (filter === 'PAPER_GETTERS') {
          query = `query ListPaperGetters {
            listPaperGetters {
              items {
                id
                organization
                verified
              }
            }
          }`;
        } else {
          // Combined query for all users
          // Note: In a real app, you might need separate queries
          query = `query ListUsers {
            listPaperSetters {
              items {
                id
                organization
                type: __typename
                verified
              }
            }
            listPaperGetters {
              items {
                id
                organization
                type: __typename
                verified
              }
            }
          }`;
        }
        
        const result = await API.graphql({ query });
        let userData = [];
        
        if (filter === 'ALL') {
          userData = [
            ...result.data.listPaperSetters.items.map(u => ({ ...u, role: 'PAPER_SETTER' })),
            ...result.data.listPaperGetters.items.map(u => ({ ...u, role: 'PAPER_GETTER' }))
          ];
        } else if (filter === 'PAPER_SETTERS') {
          userData = result.data.listPaperSetters.items.map(u => ({ ...u, role: 'PAPER_SETTER' }));
        } else {
          userData = result.data.listPaperGetters.items.map(u => ({ ...u, role: 'PAPER_GETTER' }));
        }
        
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [filter]);

  const handleVerification = async (userId, role, verified) => {
    try {
      const mutation = role === 'PAPER_SETTER' ? 
        `mutation UpdatePaperSetter($input: UpdatePaperSetterInput!) {
          updatePaperSetter(input: $input) {
            id
            verified
          }
        }` : 
        `mutation UpdatePaperGetter($input: UpdatePaperGetterInput!) {
          updatePaperGetter(input: $input) {
            id
            verified
          }
        }`;
      
      await API.graphql({
        query: mutation,
        variables: {
          input: {
            id: userId,
            verified
          }
        }
      });
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, verified } : user
      ));
    } catch (error) {
      console.error('Error updating verification:', error);
    }
  };

  const handleRatingChange = async (userId, rating) => {
    try {
      await API.graphql({
        query: `mutation UpdatePaperSetter($input: UpdatePaperSetterInput!) {
          updatePaperSetter(input: $input) {
            id
            rating
          }
        }`,
        variables: {
          input: {
            id: userId,
            rating: parseInt(rating)
          }
        }
      });
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, rating: parseInt(rating) } : user
      ));
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>
      
      <div className="filter-controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="ALL">All Users</option>
          <option value="PAPER_SETTERS">Paper Setters</option>
          <option value="PAPER_GETTERS">Paper Getters</option>
        </select>
      </div>
      
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Organization</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
                {filter === 'PAPER_SETTERS' && <th>Rating</th>}
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.organization}</td>
                  <td>{user.role}</td>
                  <td>{user.verified ? 'Verified' : 'Pending'}</td>
                  <td>
                    <button 
                      onClick={() => handleVerification(user.id, user.role, !user.verified)}
                      className={user.verified ? 'btn btn-danger' : 'btn btn-primary'}
                    >
                      {user.verified ? 'Revoke' : 'Verify'}
                    </button>
                  </td>
                  {filter === 'PAPER_SETTERS' && (
                    <td>
                      <select
                        value={user.rating || 0}
                        onChange={(e) => handleRatingChange(user.id, e.target.value)}
                      >
                        {[0, 1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;