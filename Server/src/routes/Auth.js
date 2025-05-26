const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

// Authentication routes
router.post('/register', authController.registerUser);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshAccessToken);
router.post('/logout', authController.logout);


module.exports = router;