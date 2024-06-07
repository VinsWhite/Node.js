const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require("cookie-parser");
require('dotenv').config({ path: './config.env' });
const { adminAuth, userAuth } = require('./middleware/auth')

const app = express();

app.use(express.json());
app.use(cookieParser());

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const port = process.env.PORT || 3000;

mongoose
    .connect(DB)
    .then(() => console.log('DB connected 🛴'))
    .catch((error) => console.log('💣 Error: ', error));

app.use('/api/auth', require('./route/authRoutes'))
app.use('/api/auth', require('./route/taskRoutes'))

app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));

app.listen(port, () => {
    console.log(`DB connection on port ${port} 🚗`)
})
