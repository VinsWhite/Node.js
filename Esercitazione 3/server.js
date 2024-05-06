const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config({path: './config.env'});
const animaliRouter = require('./routes/animaliRoute');

const app = express();
app.use(express.json());

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB)
    .then( () => console.log('DB connection: success!'));

app.use('/api/v1/animali', animaliRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log('App running...')
})
