'use strict';

const mongoose = require('mongoose');

// create a model to use in /contact to put in db contacts
module.exports = mongoose.model('quotes', mongoose.Schema({
  Symbol: String,
  Name: String,
  LastPrice: Number,
  Quantity: Number
})
);
