const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router
    .post('/signin', userController.getUser)
    .get('/profile', userController.getProfile)
    .post('/signup', userController.createUser)
    .post('/logout', userController.logout)
    .put('/editUsername', userController.updateUsername)
    .put('/editPassword', userController.updatePassword)
    .delete('/:id', userController.deleteUser);

module.exports = router;