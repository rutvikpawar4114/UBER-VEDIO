const userService = require('../services/user.service.js');
const userModel = require('../models/user.model');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    // Check if user already exists
    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await userModel.hashpassword(password);
    console.log("Hashed password:", hashedPassword); // Log the hashed password

    // Create a new user
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword, // Store the hashed password
    });

    // Generate auth token
    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user by email and include password for comparison
    const user = await userModel.findOne({ email }).select('+password');  // Include password field in the query

    // Debugging: Check if user was found
    console.log("User found:", user);

    if (!user) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }

    // Debugging: Log entered password and stored hashed password
    console.log("Entered Password (Plain):", password);
    console.log("Stored Hashed Password:", user.password);  // This will log the stored hashed password

    // Compare passwords: compare the plain password with the hashed password
    const isMatch = await user.comparePassword(password);  // comparePassword uses bcrypt.compare

    // Debugging: Check if password match is successful
    console.log("Password Match Result:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }

    // Generate auth token
    const token = user.generateAuthToken();

    // Set token in cookies (optional)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization?.split(' ')[1]);

    if (token) {
      await blacklistTokenModel.create({ token });
    }

    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (err) {
    next(err);
  }
};
