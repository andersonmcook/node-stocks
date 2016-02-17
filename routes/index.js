'use strict';
const express = require('express');
const router = express.Router();

const quote = require('../quote/quote.route');
const portfolio = require('../portfolio/portfolio.route');

router.use(quote);
router.use(portfolio);

module.exports = router;
