const express = require('express');
const collectionController = require('../controllers/collectionController');

const router = express.Router();

router
    .get('/collection', collectionController.getCollection)
    .post('/quote/:id', collectionController.saveQuote)
    .delete('/quote/:id', collectionController.deleteQuote);

module.exports = router;