const express = require('express');
const router = express.Router();
const agentController = require('../controllers/AgentController');
const upload = require('../middleware/multer');

// Create a property
router.post('/createProperty',upload.single("imageUrl"),agentController.createProperty);
// Update a property
router.put('/editProperty/:id', agentController.editProperty);
// Delete a property
router.delete('/deleteProperty/:id', agentController.deleteProperty);
// Get all properties by user ID
router.get('/getAllPropertiesByUserId/:userId', agentController.getAllPropertiesByUserId);

module.exports = router;