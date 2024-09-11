import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = ({ onSuccess }) => {
  const responseGoogle = (response) => {
    onSuccess(response);
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onError={(error) => console.error(error)}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
