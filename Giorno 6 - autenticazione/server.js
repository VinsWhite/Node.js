const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require("cookie-parser");
require('dotenv').config({ path: './config.env' })
const { adminAuth, userAuth } = require('./middleware/auth')
// remember: The require() function can be called from anywhere within the program, whereas import() cannot be called conditionally

const app = express();
app.use(express.json());
app.use(cookieParser());
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB)
    .then(() => console.log('DB connected!'))
    .catch((error) => console.error('DB connection error: ', error));

app.use('/api/auth', require('./route/authRoutes'))

app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`DB connection on port ${port}`)
})
