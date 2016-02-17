'use strict';

const express = require('express');
const router = express.Router();
const portCtrl = require('./portfolio.controller');

router.get('/portfolio', portCtrl.index);

module.exports = router;
