const express = require('express');
const quoteController = require('../controllers/quoteController');

const router = express.Router();

router
    .get('/collection', quoteController.getCollection)
    .post('/quote', quoteController.saveQuote)
    .delete('/quote/:id', quoteController.deleteQuote);

module.exports = router;