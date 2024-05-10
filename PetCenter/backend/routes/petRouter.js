const express = require('express');
const petController = require('../controller/petController');

const petRouter = express.Router('/pet');

petRouter.route('/')
    .get(petController.getAllPet)
    .post(petController.createAPet);

module.exports = petRouter;