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

// POST create new property
exports.createProperty = async (req, res) => {
  try {
    const newProperty = await Property.create(req.body);
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update property
exports.updateProperty = async (req, res) => {
  try {
    const [updated] = await Property.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE property
exports.deleteProperty = async (req, res) => {
  try {
    const deleted = await Property.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};