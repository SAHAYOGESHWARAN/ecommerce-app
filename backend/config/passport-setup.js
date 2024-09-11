const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Adjust the path if necessary

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback" // Ensure this matches your Google Console settings
  },
  async (accessToken, refreshToken, profile, done) => {
    // Check if user already exists in our db
    const existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) {
      // Already have this user
      return done(null, existingUser);
    }

    // If not, create a new user
    const newUser = new User({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName
    });
    await newUser.save();
    done(null, newUser);
  }
));

// Used to serialize the user id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Used to deserialize the user id
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
