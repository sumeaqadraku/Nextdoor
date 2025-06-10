const express = require('express');
const router = express.Router();
const agentController = require('../controllers/AgentController');
const upload = require('../middleware/multer');
const authenticateToken = require('../middleware/auth').authenticateToken;

// Counts
router.get('/countProperties', authenticateToken, agentController.countProperties);
router.get('/countAppointments', authenticateToken, agentController.countScheduledAppointments);
router.get('/countSold', authenticateToken, agentController.getStatusSold);
router.get('/getRequests', authenticateToken, agentController.getRequests);

// Create a property
router.post('/createProperty',authenticateToken, upload.array("imageUrl", 4),agentController.createProperty);
// Update a property
router.put('/editProperty/:id',upload.array("imageUrl",4), agentController.editProperty);
// Delete a property
router.delete('/deleteProperty/:id', agentController.deleteProperty);

router.patch('/updatePropertyStatus/:id', agentController.updatePropertyStatus);
// Get all properties by user ID
router.get('/my-properties', authenticateToken, agentController.getAllPropertiesByAgent);

module.exports = router;