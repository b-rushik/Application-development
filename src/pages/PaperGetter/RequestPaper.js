import React, { useState } from 'react';
import { API, Storage } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/auth';

const RequestPaper = () => {
  const [formData, setFormData] = useState({
    course: '',
    branch: '',
    subject: '',
    difficulty: 'MEDIUM',
    sets: 1,
    examDate: '',
    syllabus: null,
    modelPaper: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = async (file, type) => {
    try {
      const fileName = `uploads/${Date.now()}_${file.name}`;
      await Storage.put(fileName, file);
      return fileName;
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const user = await getCurrentUser();
      
      // Upload files
      const syllabusKey = await handleFileUpload(formData.syllabus, 'syllabus');
      const modelPaperKey = formData.modelPaper ? 
        await handleFileUpload(formData.modelPaper, 'model paper') : null;
      
      // Create request
      const result = await API.graphql({
        query: `mutation CreatePaperRequest($input: CreatePaperRequestInput!) {
          createPaperRequest(input: $input) {
            id
            course
            subject
          }
        }`,
        variables: {
          input: {
            ...formData,
            syllabus: syllabusKey,
            modelPaper: modelPaperKey,
            paperGetterId: user.username,
            status: 'PENDING',
            deadline: new Date(new Date(formData.examDate).getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
          }
        }
      });
      
      navigate('/paper-getter/faculty-selection', {
        state: { requestId: result.data.createPaperRequest.id }
      });
    } catch (error) {
      console.error('Error creating paper request:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="request-page">
      <h1>Request New Question Paper</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields for all request details */}
        <div className="form-group">
          <label>Course</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Other form fields similarly */}
        
        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default RequestPaper;