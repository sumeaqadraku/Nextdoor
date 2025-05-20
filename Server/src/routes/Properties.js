const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/PropertyController');

router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getPropertyById);
router.post('/', propertyController.createProperty);
router.put('/:id', propertyController.updateProperty);
router.delete('/:id', propertyController.deleteProperty);

module.exports = router;
