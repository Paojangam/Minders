const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, deleteUserProfile } = require('../controllers/userController');
const authenticateUser = require('../middleware/auth'); // Your auth middleware

// GET user profile
router.get('/me', authenticateUser, getUserProfile);

// UPDATE user profile
router.put('/me', authenticateUser, updateUserProfile);

// DELETE user profile
router.delete('/me', authenticateUser, deleteUserProfile);

module.exports = router;
