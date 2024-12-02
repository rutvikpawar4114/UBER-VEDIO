const express = require('express');
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller'); // Ensure captain.controller.js exports all methods
const authMiddleware = require('../middlewares/auth.middleware'); // Ensure auth.middleware.js has the required middleware

const router = express.Router();

// Route for captain registration
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname')
      .isLength({ min: 3 })
      .withMessage('Firstname must be at least 3 characters'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('vehical.color')
      .isLength({ min: 3 })
      .withMessage('Color must be at least 3 characters'),
    body('vehical.plate')
      .isLength({ min: 3 })
      .withMessage('Plate must be at least 3 characters'),
    body('vehical.capacity')
      .isInt({ min: 1 })
      .withMessage('Capacity must be at least 1'),
    body('vehical.vehicalType')
      .isIn(['car', 'motorcycle', 'auto'])
      .withMessage('Invalid Vehical Type'),
  ],
  captainController.registerCaptain
);

// Route for captain login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long'),
  ],
  captainController.loginCaptain
);

// Route for fetching captain profile (protected)
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

// Route for captain logout (protected)
router.get('/logout', authMiddleware.authCaptain, captainController.logoutcaptain);

// Export the router
module.exports = router;
