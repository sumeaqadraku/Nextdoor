const { Buyer, Agent, Appointment, User } = require('../models');

exports.getStats = async (req, res) => {
  try {
    const userCount = await User.count();
    const agentCount = await User.count({ where: { role: 'agent' } });
    const appointmentCount = await Appointment.count();
    res.json({ userCount, agentCount, appointmentCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  console.log("getAllUsers called"); // Add this line
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error('getAllUsers error:', err); // Add this line
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List all agents
exports.getAllAgents = async (req, res) => {
  try {
    const agents = await User.findAll({where: {role: "agent"}});
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete agent
exports.deleteAgent = async (req, res) => {
  try {
    const deleted = await Agent.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Agent not found" });
    res.json({ message: "Agent deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointment.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Appointment not found" });
    res.json({ message: "Appointment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};
