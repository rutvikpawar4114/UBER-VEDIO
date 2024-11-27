const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    // Hash the password
    const hashedPassword = await userModel.hashPassword(password);

    // Create the user
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });
    

    // Generate auth token
    const token = user.generateAuthToken();

    // Respond with token and user details
    res.status(201).json({ token, user });
  } catch (err) {
    next(err); // Pass error to error-handling middleware
  }
};

module.exports.loginUser = async (req, res,next) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
      return res.status(401).json({message:'Invalid Email or Password'});
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({message:'Invalid Email or Password'})
    }

    const token = user.generateAuthToken();

    res.status(200).json({token,user})


  }
