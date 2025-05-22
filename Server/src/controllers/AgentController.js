const { Property, PropertyLocation, PropertyFeature, PropertyImage, sequelize } = require('../models');
console.log('PropertyModel', Property);
console.log('PropertyLocation', PropertyLocation);
console.log('PropertyFeaturesModel', PropertyFeature);
console.log('PropertyImagesModel', PropertyImage);

const createProperty = async (req, res) => {
  try {
    console.log("Creating property...")
    const { 
      title, type, price, description, listingTypes, city, address, 
      latitude, longitude, bedrooms, bathrooms, size, elevator, yearBuilt, 
      certificate,imageUrl
    } = req.body;

    // const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newProperty = await Property.create({
      title, description, price, type, agentId: "1", listingTypes
    });

    const propertyId = newProperty.id;

    await PropertyLocation.create({
      propertyId, city, address, latitude, longitude
    });

    await PropertyFeature.create({
      propertyId, bedrooms, bathrooms, size, elevator, yearBuilt, certificate
    });

    if (Array.isArray(imageUrl)) {
      const imageRecords = imageUrl.map(url => ({
        propertyId,
        imageUrl: url
      }));
      await PropertyImage.bulkCreate(imageRecords);
    }


    return res.status(201).json({
      message: 'Property created successfully',
      propertyId
    });

  } catch (error) {
    console.error('Error creating property:', error);
    return res.status(500).json({
      message: 'Error creating property',
      error
    });
  }
};

const editProperty = async (req, res) => {
    const { id } = req.params;
    const { title, type, price, description, listingTypes, city, address, 
      latitude, longitude, bedrooms, bathrooms, size, elevator, yearBuilt, 
      certificate } = req.body;

    try {
        const property = await Property.findByPk(id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        await property.update({
            title, type, price, description, listingTypes
        });

        const location = await PropertyLocation.findOne({ where: { propertyId: id } });
        if (location) {
            await location.update({ city, address, latitude, longitude });
        }

        const features = await PropertyFeature.findOne({ where: { propertyId: id } });
        if (features) {
            await features.update({ bedrooms, bathrooms, size, elevator, yearBuilt, certificate });
        }

        return res.status(200).json({ message: 'Property updated successfully' });
    } catch (error) {
        console.error('Error updating property:', error);
        return res.status(500).json({ message: 'Error updating property', error });
    }
}

const getAllPropertiesByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const properties = await Property.findAll({
            where: { agentId: userId },
            include: ['images', 'location', 'features']
        });

        if (!properties.length) {
            return res.status(404).json({ message: 'No properties found for this user' });
        }

        return res.status(200).json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        return res.status(500).json({ message: 'Error fetching properties', error });
    }
}


const deleteProperty = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findByPk(id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        await Property.destroy({ where: { id } });

        return res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error('Error deleting property:', error);
        return res.status(500).json({ message: 'Error deleting property', error });
    }
}


module.exports = {
    createProperty,
    deleteProperty,
    editProperty,
    getAllPropertiesByUserId,
}