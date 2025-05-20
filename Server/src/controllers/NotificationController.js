const { Notification, NewListing, ClientRequest } = require('../models');

module.exports = {
  // Get all notifications for a user
  async getAllByUser(req, res) {
    try {
      const userId = req.params.userId;

      const notifications = await Notification.findAll({
        where: { userId },
        include: [
          { model: NewListing, as: 'newListing' },
          { model: ClientRequest, as: 'clientRequest' },
        ],
        order: [['createdAt', 'DESC']],
      });

      return res.status(200).json(notifications);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to get notifications' });
    }
  },

  // Mark a notification as read
  async markAsRead(req, res) {
    try {
      const { id } = req.params;

      const notification = await Notification.findByPk(id);
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }

      notification.is_read = true;
      await notification.save();

      return res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to update notification' });
    }
  },

  // Create a new notification 
  async create(req, res) {
    try {
      const { userId, type } = req.body;

      const newNotification = await Notification.create({
        userId,
        type,
        is_read: false,
      });

      return res.status(201).json(newNotification);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to create notification' });
    }
  },

  // Delete a notification
  async delete(req, res) {
    try {
      const { id } = req.params;

      const deleted = await Notification.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ error: 'Notification not found' });
      }

      return res.status(200).json({ message: 'Notification deleted' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to delete notification' });
    }
  },
};