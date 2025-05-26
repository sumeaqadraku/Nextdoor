const { SavedProperty, Property, PropertyFeature, PropertyLocation, PropertyImage } = require('../models');

const saveProperty = async (req, res) => {
  try {
    const { propertyId, buyerId } = req.body;

    if (!propertyId || !buyerId) {
      return res.status(400).json({ message: 'propertyId and buyerId are required.' });
    }

    const alreadySaved = await SavedProperty.findOne({
      where: { propertyId, buyerId },
    });

    if (alreadySaved) {
      return res.status(409).json({ message: 'Property already saved by this buyer.' });
    }

    const saved = await SavedProperty.create({ propertyId, buyerId });

    return res.status(201).json({
      message: 'Property saved successfully.',
      savedProperty: saved,
    });
  } catch (error) {
    console.error('Error saving property:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


const getSavedByBuyerId = async (req, res) => {
  try {
    const { buyerId } = req.params;

    if (!buyerId) {
      return res.status(400).json({ message: 'buyerId is required.' });
    }

    const savedProperties = await SavedProperty.findAll({
      where: { buyerId },
      include: [
        {
          model: Property, as: 'property', attributes: ['id', 'title', 'price'],
          include: [
            {
              model: PropertyFeature, as: 'features', attributes: ['size', 'bedrooms'],
            },
            {
              model: PropertyLocation, as: 'location', attributes: ['city'],
            },
            {
              model: PropertyImage, as: 'images', attributes: ['imageUrl'], where: { isPrimary: true }
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    const formattedProperties = savedProperties
      .map((item) => item.property)
      .filter((prop) => prop);

    return res.status(200).json({
      message: 'Saved properties fetched successfully.',
      properties: formattedProperties,
    });
  } catch (error) {
    console.error('Error fetching saved home properties:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const removeSavedProperty = async (req, res) => {
  try {
    const { propertyId, buyerId } = req.body;

    if (!propertyId || !buyerId) {
      return res.status(400).json({ message: 'propertyId and buyerId are required.' });
    }

    const deleted = await SavedProperty.destroy({
      where: { propertyId, buyerId },
    });

    if (deleted === 0) {
      return res.status(404).json({ message: 'Saved property not found.' });
    }

    return res.status(200).json({ message: 'Saved property removed successfully.' });
  } catch (error) {
    console.error('Error removing saved property:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


module.exports = {
  saveProperty,
  getSavedByBuyerId,
  removeSavedProperty  
};
