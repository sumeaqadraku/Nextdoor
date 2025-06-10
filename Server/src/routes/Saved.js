const express = require('express');
const router = express.Router();
const savedController = require('../controllers/SavedController');
const authenticateToken = require('../middleware/auth').authenticateToken;

// CRUD routes
router.post('/save/:id', authenticateToken,savedController.saveProperty);

router.get('/fetch/:userId', savedController.getSavedByBuyerId);
router.post('/remove', authenticateToken, savedController.removeSavedProperty);

module.exports = router;