const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/NotificationController');
const authenticateToken = require('../middleware/auth').authenticateToken;

// Get all notifications for a user


router.get('/', authenticateToken, notificationController.getAgentBookingRequests);

router.get('/getNotifs', authenticateToken, notificationController.getNotifications);

router.put('/decline',notificationController.declineBookingRequest);
router.put('/accept', authenticateToken, notificationController.acceptBookingRequest)

router.post('/updateReadStatus', authenticateToken, notificationController.updateReadStatus);

router.post('/markAllAsRead', authenticateToken, notificationController.markAllNotificationsAsRead);

router.post('/deleteNotification', authenticateToken, notificationController.removeAllNotifications);



module.exports = router;