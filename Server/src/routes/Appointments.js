const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AppointmentController');
const authenticateToken = require('../middleware/auth').authenticateToken;

router.get('/', appointmentController.getAllAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.get('/user/:userId', appointmentController.getAppointmentsByUser);
router.post('/create', authenticateToken, appointmentController.acreateAppointment);


module.exports = router;