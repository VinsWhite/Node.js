const express = require('express');
const petController = require('../controller/petController');

const petRouter = express.Router('/pet');

petRouter.route('/')
    .get(petController.getAllPet)
    .post(petController.createAPet);

petRouter.route('/:id')
    .delete(petController.deleteAPet);

module.exports = petRouter;