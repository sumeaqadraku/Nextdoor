const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// GET all users
router.get('/', userController.getAllUsers);

// GET user by ID
router.get('/:id', userController.getUserById);


module.exports = router;
