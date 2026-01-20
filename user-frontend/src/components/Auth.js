import React, { useState } from 'react';
import { userSignup, userSignin } from '../api';
import './Auth.css';

function Auth({ onAuthSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isSignup) {
        await userSignup(email, phone, address);
        setSuccess('Account created! Now signing in...');
        setTimeout(() => signin(), 1000);
      } else {
        await signin();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const signin = async () => {
    try {
      const response = await userSignin(email, phone);
      localStorage.setItem('userEmail', response.data.user.email);
      localStorage.setItem('userPhone', response.data.user.phone);
      localStorage.setItem('userAddress', response.data.user.address);
      onAuthSuccess(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Sign in failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>🍽️ Home Food</h1>
          <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Egyptian Phone Number</label>
            <input
              type="tel"
              placeholder="e.g., 01001234567 or +201001234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="^(\+20|0)[0-9]{9,10}$"
              title="Enter a valid Egyptian phone number"
              required
            />
            <small>Format: 01001234567 or +201001234567</small>
          </div>

          {isSignup && (
            <div className="form-group">
              <label>Delivery Address</label>
              <textarea
                placeholder="Enter your full delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="3"
                required
              />
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Processing...' : isSignup ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="auth-toggle">
          <p>
            {isSignup ? 'Already have account?' : 'Don\'t have account?'}
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setError('');
                setSuccess('');
              }}
              className="toggle-btn"
            >
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;