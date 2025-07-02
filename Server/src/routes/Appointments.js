const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AppointmentController');
const authenticateToken = require('../middleware/auth').authenticateToken;

router.post('/create',authenticateToken, appointmentController.createAppointment);
router.patch('/status/:id',authenticateToken, appointmentController.updateAppointmentStatus)
router.get('/', authenticateToken,appointmentController.getAllAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.get('/user/:userId', appointmentController.getAppointmentsByUser);

module.exports = router;