const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/PropertyController');

router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getPropertyById);

module.exports = router;

