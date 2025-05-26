const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AppointmentController');
const authController = require('../controllers/AuthController');

router.get('/', appointmentController.getAllAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.get('/user/:userId', appointmentController.getAppointmentsByUser);


module.exports = router;