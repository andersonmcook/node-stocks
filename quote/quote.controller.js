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
      Quantity: null
    });

    if (req.body.Quantity) {
      Stock.findOne().sort('-_id').update({Quantity: req.body.Quantity}, (err, raw) => {
        if (err) throw err;
        console.log("raw", raw);
      });

    } else {
      dbStock.save((err, _stock) => {
        if (err) throw err;
        console.log("newObj", _stock);
        // res.render('quote', {stuffs: _stock});
        res.redirect(`/quote/${detail}`);
      });
    }

    // console.log("stuffs", stuffs);
    // const stuffs = response;
    // res.render('quote', {stuffs: response});
    // res.render('quote', {stuffs: stuffs});
  });
};

module.exports.buy = (req, res) => {
  const detail = req.params.detail;
  let url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${detail}`;
  request.get(url, (err, response, html) => {
    if (err) throw err;
    response.body = JSON.parse(response.body);
    const stock = {
      Symbol: response.body.Symbol,
      Name: response.body.Name,
      LastPrice: response.body.LastPrice
    }
    res.render(`quote`, {stuffs: stock});

  })
};

