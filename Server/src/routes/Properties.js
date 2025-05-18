const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

router.post('/', propertyController.createProperty);

module.exports = router;