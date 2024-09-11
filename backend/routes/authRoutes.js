const express = require('express');
const passport = require('passport');

const router = express.Router();

// Initiate Google OAuth authentication
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'] // Request access to profile and email
}));

// Google OAuth callback URL
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  session: true // Enables session support
}), (req, res) => {
  res.redirect('/dashboard'); // Redirect to dashboard after successful login
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).send('Logout failed');
    }
    res.redirect('/'); // Redirect to home page after logout
  });
});

// Register Route with Validation Middleware
router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  register
);


module.exports = router;
