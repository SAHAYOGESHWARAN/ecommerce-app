const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // Import connect-mongo
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
require('./config/passport-setup'); // Import passport configuration

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if the connection fails
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Middleware with MongoDB session store
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI, // MongoDB URI from environment variables
    collectionName: 'sessions', // Name of the MongoDB collection to store sessions
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // Session expires in 1 day
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
