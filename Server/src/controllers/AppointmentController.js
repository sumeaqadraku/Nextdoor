const { Appointment, User, Property } = require('../models');

module.exports = {

  async createAppointment(req, res) {
  try {
    const { date, propertyId, note } = req.body;

    const userId = req.user?.id
    console.log(userId)

    if (!date || !userId || !propertyId) {
      return res.status(400).json({ message: 'Date, userId, and propertyId are required.' });
    }

    const appointment = await Appointment.create({
      date,
      userId,
      propertyId,
      note: note || null
    });

    return res.status(201).json({
      message: 'Appointment created successfully.',
      appointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return res.status(500).json({ message: 'Internal server error.' });
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

}
