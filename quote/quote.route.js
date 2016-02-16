'use strict';

const express = require('express');
const router = express.Router();

router.get('/quote', (req, res) => {
  const test = [{symbol: "AAPL", price: 76.2}, {symbol: "BBPL", price: 9.1}, {symbol: "CCPL", price: 54.3}];
  res.render('quote', {stuffs: test});
});

// router.post('/quote', (req, res) => {

// });

module.exports = router;
