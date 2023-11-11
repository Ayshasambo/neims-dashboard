const express = require('express');
const router = express.Router();
const Bincard = require('../models/Bincard');
const Product = require('../models/Product');
const SivForm = require('../models/SivForm');
const mongoose = require('mongoose')



module.exports = router