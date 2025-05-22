const { Property, PropertyImage, PropertyLocation, PropertyFeature, Appointment } = require('../models');

// GET all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({
      include: ['images', 'location', 'features', 'appointments']
    });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single property
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id, {
      include: ['images', 'location', 'features', 'appointments']
    });
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

