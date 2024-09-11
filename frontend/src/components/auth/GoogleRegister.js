import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const GoogleRegister = () => {
  const handleGoogleRegister = async (response) => {
    try {
      const res = await axios.post('/api/auth/google/register', { tokenId: response.tokenId });
      alert('Registration successful with Google!');
    } catch (error) {
      console.error('Google registration error:', error.response?.data || error.message);
    }
  };

  return (
    <div>
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

export default GoogleRegister;
