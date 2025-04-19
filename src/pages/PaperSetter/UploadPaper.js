import React, { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';
import { useParams } from 'react-router-dom';

const UploadPaper = () => {
  const { requestId } = useParams();
  const [file, setFile] = useState(null);
  const [deadline, setDeadline] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    // Fetch request details including deadline
    const fetchRequestDetails = async () => {
      try {
        const result = await API.graphql({
          query: `query GetPaperRequest($id: ID!) {
            getPaperRequest(id: $id) {
              id
              deadline
            }
          }`,
          variables: { id: requestId }
        });
        setDeadline(result.data.getPaperRequest.deadline);
      } catch (error) {
        console.error('Error fetching request details:', error);
      }
    };

    fetchRequestDetails();
  }, [requestId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    try {
      // Upload to S3
      const fileName = `papers/${requestId}/${file.name}`;
      await Storage.put(fileName, file, {
        contentType: 'application/pdf'
      });
      
      // Update request status in database
      await API.graphql({
        query: `mutation UpdatePaperRequest($input: UpdatePaperRequestInput!) {
          updatePaperRequest(input: $input) {
            id
            status
          }
        }`,
        variables: {
          input: {
            id: requestId,
            status: 'UNDER_REVIEW'
          }
        }
      });
      
      setIsUploaded(true);
    } catch (error) {
      console.error('Error uploading paper:', error);
    }
  };

  return (
    <div className="upload-page">
      <h1>Upload Question Paper</h1>
      <div className="deadline-info">
        <p>Deadline: {new Date(deadline).toLocaleString()}</p>
      </div>
      
      {!isUploaded ? (
        <div className="upload-form">
          <input type="file" accept=".pdf" onChange={handleFileChange} />
          <button onClick={handleUpload} className="btn btn-primary">
            Upload Paper
          </button>
        </div>
      ) : (
        <div className="success-message">
          <p>Your question paper has been uploaded successfully!</p>
          <p>It is now under review by our experts.</p>
        </div>
      )}
    </div>
  );
};

export default UploadPaper;