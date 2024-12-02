const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    // Check if token is blacklisted
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Unauthorized: Token blacklisted' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    // Check if token is blacklisted
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Unauthorized: Token blacklisted' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find captain by ID
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(404).json({ message: 'Captain not found' });
    }

    req.captain = captain;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
