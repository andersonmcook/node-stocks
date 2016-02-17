/* eslint-disable */
'use strict';

const request = require('request');
const Stock = require('./quote.model');

module.exports.index = (req, res) => {
  res.render('quote');};

module.exports.new = (req, res) => {
  const detail = req.params.detail || req.body.Symbol;
  let url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${detail}`;
  console.log("Symbol", req.body.Symbol);
  console.log("req.body",req.body);

  const stock = req.body.Symbol;
  request.get(url, (err, response, html) => {
    if (err) throw err;
    // console.log(response.body);
    // console.log("html", html);
    response.body = JSON.parse(response.body);
    const stuffs = {
      Symbol: response.body.Symbol,
      Name: response.body.Name,
      LastPrice: response.body.LastPrice
    }

    const dbStock = new Stock({
      Symbol: response.body.Symbol,
      Name: response.body.Name,
      LastPrice: response.body.LastPrice,
      Quantity: 0
    });

    res.redirect(`/quote/${detail}`);
  });
};

module.exports.detail = (req, res) => {
  console.log('detail');
  const detail = req.params.detail;
  let url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${detail}`;
  request.get(url, (err, response, html) => {
    console.log('request');
    if (err) throw err;
    response.body = JSON.parse(response.body);

    const stock = {
      Symbol: response.body.Symbol,
      Name: response.body.Name,
      LastPrice: response.body.LastPrice,
      Quantity: 0
    }

    Stock.findOne({'Symbol': response.body.Symbol}, 'Quantity', (err, data) => {
      console.log('findOne', data);
      stock.Quantity = data.Quantity;
      if (err) throw err;
      if (data && req.body.Quantity) {
        Stock.findOneAndUpdate({_id: data._id}, {$set: {Quantity: parseInt(data.Quantity) + parseInt(req.body.Quantity)}}, {new: true}, (err, updated) => {
          if (err) throw err;
          console.log('updated', updated);
          res.render('quote', {stuffs: updated});
        });
      } else if (req.body.Quantity !== undefined) {
        const dbStock = new Stock({
          Symbol: response.body.Symbol,
          Name: response.body.Name,
          LastPrice: response.body.LastPrice,
          Quantity: req.body.Quantity/* + found.Quantity*/
        });
        dbStock.save((err, _stock) => {
          if (err) throw err;
          console.log("_stock", _stock);
          res.render(`quote`, {stuffs: _stock});
        });
      } else {
        res.render('quote', {stuffs: stock});
      }
    });
  });
};

