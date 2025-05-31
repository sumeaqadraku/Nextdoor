const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/BuyerController');

//Routes
router.get('/', buyerController.getAllAgents);


router.get('/:id', buyerController.getAgentDetails);
router.get('/props/:id', buyerController.getAgentProperties);



module.exports = router;