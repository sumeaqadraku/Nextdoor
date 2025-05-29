const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/PropertyController');

router.get('/', propertyController.getFilteredProperties);
router.get('/', propertyController.getHomeProperties);
router.get('/:id', propertyController.getPropertyById);




module.exports = router;

