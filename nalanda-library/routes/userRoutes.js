const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  getAllUsers,
  updateUserStatus,
  deleteUser,
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', authMiddleware, getProfile);
router.get('/', authMiddleware, getAllUsers);
router.put('/:id/status', authMiddleware, updateUserStatus); // ✅ NEW
router.delete('/:id', authMiddleware, deleteUser);           // ✅ NEW

module.exports = router;

