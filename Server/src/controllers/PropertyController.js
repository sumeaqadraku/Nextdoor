const { where } = require('sequelize');
const { Property, PropertyImage, PropertyLocation, PropertyFeature, Appointment } = require('../models');
const { Op } = require('sequelize');

// GET all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({
      include: ['images', 'location', 'features']
    });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHomeProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({
      attributes: ['id', 'title', 'price'],
      include: [
        {
          model: PropertyFeature,
          as: 'features',
          attributes: ['size', 'bedrooms']
        },
        {
          model: PropertyLocation,
          as: 'location',
          attributes: ['city']
        },
        {
          model: PropertyImage,
          as: 'images',
          attributes: ['imageUrl'],
          where: {
            isPrimary: true
          },
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const formatted = properties.map(p => ({
      id: p.id,
      title: p.title,
      size: p.features?.size || null,
      bedrooms: p.features?.bedrooms || null,
      city: p.location?.city || null,
      price: p.price,
      imageUrl: Array.isArray(p.images) && p.images.length > 0 ? p.images[0].imageUrl : null
    }));

    res.json(formatted);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET single property
exports.getPropertyById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }

    const property = await Property.findByPk(id, {
      include: ['images', 'location', 'features'],
      logging: console.log
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (err) {
    console.error("Error fetching property:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET properties by filters
exports.getFilteredProperties = async (req, res) => {
  try {
      console.log("Filtering properties with query:", req.query);

    const { type, price, bedrooms, certified, search, location } = req.query;



    const whereClause = {};
    const featureClause = {};
    const locationClause = {};

    if (type) whereClause.type = type;
    if (price) whereClause.price = { [Op.gte]: parseFloat(price) };
    if (certified) whereClause.certified = { [Op.like]: `%${certified}%` };
    if (search) whereClause.title = { [Op.like]: `%${search}%` };

    if (bedrooms) featureClause.bedrooms = { [Op.like]: parseInt(bedrooms, 10) };
    if (location) locationClause.city = { [Op.like]: `%${location}%` };

    const properties = await Property.findAll({
      attributes: ['id', 'title', 'price'],
      where: whereClause,
      include: [
        {
          model: PropertyFeature,
          as: 'features',
          attributes: ['size', 'bedrooms'],
          where: Object.keys(featureClause).length ? featureClause : undefined,

        },
        {
          model: PropertyLocation,
          as: 'location',
          attributes: ['city'],
          where: Object.keys(locationClause).length ? locationClause : undefined,
        },
        {
          model: PropertyImage,
          as: 'images',
          attributes: ['imageUrl'],
          where: {
            isPrimary: true
          },
        }
      ],
      order: [['createdAt', 'DESC']],
    });

    const formatted = properties.map(p => ({
      id: p.id,
      title: p.title,
      size: p.features?.size || null,
      bedrooms: p.features?.bedrooms || null,
      city: p.location?.city || null,
      price: p.price,
      imageUrl: Array.isArray(p.images) && p.images.length > 0 ? p.images[0].imageUrl : null
    }));

    res.json(formatted);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

