const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/NotificationController');

// Get all notifications for a user
router.get('/user/:userId', notificationController.getAllByUser);

// Mark a notification as read
router.put('/:id/read', notificationController.markAsRead);

// Create a new notification
router.post('/', notificationController.create);

// Delete a notification
router.delete('/:id', notificationController.delete);

module.exports = router;