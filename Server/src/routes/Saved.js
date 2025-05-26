const express = require('express');
const router = express.Router();
const savedController = require('../controllers/SavedController');

// CRUD routes
router.post('/save', savedController.saveProperty);
router.get('/:buyerId', savedController.getSavedByBuyerId);
router.delete('/:id', savedController.removeSavedProperty);

module.exports = router;