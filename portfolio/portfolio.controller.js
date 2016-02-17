/* eslint-disable */
'use strict';
const Stock = require('../quote/quote.model');

module.exports.index = (req, res) => {
  Stock.find({}).sort('Symbol').exec((err, result) => {
    console.log('portfolio result', result);
    res.render('portfolio', {portfolio: result});
  });
};
