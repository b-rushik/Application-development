import React, { useState, useEffect, useLocation } from 'react';
import { API } from 'aws-amplify';
import { useNavigate, useLocation } from 'react-router-dom';

const FacultySelection = () => {
  const location = useLocation();
  const [facultyList, setFacultyList] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [requestId, setRequestId] = useState('');
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.requestId) {
      setRequestId(location.state.requestId);
      setDifficulty(location.state.difficulty || 'MEDIUM');
    } else {
      navigate('/paper-getter');
    }
  }, [location, navigate]);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const result = await API.graphql({
          query: `query ListPaperSetters($filter: ModelPaperSetterFilterInput) {
            listPaperSetters(filter: $filter) {
              items {
                id
                organization
                branch
                subjects
                proficiency
                experience
                rating
              }
            }
          }`,
          variables: {
            filter: {
              verified: { eq: true },
              proficiency: { eq: difficulty }
            }
          }
        });
        
        // Sort by rating (highest first)
        const sortedFaculty = [...result.data.listPaperSetters.items].sort(
          (a, b) => (b.rating || 0) - (a.rating || 0)
        );
        
        setFacultyList(sortedFaculty);
      } catch (error) {
        console.error('Error fetching faculty:', error);
      }
    };

    fetchFaculty();
  }, [difficulty]);

  const handleFacultySelect = async () => {
    if (!selectedFaculty || !requestId) return;
    
    try {
      await API.graphql({
        query: `mutation UpdatePaperRequest($input: UpdatePaperRequestInput!) {
          updatePaperRequest(input: $input) {
            id
            paperSetterId
          }
        }`,
        variables: {
          input: {
            id: requestId,
            paperSetterId: selectedFaculty,
            status: 'ASSIGNED'
          }
        }
      });
      
      navigate('/paper-getter', {
        state: { message: 'Your question paper will be available on time' }
      });
    } catch (error) {
      console.error('Error assigning faculty:', error);
    }
  };

  return (
    <div className="faculty-selection">
      <h1>Select Faculty for Paper Setting</h1>
      <div className="difficulty-filter">
        <h3>Filter by Difficulty Level:</h3>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="HARD">Hard (IIT/NIT Professors)</option>
          <option value="MEDIUM">Medium (Central/State Universities)</option>
          <option value="LOW">Low (Autonomous/Affiliated Colleges)</option>
        </select>
      </div>
      
      <div className="faculty-list">
        <h2>Available Faculty</h2>
        {facultyList.length > 0 ? (
          <ul>
            {facultyList.map(faculty => (
              <li key={faculty.id} className="faculty-card">
                <input
                  type="radio"
                  id={faculty.id}
                  name="faculty"
                  checked={selectedFaculty === faculty.id}
                  onChange={() => setSelectedFaculty(faculty.id)}
                />
                <label htmlFor={faculty.id}>
                  <h3>{faculty.organization}</h3>
                  <p>Subjects: {faculty.subjects}</p>
                  <p>Experience: {faculty.experience} years</p>
                  <p>Rating: {faculty.rating || 'Not rated yet'}</p>
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p>No faculty available for the selected difficulty level.</p>
        )}
      </div>
      
      <button
        onClick={handleFacultySelect}
        disabled={!selectedFaculty}
        className="btn btn-primary"
      >
        Select Faculty
      </button>
    </div>
  );
};

export default FacultySelection;