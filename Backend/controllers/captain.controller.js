const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model");
const createCaptain = require("../services/captain.service.js");
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehical } = req.body;

  try {
    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    const hashedPassword = await captainModel.hashpassword(password);

    const captain = await createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehical.color,
      plate: vehical.plate,
      capacity: vehical.capacity,
      vehicalType: vehical.vehicalType,
    });

    const token = captain.generateAuthToken();
    res.status(201).json({
      message: "Captain registered successfully",
      captain,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


module.exports.loginCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }

    const token = captain.generateAuthToken();
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({ token , captain  });
  } catch (err) {
    next(err);
  }
};


module.exports.getCaptainProfile = async (req, res) => {
  res.status(200).json(req.captain);
};

module.exports.logoutcaptain = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization?.split(' ')[1]);

    if (token) {
      await blacklistTokenModel.create({ token });
    }

    res.clearCookie('token');
    res.status(200).json({ message: 'Captain logged out successfully' });
  } catch (err) {
    next(err);
  }
};

