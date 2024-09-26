import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();
// POST Route to Add a New Book
router.post('/', async (req, res) => {
    try {
        const { title, author, publishYear } = req.body; // Extract values from request body
        if (!title || !author || !publishYear) {
            return res.status(400).json({
                success: false,
                message: 'Please send all required fields: title, author, publishYear'
            });
        }

        const newBook = { title, author, publishYear };
        const book = await Book.create(newBook);
        return res.status(201).json({ success: true, book });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
});

// GET Route to Retrieve All Books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({ success: true, count: books.length, data: books });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
});

// GET Route to Retrieve a Single Book by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        return res.status(200).json({ success: true, book });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
});

// PUT Route to Update a Book
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract id from request parameters
        const { title, author, publishYear } = req.body; // Extract values from request body

        // Validate the fields
        if (!title || !author || !publishYear) {
            return res.status(400).json({
                success: false,
                message: 'Please send all required fields: title, author, publishYear'
            });
        }

        // Update the book
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        // Check if the book was found and updated
        if (!updatedBook) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        return res.status(200).json({ success: true, book: updatedBook });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
});

// Delete a book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        return res.status(200).json({ success: true, message: 'Book deleted successfully' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
});

export default router;