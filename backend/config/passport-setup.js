const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || "/api/auth/google/callback", // Ensure this matches the Google Developer Console
  passReqToCallback: true, // Pass the request to the callback function to manage user state if needed
},
async (req, accessToken, refreshToken, profile, done) => {
  try {
    // Find if the user already exists in the database
    let existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) {
      // Update profile information if necessary (e.g., picture or email updates)
      existingUser.email = profile.emails[0].value;
      existingUser.picture = profile.photos[0].value;
      await existingUser.save();
      return done(null, existingUser);
    }

    // Create a new user if one doesn't exist
    const newUser = new User({
      googleId: profile.id,
      email: profile.emails[0].value,
      picture: profile.photos[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName
    });

    await newUser.save();
    return done(null, newUser);
  } catch (error) {
    console.error('Error during Google OAuth:', error);
    return done(error, null);
  }
}));

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.error('Error during deserialization:', error);
    done(error, null);
  }
});

module.exports = passport;
