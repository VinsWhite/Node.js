const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require("cookie-parser");
require('dotenv').config({ path: './config.env' });

const app = express();

app.use(express.json());
app.use(cookieParser());

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const port = process.env.PORT || 3000;

mongoose
    .connect(DB)
    .then(() => console.log('DB connected 🛴'))
    .catch((error) => console.log('💣 Error: ', error));

app.listen(port, () => {
    console.log(`DB connection on port ${port} 🚗`)
})
