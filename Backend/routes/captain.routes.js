const express = require('express');
const bodyParser = require('body-parser');
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const router = express.Router();

// Create an instance of Express application
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());

router.post('/register', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('fullname.firstname').isLength({ min: 3 }).withMessage('Firstname must be at least 3 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('vehical.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters'),
  body('vehical.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters'),
  body('vehical.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
  body('vehical.vehicalType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid Vehical Type'),
], captainController.registerCaptain);

module.exports = router;