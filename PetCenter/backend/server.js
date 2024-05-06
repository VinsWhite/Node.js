const express = require('express');
const mongoose = require('mongoose');
const petRouter = require('./routes/petRouter')
require('dotenv').config({path: './config.env'});

const app = express();
app.use(express.json());

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose 
    .connect(DB)
    .then( () => console.log('DB connected!') );

app.use('/pet', petRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log('App running...')
})
