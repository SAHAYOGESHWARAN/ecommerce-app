// authController.js
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.registerWithGoogle = async (req, res) => {
  const { tokenId } = req.body;

  try {
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // Get user info from token
    const payload = ticket.getPayload();
    const email = payload.email;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (!user) {
      // Create a new user if not found
      user = new User({ email, password: '', role: 'user' }); // Default role 'user'
      await user.save();
    }

    // Send success response
    res.status(200).json({ message: 'Registration successful with Google!' });
  } catch (error) {
    console.error('Google registration error:', error);
    res.status(500).json({ message: 'Google registration failed', error: error.message });
  }
};
