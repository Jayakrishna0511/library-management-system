const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route for user profile
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
