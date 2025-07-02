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


  async getAllAppointments(req, res) {
    try {
      const appointments = await Appointment.findAll({
        attributes: ['id', 'status', 'date'],
        include: [
          {
        model: Property,
        as: 'property',
        attributes: ['title']
          }
        ],
        order: [['date', 'ASC']],
        raw: true,
        nest: true
      });

      const formattedAppointments = appointments.map(app => ({
        id: app.id,
        status: app.status,
        date: app.date,
        title: app.property.title
      }));

      res.json(formattedAppointments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch appointments' });
    }
  },

  async updateAppointmentStatus(req, res) {
  try {
    const appointmentId = req.params.id;
    const { status } = req.body;

    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      message: 'Status updated successfully',
      appointment,
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Server error while updating status' });
  }
},

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
