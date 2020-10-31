// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE,
// THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');
const router = express.Router();

// ********* require Author and Book models in order to use them *********
const Author = require('../models/Author.model');
const Book = require('../models/Book.model');

// ****************************************************************************************
// POST - create a book
// ****************************************************************************************

// <form action="/books" method="POST">
router.post('/api/books', (req, res, next) => {
  console.log(req.body);
  Book.create(req.body)
    .then(bookDoc => res.status(200).json({ book: bookDoc }))
    .catch(err => next(err));
});

// ****************************************************************************************
// GET route to get all the books
// ****************************************************************************************

router.get('/api/books', (req, res) => {
  Book.find()
    .then(booksFromDB => res.status(200).json({ books: booksFromDB }))
    .catch(err => next(err));
});

// ****************************************************************************************
// POST route to delete the book
// ****************************************************************************************

// <form action="/books/{{this._id}}/delete" method="post">
router.post('/api/books/:bookId/delete', (req, res) => {
  Book.findByIdAndRemove(req.params.bookId)
    .then(() => res.json({ message: 'Successfully removed!' }))
    .catch(err => next(err));
});

// ****************************************************************************************
// POST route to save the updates
// ****************************************************************************************

// <form action="/books/{{foundBook._id}}/update" method="POST">
router.post('/api/books/:id/update', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedBook => res.status(200).json({ book: updatedBook }))
    .catch(err => next(err));
});

// ****************************************************************************************
// GET route for getting the book details
// ****************************************************************************************

router.get('/api/books/:someBookId', (req, res) => {
  Book.findById(req.params.someBookId)
    .populate('author')
    .then(foundBook => res.status(200).json({ book: foundBook }))
    .catch(err => next(err));
});

module.exports = router;
