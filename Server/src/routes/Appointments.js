const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AppointmentController');

router.post('/', appointmentController.createAppointment);
router.get('/', appointmentController.getAllAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.get('/user/:userId', appointmentController.getAppointmentsByUser);
router.patch('/:id/status', appointmentController.updateAppointmentStatus);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;