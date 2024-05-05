const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    quote: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    tags: {
        type: [String]
    }
}, {collection: 'quotes'});

module.exports = mongoose.model('Quote', quoteSchema);