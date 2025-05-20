const { Appointment, User, Property } = require('../models');

module.exports = {
  // Create an appointment
  async createAppointment(req, res) {
    try {
      const { date, status, userId, propertyId, note } = req.body;

      const appointment = await Appointment.create({
        date,
        status,
        userId,
        propertyId,
        note,
      });

      res.status(201).json(appointment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create appointment' });
    }
  },

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

  // Update status
  async updateAppointmentStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      appointment.status = status;
      await appointment.save();

      res.json(appointment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update status' });
    }
  },

  // Delete
  async deleteAppointment(req, res) {
    try {
      const { id } = req.params;

      const deleted = await Appointment.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      res.json({ message: 'Appointment deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting appointment' });
    }
  }
};