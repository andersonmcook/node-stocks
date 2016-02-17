'use strict';

const express = require('express');
const router = express.Router();
const quoteCtrl = require('./quote.controller');

router.get('/quote', quoteCtrl.index).post('/quote', quoteCtrl.new).get('/quote/:detail', quoteCtrl.detail)
.post('/quote/:detail', quoteCtrl.detail);

module.exports = router;
