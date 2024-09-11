import React, { useState } from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import './Auth.css'; // Import CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/auth/login', { email, password });
      // Handle successful login
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      await axios.post('/api/auth/google', { tokenId: response.tokenId });
      // Handle successful Google login
    } catch (error) {
      setError('Google login failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} // Ensure this is in your .env file
        buttonText="Login with Google"
        onSuccess={handleGoogleLogin}
        onFailure={(response) => console.error('Google login failed:', response)}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default Login;
