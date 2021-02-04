#!/usr/bin/env node

//
// https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
//
const request = require('request');

request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.url);
  console.log(body.explanation);
});


const got = require('got');

got('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }).then(response => {
  console.log(response.body.url);
  console.log(response.body.explanation);
}).catch(error => {
  console.log(error.response.body);
});

