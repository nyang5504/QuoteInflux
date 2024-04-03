const express = require('express');
const userController = require('./controllers');

const router = express.Router();

router
    .post('/signin', userController.getUser)
    .post('/signup', userController.createUser)
    .put('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser);

module.exports = router;