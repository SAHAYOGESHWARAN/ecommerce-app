import React, { useState } from 'react';
import GoogleLoginButton from '../GoogleLoginButton'; // Ensure this path is correct
import axios from 'axios';
import './Login.css'; // Import CSS file for styling

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
      const response = await axios.post('/api/auth/login', { email, password });
      // Handle successful login
      console.log(response.data); // Or redirect to another page
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      const result = await axios.post('/api/auth/google', { tokenId: response.tokenId });
      // Handle successful Google login
      console.log(result.data); // Or redirect to another page
    } catch (error) {
      setError('Google login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
      <GoogleLoginButton onSuccess={handleGoogleLogin} />
    </div>
  );
};

export default Login;
