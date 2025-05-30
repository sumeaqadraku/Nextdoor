const { Notification, NewListing, ClientRequest, Property, PropertyLocation } = require('../models');

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
        },
        {
          model: ClientRequest,
          as: 'clientRequest'
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const formatted = notifications.map(n => {
    return {
      id: n.id,
      type: n.type,
      is_read: n.is_read,
      createdAt: n.createdAt,
      newListing: n.newListing ? {
        propertyId: n.newListing.property?.id,
        listingType: n.newListing.property?.listingTypes,
        city: n.newListing.property?.location?.city
      } : null,
      clientRequest: n.clientRequest ? {
        id: n.clientRequest.id,
      } : null
    };
  });

    return res.status(200).json(formatted);
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

    const notification = await Notification.findOne({ where: { id, userId } });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found or access denied.' });
    }

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
