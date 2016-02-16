/* eslint-disable */
'use strict';

const request = require('request');

module.exports.index = (req, res) => {
  res.render('quote');};

module.exports.new = (req, res) => {
  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${req.body.symbol}`
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
    console.log(stuffs);
    // const stuffs = response;
    // res.render('quote', {stuffs: response});
    res.render('quote', {stuffs: stuffs});
  });
};
