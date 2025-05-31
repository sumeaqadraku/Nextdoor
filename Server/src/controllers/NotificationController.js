const { Notification, NewListing, ClientRequest,User, Property, PropertyLocation } = require('../models');

exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    const notifications = await Notification.findAll({
      where: { userId },
      include: [
        {
          model: NewListing,
          as: 'newListing',
          include: [
            {
              model: Property,
              as: 'property',
              attributes: ['id', 'listingTypes'],
              include: [
                { model: PropertyLocation, as: 'location', attributes: ['city'] }
              ]
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const requests = await ClientRequest.findAll({
      where: { userId },
      include: [{
        model: Notification,
        as: 'notification',
        attributes: ['id', 'is_read', 'createdAt']
      }],
      order: [[{ model: Notification, as: 'notification' }, 'createdAt', 'DESC']]
    });

    const formattedNotifications = notifications.map(n => {
    return {
      id: n.id,
      type: n.type,
      is_read: n.is_read,
      createdAt: n.createdAt,
      newListing: n.newListing ? {
        propertyId: n.newListing.property?.id,
        listingType: n.newListing.property?.listingTypes,
        city: n.newListing.property?.location?.city
      } : null
    };
  });

   const formattedRequests = requests
  .filter((r) => r.notification) // Ensure only requests with notifications are formatted
  .map((r) => ({
    id: r.notification.id, // Always use Notification.id
    type: 'client_request',
    is_read: r.notification.is_read,
    createdAt: r.notification.createdAt,
    clientRequest: {
      id: r.id,
      approved: r.approved,
    }
  }));

    const combinedFormatted = [...formattedNotifications, ...formattedRequests].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );



    return res.status(200).json(combinedFormatted);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

exports.updateReadStatus = async (req, res) => {
  try {
    const { id, read } = req.body;
    const userId = req.user.id; // from JWT

    if (!id || typeof read !== 'boolean') {
      return res.status(400).json({ message: 'Notification ID and read status are required.' });
    }

    // Fetch the notification with possible client request association
    const notification = await Notification.findOne({
      where: { id },
      include: [{ model: ClientRequest, as: 'clientRequest' }],
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

      const isAuthorized =
    notification.userId === userId ||
    (notification.clientRequest && notification.clientRequest.userId === userId);

  if (!isAuthorized) {
    return res.status(403).json({ message: 'You are not authorized to update this notification.' });
  }

    // Allow update
    notification.is_read = read;
    await notification.save();

    return res.status(200).json({ message: `Notification marked as ${read ? 'read' : 'unread'}.` });
  } catch (error) {
    console.error('Error updating read status:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


 exports.markAllNotificationsAsRead = async (req, res) => {
    try {
      const userId = req.user.id;

      if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
      }

      const [updatedCount] = await Notification.update(
        { is_read: true },
        { where: { userId, is_read: false } }
      );

      if (updatedCount === 0) {
        return res.status(404).json({ message: 'No unread notifications found.' });
      }

      res.status(200).json({ message: 'All notifications marked as read.' });
    } catch (error) {
      console.error('Error marking notifications as read:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  exports.removeAllNotifications = async (req, res) => {
    try {
      const userId = req.user.id;

      if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
      }

      const deletedCount = await Notification.destroy({
        where: { userId }
      });

      if (deletedCount === 0) {
        return res.status(404).json({ message: 'No notifications found for this user.' });
      }

      res.status(200).json({ message: 'All notifications removed successfully.' });
    } catch (error) {
      console.error('Error removing notifications:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

exports.getAgentBookingRequests = async (req, res) => {
  try {
    const agentUserId = req.user?.id;

    if (!agentUserId) {
      return res.status(401).json({ message: 'Unauthorized. Agent user ID is missing.' });
    }

    const notifications = await Notification.findAll({
      where: {
        userId: agentUserId,
        type: 'booking_request'
      },
      include: [
        {
          model: ClientRequest,
          as: 'clientRequest',
          attributes: ['id', 'message', 'propertyId', 'userId', 'approved'],
          where: {
            approved: 'requested'
          },
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'username', 'avatarUrl']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const formatted = notifications
      .filter(n => n.clientRequest && n.clientRequest.user)
      .map(n => ({
        message: n.clientRequest.message,
        propertyId: n.clientRequest.propertyId,
        id: n.clientRequest.user.id,
        clientRequestId: n.clientRequest.id,
        notificationId: n.id,
        approved: n.clientRequest.approved,
        username: n.clientRequest.user.username,
        avatarUrl: n.clientRequest.user.avatarUrl
      }));

    if (!formatted.length) {
      return res.status(404).json({ message: 'No client booking requests found.' });
    }

    return res.status(200).json(formatted);

  } catch (error) {
    console.error('Error fetching booking requests:', error);
    return res.status(500).json({ message: 'Server error while fetching booking requests.' });
  }
};


exports.declineBookingRequest = async (req, res) => {
  try {
    const { clientRequestId} = req.body;
    console.log(clientRequestId);

    if (!clientRequestId) {
      return res.status(400).json({ message: 'ClientRequestID are required.' });
    }

    await ClientRequest.update(
      { approved: 'declined' },
      { where: { id: clientRequestId } }
    );

    return res.status(200).json({ message: 'Client request declined  successfully.' });
  } catch (error) {
    console.error('Error updating booking request:', error);
    return res.status(500).json({ message: 'Server error while updating booking request.' });
  }
};

exports.acceptBookingRequest = async (req, res) => {
  try {
    const { clientRequestId} = req.body;
    console.log(clientRequestId);

    if (!clientRequestId) {
      return res.status(400).json({ message: 'ClientRequestID are required.' });
    }

    await ClientRequest.update(
      { approved: 'approved' },
      { where: { id: clientRequestId } }
    );

    return res.status(200).json({ message: 'Client request declined  successfully.' });
  } catch (error) {
    console.error('Error updating booking request:', error);
    return res.status(500).json({ message: 'Server error while updating booking request.' });
  }
};

