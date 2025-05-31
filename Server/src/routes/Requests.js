const express = require('express');
const router = express.Router();
const requestController = require('../controllers/BuyerController');
const authenticateToken = require('../middleware/auth').authenticateToken;

// CRUD routes
router.post('/makeABooking',authenticateToken, requestController.makeABooking);

module.exports = router