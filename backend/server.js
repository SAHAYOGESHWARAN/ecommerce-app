// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Import your authentication routes

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable for port or default to 5000

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // To handle CORS issues

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://sahayogeshwaran1:db4aUSjkZkX1AUNf@cluster1.fpl98.mongodb.net/ecommerce', { // Replace with your MongoDB URI if hosted remotely
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

connectDB(); // Call the function to connect to MongoDB

// Routes
app.use('/api/auth', authRoutes); // Use your authentication routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
