const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AdminController');

router.post('/', adminController.createUser);
router.get('/', adminController.getAllUsers);
router.delete('/:id', adminController.deleteUser);
router.get('/user/:userId', appointmentController.getAppointmentsByUser);
router.patch('/:id/status', appointmentController.updateAppointmentStatus);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;