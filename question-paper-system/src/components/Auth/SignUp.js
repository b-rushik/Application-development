import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { USER_ROLES } from '../../utils/constants';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: USER_ROLES.PAPER_SETTER,
    userID: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // Sign up user
      const { user } = await Auth.signUp({
        username: formData.userID,
        password: formData.password,
        attributes: {
          email: formData.email,
          'custom:role': formData.role
        }
      });
      
      // Move to OTP verification step
      setStep(2);
    } catch (err) {
      setError(err.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {step === 1 ? (
          <>
            <h1>Sign Up</h1>
            
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>User ID</label>
                <input
                  type="text"
                  name="userID"
                  value={formData.userID}
                  onChange={handleChange}
                  required
                />
                <small>This will be your username</small>
              </div>
              
              <div className="form-group">
                <label>Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value={USER_ROLES.PAPER_SETTER}>Paper Setter</option>
                  <option value={USER_ROLES.PAPER_GETTER}>Paper Getter</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="8"
                />
              </div>
              
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength="8"
                />
              </div>
              
              <button type="submit" disabled={loading} className="btn btn-primary">
                {loading ? 'Processing...' : 'Sign Up'}
              </button>
            </form>
            
            <div className="auth-footer">
              <p>Already have an account? <a href="/login">Login</a></p>
            </div>
          </>
        ) : (
          <OTPVerification 
            username={formData.userID} 
            onSuccess={() => navigate('/login')}
          />
        )}
      </div>
    </div>
  );
};

export default SignUp;