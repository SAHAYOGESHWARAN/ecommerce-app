const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Ensure the correct path to your User model

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback" // Must match the URI in Google Console
  },
  async (accessToken, refreshToken, profile, done) => {
    // Check if user already exists in our db
    const existingUser = await User.findOne({ googleId: profile.id });
    
    if (existingUser) {
      // User already exists
      return done(null, existingUser);
    }
    
    // If not, create a new user
    const newUser = new User({
      googleId: profile.id,
      name: profile.displayName,
      email: profile._json.email
    });
    await newUser.save();
    done(null, newUser);
  }
));

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
