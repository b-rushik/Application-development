import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const OTPVerification = ({ username, onSuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await Auth.confirmSignUp(username, code);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Error verifying code');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResending(true);
    try {
      await Auth.resendSignUp(username);
      alert('New verification code sent!');
    } catch (err) {
      setError(err.message || 'Error resending code');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="otp-verification">
      <h1>Verify Your Account</h1>
      <p>We've sent a verification code to your email</p>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleVerify}>
        <div className="form-group">
          <label>Verification Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
      
      <div className="resend-code">
        <p>Didn't receive a code?</p>
        <button 
          onClick={handleResendCode} 
          disabled={resending}
          className="btn btn-link"
        >
          {resending ? 'Sending...' : 'Resend Code'}
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;