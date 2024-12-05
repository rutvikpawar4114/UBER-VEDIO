const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, 'First name must have at least 3 characters'],
    },
    lastname: {
      type: String,
      minlength: [3, 'Last name must have at least 3 characters'],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Email must have at least 5 characters'],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Ensures password is excluded by default from query results
  },
  socketId: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  },
});

// Pre-save hook to hash the password


// Instance method to generate JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{
    expiresIn:'24h'
  })
  return token;
};

// Static method to hash password
userSchema.statics.hashpassword = async function (password) {
  return await bcrypt.hash(password, 10);
};


// Instance method to compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('User', userSchema);
