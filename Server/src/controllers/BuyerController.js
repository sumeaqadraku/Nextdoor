const { User,Agent, Notification, ClientRequest, Property, PropertyFeature, PropertyLocation, PropertyImage } = require('../models');

exports.makeABooking = async (req, res) => {
    try {
        const { message, propertyId } = req.body;
        const userId = req.user?.id;

        if (!message || !userId || !propertyId) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const property = await Property.findByPk(propertyId, {
            include: {
                model: Agent,
                as: 'agent',
                include: {
                    model: User,
                    as: 'user',
                    attributes: ['id']
                }
            }
        });

        if (!property || !property.agent) {
            return res.status(404).json({ message: 'Property or assigned agent not found.' });
        }

        const agentUserId = property.agent.userId;

        const notification = await Notification.create({
            userId: agentUserId,    
            type: 'booking_request',      
            status: 'unread'    
        });

        const clientRequest = await ClientRequest.create({
            userId,                  
            propertyId,
            notif_id: notification.id,
            message
        });

        return res.status(201).json({
            message: 'Booking request sent successfully.',
            request: clientRequest,
            notificationId: notification.id
        });

    } catch (error) {
        console.error('Error making booking:', error);
        return res.status(500).json({ message: 'Server error while processing booking request.' });
    }
};

exports.getAllAgents = async (req, res) => {
  try {
    const agents = await User.findAll({
        where:{ role: 'agent'},
        attributes: ['id','username','role','email','avatarUrl','phoneNumber']
    });
    res.json(agents);
  } catch (error) {
    console.error('Print the error', error)
    res.status(500).send('Server Error');
  }
};

exports.getAgentDetails = async (req, res) => {
    try{
        const id = parseInt(req.params.id, 10);

        const agent = await User.findByPk(id);

        if(!agent) {
            res.status(404).send("Agent doesnt exists");
        }

        res.json(agent);

    } catch(error) {
        console.error('Print the error', error)
        res.status(500).send('Server Error');
    }
};

exports.getAgentProperties = async (req, res) => {
  try {
    console.log("Hit getAgentProperties route");

    const userId = parseInt(req.params.id, 10);

    const properties = await Property.findAll({
      where: { agentId: userId },
      attributes: ['id', 'title'],
      include: [
        {
          model: PropertyImage,
          as: 'images',
        }
      ],
    });

    return res.status(200).json(properties);

  } catch (error) {
    console.error("Error fetching agent properties:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};
