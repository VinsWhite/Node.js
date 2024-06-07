const express = require('express');
const routerTask = express.Router();
const taskController = require('../controller/taskController');

routerTask
    .route('/createTask')
    .post(taskController.createATask);

routerTask
    .route('/tasks')
    .get(taskController.getTasks);

module.exports = routerTask;