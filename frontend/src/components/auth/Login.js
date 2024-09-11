import React, { useState } from 'react';
import GoogleLoginButton from '../GoogleLoginButton'; // Update path based on actual location
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/login', { email, password });
      // Handle successful login
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      await axios.post('/api/auth/google', { tokenId: response.tokenId });
      // Handle successful Google login
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <GoogleLoginButton onSuccess={handleGoogleLogin} />
    </div>
  );
};

export default Login;
