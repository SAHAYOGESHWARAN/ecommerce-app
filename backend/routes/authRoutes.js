const router = require('express').Router();
const passport = require('passport');
const { register } = require('../controllers/authController');

// Auth Routes
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/home'); // Change this to your desired route
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Current user route
router.get('/current_user', (req, res) => {
  res.send(req.user);
});


// Register route
router.post('/register', register);

module.exports = router;
