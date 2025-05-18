const { PropertyModel, PropertyLocation, PropertyFeaturesModel, PropertyImagesModel, sequelize } = require('../models');

const CreateProperty = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const { name, type, price, description, agentId, city, address, latitude, longitude, bedrooms, bathrooms, size, elevator, yearBuilt, certificate, images } = req.body;

        const newProperty = await PropertyModel.create({
        name,
        type,
        price,
        description,
        agentId: agentId,
    }, { transaction: t });

        const propertyId = newProperty.id;

        await PropertyLocation.create({
            propertyId,
            city,
            address,
            latitude,
            longitude
        }, { transaction: t });

        await PropertyFeaturesModel.create({
            propertyId,
            bedrooms,
            bathrooms,
            size,
            elevator,
            yearBuilt,
            certificate
        }, { transaction: t });

        const imagesRecords = images.map((url) => ({
            propertyId,
            url
        }));
        await PropertyImagesModel.bulkCreate(imagesRecords, { transaction: t });
        await t.commit();

        return res.status(201).json({ message: 'Property created successfully', propertyId });
    } catch (error) {
        await t.rollback();
        console.error('Error creating property:', error);
        return res.status(500).json({ message: 'Error creating property', error });
    }   
}

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


modules.exports = {
    CreateProperty,
    deleteProperty,
    editProperty
}