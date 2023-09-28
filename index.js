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


app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));