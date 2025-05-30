const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authenticateToken = require('../middleware/auth').authenticateToken;
const upload = require('../middleware/multer');


router.get('/loggedIn', authenticateToken, userController.getLoggedInUser);


// GET all users
router.get('/', userController.getAllUsers);

// GET user by ID
router.get('/:id', userController.getUserById);

//` GET user by email

// PUT edit user profile
router.put('/edit-profile', authenticateToken, upload.single('avatarUrl'),userController.editProfile);


module.exports = router;
