const { Property, PropertyLocation, NewListing, Notification,PropertyFeature, PropertyImage, ClientRequest, Appointment, sequelize, Agent, User } = require('../models');
console.log('PropertyModel', Property);
console.log('PropertyLocation', PropertyLocation);
console.log('PropertyFeaturesModel', PropertyFeature);
console.log('PropertyImagesModel', PropertyImage);

const createProperty = async (req, res) => {
  try {
    console.log("Creating property...")
    const files = req.files;
    const userId = req.user?.id;
    const { 
      title, type, price, owner, description, listingTypes, city, address, 
      latitude, longitude, bedrooms, bathrooms, size, elevator, yearBuilt, 
      certificate
    } = req.body;

    const agent = await Agent.findOne({ where: { userId } });
    
    const agentId = agent?.id;
    if (!agentId) {
    return res.status(400).json({ message: "Agent not found for the user" });
}
    console.log('Agent ID:', agentId);

    const newProperty = await Property.create({
      title, description, price, type, owner, listingTypes, agentId
    });

    const propertyId = newProperty.id;

    await PropertyLocation.create({
      propertyId, city, address, latitude, longitude
    });

    await PropertyFeature.create({
      propertyId, bedrooms, bathrooms, size, elevator, yearBuilt, certificate
    });

    const imageRecords = files.map(file => ({
    propertyId,
    imageUrl: `/uploads/${file.filename}`
    }));

    await PropertyImage.bulkCreate(imageRecords);

    const users = await User.findAll();

    for (const user of users) {
      const notification = await Notification.create({
        userId: user.id,
        type: 'new_listing',
        is_read: false,
        newListingId: propertyId
      });

      await NewListing.create({
        propertyId,
        notif_id: notification.id
      });
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

const updatePropertyStatus = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const { status } = req.body;

    const property = await Property.findByPk(propertyId);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    property.status = status;
    await property.save();

    res.status(200).json({
      message: 'Status updated successfully',
      property,
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Server error while updating status' });
  }
};



const countProperties = async (req, res) => {
  try {
    const userId = req.user?.id;
    const agent = await Agent.findOne({ where: { userId } });
    const agentId = agent?.id;
    console.log(agentId);

    const propertyCount = await Property.count({
      where: { agentId }
    }); 

    return res.status(200).json({ count: propertyCount });
  } catch (error) {
    return res.status(500).json({ message: 'Error counting properties', error });
  }
};

const getStatusSold = async (req, res) => {
  try {
    const userId = req.user?.id;

    const agent = await Agent.findOne({where: {userId}});

    const agentId = agent?.id

    const soldProperties = await Property.count({
      where: { agentId, status: 'active' }
    });
    return res.status(200).json({ count: soldProperties });
  } catch (error) {
    console.error('Error counting sold properties:', error);
    return res.status(500).json({ message: 'Error counting sold properties', error });
  }
};

const getRequests = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(404).json({ message: 'User ID missing or agent not found' });
    }

    // Get notifications for this user with their associated ClientRequest
    const notifications = await Notification.findAll({
      where: { userId },
      include: {
        model: ClientRequest,
        as: 'clientRequest',
        where: { approved: 'approved' },
        required: true
      }
    });

    console.log(notifications.length)

    if (!notifications.length) {
      return res.status(404).json({ message: 'No pending requests found' });
    }

    return res.status(200).json({ count: notifications.length });
  } catch (error) {
    console.error('Error fetching property requests:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

const countScheduledAppointments = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    const appointmentsCount = await Appointment.count({
      where: { userId, status: 'Scheduled' },
    });

    return res.status(200).json({ count: appointmentsCount });
  } catch (error) {
    console.error('Error counting scheduled appointments:', error);
    return res.status(500).json({ message: 'Error counting scheduled appointments', error });
  }
}

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

const getAllPropertiesByAgent = async (req, res) => {
  try {
    const userId = req.user?.id;
    console.log('User ID from request:', userId);

    const agent = await Agent.findOne({ where: { userId } });
    const agentId = agent?.id;
    console.log('Agent ID:', agentId);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: No user found in request' });
    }

    const properties = await Property.findAll({
      where: { agentId: agentId },
      attributes: ['id', 'title', 'status', 'owner', 'createdAt'], 
    });

    if (!properties.length) {
      return res.status(404).json({ message: 'No properties found for this user' });
    }

    return res.status(200).json(properties);

  } catch (error) {
    console.error('Error fetching user-specific properties:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};



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
    getAllPropertiesByAgent,
    countProperties,
    getStatusSold,
    getRequests,
    countScheduledAppointments,
    updatePropertyStatus
}