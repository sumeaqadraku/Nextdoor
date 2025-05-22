const { Property, PropertyLocation, PropertyFeature, PropertyImage, sequelize } = require('../models');
console.log('PropertyModel', Property);
console.log('PropertyLocation', PropertyLocation);
console.log('PropertyFeaturesModel', PropertyFeature);
console.log('PropertyImagesModel', PropertyImage);

const createProperty = async (req, res) => {
  try {
    const { 
      title, type, price, description, listingTypes, city, address, 
      latitude, longitude, bedrooms, bathrooms, size, elevator, yearBuilt, 
      certificate, imageUrl 
    } = req.body;

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

    await PropertyImage.create({ propertyId, imageUrl });

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
    const { name, type, price, description, city, address, latitude, longitude, bedrooms, bathrooms, size, elevator, yearBuilt, certificate } = req.body;

    try {
        const property = await PropertyModel.findByPk(id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        await PropertyModel.update({
            name,
            type,
            price,
            description
        }, { where: { id } });

        await PropertyLocation.update({
            city,
            address,
            latitude,
            longitude
        }, { where: { propertyId: id } });

        await PropertyFeaturesModel.update({
            bedrooms,
            bathrooms,
            size,
            elevator,
            yearBuilt,
            certificate
        }, { where: { propertyId: id } });

        return res.status(200).json({ message: 'Property updated successfully' });
    }
    catch (error) {
        console.error('Error updating property:', error);
        return res.status(500).json({ message: 'Error updating property', error });
    }
}


const deleteProperty = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await PropertyModel.findByPk(id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        await PropertyModel.destroy({ where: { id } });

        return res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error('Error deleting property:', error);
        return res.status(500).json({ message: 'Error deleting property', error });
    }
}


module.exports = {
    createProperty,
    deleteProperty,
    editProperty
}