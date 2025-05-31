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
