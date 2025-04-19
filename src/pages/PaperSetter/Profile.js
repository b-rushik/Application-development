import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { getCurrentUser } from '../../utils/auth';

const PaperSetterProfile = () => {
  const [profile, setProfile] = useState({
    organization: '',
    branch: '',
    subjects: '',
    proficiency: '',
    experience: ''
  });
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = await getCurrentUser();
      // Fetch profile data from API
      try {
        const result = await API.graphql({
          query: `query GetPaperSetter($id: ID!) {
            getPaperSetter(id: $id) {
              id
              organization
              branch
              subjects
              proficiency
              experience
              verified
            }
          }`,
          variables: { id: user.username }
        });
        if (result.data.getPaperSetter) {
          setProfile(result.data.getPaperSetter);
          setIsVerified(result.data.getPaperSetter.verified);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.graphql({
        query: `mutation UpdatePaperSetter($input: UpdatePaperSetterInput!) {
          updatePaperSetter(input: $input) {
            id
            organization
            branch
            subjects
            proficiency
            experience
          }
        }`,
        variables: {
          input: {
            id: (await getCurrentUser()).username,
            ...profile
          }
        }
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-page">
      <h1>Your Profile</h1>
      <div className={`verification-status ${isVerified ? 'verified' : 'pending'}`}>
        Status: {isVerified ? 'Verified' : 'Pending Verification'}
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Organization</label>
          <input
            type="text"
            value={profile.organization}
            onChange={(e) => setProfile({...profile, organization: e.target.value})}
            required
          />
        </div>
        
        {/* Other form fields similarly */}
        
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default PaperSetterProfile;