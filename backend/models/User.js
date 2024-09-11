const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  picture: {
    type: String, // URL to the user's Google profile picture
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
