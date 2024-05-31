const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config({ path: './config.env' })
// remember: The require() function can be called from anywhere within the program, whereas import() cannot be called conditionally

const app = express();
app.use(express.json())
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB)
    .then(() => console.log('DB connected!'))
    .catch((error) => console.error('DB connection error: ', error));

app.use('/api/auth', require('./route/authRoutes'))

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`DB connection on port ${port}`)
})
