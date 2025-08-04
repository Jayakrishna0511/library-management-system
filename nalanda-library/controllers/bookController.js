const Book = require('../models/Book');

// Add Book (Admin)
exports.addBook = async (req, res) => {
  try {
    const book = await Book.create({
      ...req.body,
      createdBy: req.user.id, // Optional: track who added the book
    });
    res.status(201).json({ message: 'Book added successfully ', book });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Book (Admin)
exports.updateBook = async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Book not found ' });
    }
    res.json({ message: 'Book updated ', book: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Book (Admin)
exports.deleteBook = async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Book not found ' });
    }
    res.json({ message: 'Book deleted ' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List Books (All users)
exports.getBooks = async (req, res) => {
  try {
    const { genre, author } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const filter = {};
    if (genre) filter.genre = new RegExp(genre, 'i');
    if (author) filter.author = new RegExp(author, 'i');

    const skip = (page - 1) * limit;
    const totalBooks = await Book.countDocuments(filter);
    const totalPages = Math.ceil(totalBooks / limit);

    const books = await Book.find(filter)
      .skip(skip)
      .limit(limit);

    res.json({ books, totalBooks, totalPages, currentPage: page });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
