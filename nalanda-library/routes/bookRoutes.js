const express = require('express');
const router = express.Router();

const {
  addBook,
  updateBook,
  deleteBook,
  getBooks
} = require('../controllers/bookController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

//  Protected route (any logged-in user)
router.get('/', authMiddleware, getBooks);

//  Admin-only routes
router.post('/', authMiddleware, roleMiddleware('admin'), addBook);
router.put('/:id', authMiddleware, roleMiddleware('admin'), updateBook);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteBook);

module.exports = router;
