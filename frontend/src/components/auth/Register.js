import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import './Auth.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Basic client-side validation
    if (!email || !password) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', { email, password, role });
      setSuccess('Registration successful! Please log in.');
      setEmail('');
      setPassword('');
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async (response) => {
    try {
      const res = await axios.post('/api/auth/google/register', { tokenId: response.tokenId });
      setSuccess('Registration successful with Google!');
    } catch (error) {
      setError('Google registration failed. Please try again.');
      console.error('Google registration error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Password"
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Register with Google"
        onSuccess={handleGoogleRegister}
        onError={(error) => console.error('Google registration error:', error)}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default Register;
