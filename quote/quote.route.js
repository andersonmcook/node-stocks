'use strict';

const express = require('express');
const router = express.Router();

router.get('/quote', (req, res) => {
  res.render('quote');
});

module.exports = router;
