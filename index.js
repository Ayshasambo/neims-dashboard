const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { application } = require('express');
const session = require('express-session')
require('dotenv/config');
const cors = require("cors");

//connect to database
mongoose.connect(process.env.DB_CONNECTION)
.then(() => console.log('connected to mongodb...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

//Set up session middleware
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const stationRoute = require('./routes/station');
const roleRoute = require('./routes/role');
const permissionRoute = require('./routes/permission');
const beneficiaryRoute = require('./routes/beneficiary');
const categoryRoute = require('./routes/category');
const productlistRoute = require('./routes/productlist');
const bincardRoute = require('./routes/bincard');

//middlewares
app.use(cors());
app.use(express.json());
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/station', stationRoute);
app.use('/api/role', roleRoute);
app.use('/api/permission', permissionRoute);
app.use('/api/beneficiary', beneficiaryRoute);
app.use('/api/category', categoryRoute);
app.use('/api/productlist', productlistRoute);
app.use('/api/bincard', bincardRoute);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));