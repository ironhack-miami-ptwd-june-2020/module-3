// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');
const authorRouter = express.Router();

// ********* require Author model in order to use it for CRUD *********
const Author = require('../models/Author.model');

// ****************************************************************************************
// POST route to create a new author in the DB
// ****************************************************************************************

// <form action="/authors" method="POST">
authorRouter.post('/api/authors', (req, res, next) => {
  Author.create(req.body)
    .then(authorDoc => res.status(200).json({ author: authorDoc }))
    .catch(err => next(err));
});

// ****************************************************************************************
// GET all authors from the DB
// ****************************************************************************************

authorRouter.get('/api/authors', (req, res, next) => {
  Author.find() // <-- .find() method gives us always an ARRAY back
    .then(authorsFromDB => res.status(200).json({ authors: authorsFromDB }))
    .catch(err => next(err));
});

module.exports = authorRouter;
