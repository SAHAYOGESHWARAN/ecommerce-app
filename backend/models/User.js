// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: false, // Not required for Google registration
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin']
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
