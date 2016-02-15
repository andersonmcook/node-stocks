'use strict';
const express = require('express');
const router = express.Router();

const quote = require('../quote/quote.route');

router.use(quote);

module.exports = router;
