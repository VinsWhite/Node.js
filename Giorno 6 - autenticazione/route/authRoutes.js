const express = require('express');
const router = express.Router();
const { login, register, update, deleteUser } = require('../Auth/auth')
const { adminAuth } = require('../middleware/auth')

router
    .route('/register')
    .post(register);

router
    .route('/login')
    .post(login);

router
    .route('/deleteUser')
    .delete(adminAuth, deleteUser);

router
    .route('/update')
    .put(adminAuth, update);

module.exports = router;