const { Appointment, User, Property } = require('../models');

module.exports = {

  // Get all appointments
  async getAllAppointments(req, res) {
    try {
      const appointments = await Appointment.findAll({
        include: ['user', 'property'],
        order: [['date', 'ASC']],
      });

      res.json(appointments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch appointments' });
    }
  },

  // Get one appointment by ID
  async getAppointmentById(req, res) {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findByPk(id, {
        include: ['user', 'property'],
      });

      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      res.json(appointment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching appointment' });
    }
  },

  // Get appointments by userId
  async getAppointmentsByUser(req, res) {
    try {
      const { userId } = req.params;
      const appointments = await Appointment.findAll({
        where: { userId },
        include: ['property'],
      });

      res.json(appointments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching user appointments' });
    }
  },

}
