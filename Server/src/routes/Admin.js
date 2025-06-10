const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

// Get all users
router.get('/users', adminController.getAllUsers);

// Delete user by id
router.delete('/users/:id', adminController.deleteUser);
router.get('/agents', adminController.getAllAgents);
router.delete('/agents/:id', adminController.deleteAgent);
router.get('/appointments', adminController.getAllAppointments);
router.delete('/appointments/:id', adminController.deleteAppointment);

module.exports = router;