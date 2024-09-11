import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import PropTypes from 'prop-types';
import './GoogleLoginButton.css'; // Import CSS file for styling

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const handleSuccess = (response) => {
    setLoading(false);
    onSuccess(response);
  };

  const handleError = (error) => {
    setLoading(false);
    console.error('Google login error:', error);
    onError('Google login failed. Please try again.');
  };

  const handleLogin = () => {
    setLoading(true);
  };

  return (
    <div className="google-login-container">
      {loading && <p className="loading-message">Logging in...</p>}
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={handleSuccess}
        onError={handleError}
        onRequest={handleLogin}
        cookiePolicy={'single_host_origin'}
        className="google-login-button"
      />
    </div>
  );
};

GoogleLoginButton.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func
};

GoogleLoginButton.defaultProps = {
  onError: (message) => alert(message)
};

export default GoogleLoginButton;
