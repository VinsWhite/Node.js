const morgan = require('morgan')
const express = require('express');
const dataController = require('./controller/dataController')

const app = express();
app.use(morgan('dev'));

app.use(express.json()); //middleware --> to parse incoming JSON data from HTTP requests

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Qualcosa è andato storto!');
    next();
});

app
    .route('/data')
    .get(dataController.getAllData);

module.exports = app;