const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model");
const createCaptain = require("../services/captain.service.js");

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
