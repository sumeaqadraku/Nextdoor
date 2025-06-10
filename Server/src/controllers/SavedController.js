const { SavedProperty, Property, PropertyFeature, PropertyLocation, PropertyImage, Buyer} = require('../models');

const saveProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    userId = req.user?.id;

    const buyer = await Buyer.findOne({ where: { userId } });

    if (!buyer) {
      return res.status(404).json({ message: 'Buyer profile not found.' });
    }

    const alreadySaved = await SavedProperty.findOne({
      where: { propertyId, buyerId: buyer.id },
    });
    if (alreadySaved) {
      return res.status(409).json({ message: 'Property already saved by this buyer.' });
    }

    const saved = await SavedProperty.create({
      propertyId,
      buyerId: buyer.id,
    });

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
    const userId = req.params.userId;

    const buyer = await Buyer.findOne({ where: { userId } });
    const buyerId = buyer?.id;

    if (!buyerId) {
      return res.status(400).json({ message: 'buyerId is required.' });
    }

    // Step 1: Fetch saved property IDs
    const savedProperties = await SavedProperty.findAll({
      where: { buyerId },
      attributes: ['propertyId'],
    });

    const propertyIds = savedProperties.map(item => item.propertyId);

    if (!propertyIds.length) {
      return res.json([]);
    }

    // Step 2: Fetch each property and its associations manually
    const fullProperties = [];

     const properties = await Property.findAll({
      where: { id: propertyIds },
      attributes: ['id', 'title', 'price'],
      include: [
        {
          model: PropertyFeature,
          as: 'features',
          attributes: ['size', 'bedrooms'],
        },
        {
          model: PropertyLocation,
          as: 'location',
          attributes: ['city'],
        },
        {
          model: PropertyImage,
          as: 'images',
          attributes: ['imageUrl'],
          where: { isPrimary: true },
          required: false, // allows properties without a primary image
        },
      ],
    });

    // Step 4: Format response
    const formatted = properties.map((p) => ({
      id: p.id,
      title: p.title,
      size: p.features?.size || null,
      bedrooms: p.features?.bedrooms || null,
      city: p.location?.city || null,
      price: p.price,
      imageUrl:
        Array.isArray(p.images) && p.images.length > 0
          ? p.images[0].imageUrl
          : null,
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Error fetching saved home properties:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


const removeSavedProperty = async (req, res) => {
  try {
    const {propertyId} = req.body;
    const userId = req.user.id;

    const buyer = await Buyer.findOne({ where: { userId } });
    const buyerId = buyer.id;

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
