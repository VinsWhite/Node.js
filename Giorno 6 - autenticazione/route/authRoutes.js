const express = require('express');
const router = express.Router();
const { login, register, update, deleteUser } = require('../Auth/auth')

router
    .route('/register')
    .post(register);

router
    .route('/login')
    .post(login);

router
    .route('/deleteUser')
    .delete(deleteUser);

router
    .route('/update')
    .put(update);

module.exports = router;