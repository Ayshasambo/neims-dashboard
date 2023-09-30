const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { application } = require('express');
const nodemon = require('nodemon');
require('dotenv/config');

//connect to database
mongoose.connect(process.env.DB_CONNECTION)
.then(() => console.log('connected to mongodb...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

//middlewares
app.use(express.json());
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);


app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));