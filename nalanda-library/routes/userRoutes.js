// const express = require('express');
// const router = express.Router();
// const { register, login, getProfile } = require('../controllers/userController');
// const authMiddleware = require('../middlewares/authMiddleware');

// // Public routes
// router.post('/register', register);
// router.post('/login', login);

// // Protected route for user profile
// router.get('/profile', authMiddleware, getProfile);

// module.exports = router;






const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route for user profile
router.get('/profile', authMiddleware, getProfile);

// ✅ New route to get all users (for admin/user management)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
