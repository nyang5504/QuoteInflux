const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Collection', collectionSchema);