const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, 'At least 3 characters are required in firstname'],
    },
    lastname: {
      type: String,
      minlength: [3, 'Lastname must be at least 3 characters long'],
    },
  },
  email: {
    type: String,
    required: true,
    minlength: [5, 'Email must be at least 5 characters long'],
    lowercase: true,
    unique: true,  // Ensuring email uniqueness
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  },
  vehical: {
    color: {
      type: String,
      required: true,
      minlength: [3, 'Color must be at least 3 characters long'],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, 'Plate must be at least 3 characters long'],
    },
    capacity: {
      type: String,
      required: true,
      min: [1, 'Capacity must be at least 1'],
    },
    vehicalType: {
      type: String,
      required: true,
      enum: ['car', 'motorcycle', 'auto'],
    },
  },
  location: {
    lat: {
      type: Number,
    },
    long: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  return token;
};

captainSchema.statics.hashpassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;




