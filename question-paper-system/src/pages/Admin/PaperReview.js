import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API, Storage } from 'aws-amplify';

const PaperReview = () => {
  const { paperId } = useParams();
  const [paper, setPaper] = useState(null);
  const [syllabusUrl, setSyllabusUrl] = useState('');
  const [paperUrl, setPaperUrl] = useState('');
  const [review, setReview] = useState({
    rating: 70,
    feedback: '',
    decision: 'APPROVED'
  });

  useEffect(() => {
    const fetchPaperDetails = async () => {
      try {
        // Fetch paper details
        const paperResult = await API.graphql({
          query: `query GetPaperRequest($id: ID!) {
            getPaperRequest(id: $id) {
              id
              subject
              syllabus
              paperFile
              paperSetterId
              examDate
              status
            }
          }`,
          variables: { id: paperId }
        });
        
        const paperData = paperResult.data.getPaperRequest;
        setPaper(paperData);
        
        // Get download URLs for files
        if (paperData.syllabus) {
          const syllabusUrl = await Storage.get(paperData.syllabus);
          setSyllabusUrl(syllabusUrl);
        }
        
        if (paperData.paperFile) {
          const paperUrl = await Storage.get(paperData.paperFile);
          setPaperUrl(paperUrl);
        }
      } catch (error) {
        console.error('Error fetching paper details:', error);
      }
    };

    fetchPaperDetails();
  }, [paperId]);

  const handleReviewSubmit = async () => {
    try {
      // Update paper status
      await API.graphql({
        query: `mutation UpdatePaperRequest($input: UpdatePaperRequestInput!) {
          updatePaperRequest(input: $input) {
            id
            status
          }
        }`,
        variables: {
          input: {
            id: paperId,
            status: review.decision,
            rating: review.rating,
            feedback: review.feedback
          }
        }
      });
      
      // Notify paper setter if rejected
      if (review.decision === 'REJECTED') {
        await API.graphql({
          query: `mutation NotifyPaperSetter($input: CreateNotificationInput!) {
            createNotification(input: $input) {
              id
            }
          }`,
          variables: {
            input: {
              userId: paper.paperSetterId,
              message: `Your paper for ${paper.subject} was rejected. Feedback: ${review.feedback}`,
              type: 'PAPER_REJECTED'
            }
          }
        });
      }
      
      alert('Review submitted successfully!');
      window.location.href = '/admin';
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (!paper) return <div>Loading paper details...</div>;

  return (
    <div className="paper-review">
      <h1>Paper Review: {paper.subject}</h1>
      
      <div className="paper-details">
        <h2>Details</h2>
        <p>Paper Setter ID: {paper.paperSetterId}</p>
        <p>Exam Date: {new Date(paper.examDate).toLocaleDateString()}</p>
        <p>Current Status: {paper.status}</p>
      </div>
      
      <div className="document-viewer">
        <h2>Syllabus</h2>
        {syllabusUrl ? (
          <iframe src={syllabusUrl} title="Syllabus" width="100%" height="400px" />
        ) : (
          <p>No syllabus available</p>
        )}
        
        <h2>Question Paper</h2>
        {paperUrl ? (
          <iframe src={paperUrl} title="Question Paper" width="100%" height="600px" />
        ) : (
          <p>No paper uploaded</p>
        )}
      </div>
      
      <div className="review-form">
        <h2>Review Form</h2>
        
        <div className="form-group">
          <label>Rating (0-100)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={review.rating}
            onChange={(e) => setReview({...review, rating: parseInt(e.target.value)})}
          />
        </div>
        
        <div className="form-group">
          <label>Feedback</label>
          <textarea
            value={review.feedback}
            onChange={(e) => setReview({...review, feedback: e.target.value})}
            rows="5"
          />
        </div>
        
        <div className="form-group">
          <label>Decision</label>
          <select
            value={review.decision}
            onChange={(e) => setReview({...review, decision: e.target.value})}
          >
            <option value="APPROVED">Approve</option>
            <option value="REJECTED">Reject</option>
          </select>
        </div>
        
        <button onClick={handleReviewSubmit} className="btn btn-primary">
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default PaperReview;