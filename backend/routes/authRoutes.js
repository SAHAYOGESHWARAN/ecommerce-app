const router = require('express').Router();
const passport = require('passport');

// Auth Routes
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/home'); // Adjust the redirect URI as needed
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
