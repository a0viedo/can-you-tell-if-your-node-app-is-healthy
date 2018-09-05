'use strict';
const http = require('http');
const { load, parse } = require('.load-big-json');

const server = http.createServer((req, res) => {
  parse((err, result) => {
    if(err) {
      return res.end('error');
    }
    console.log(`${Date.now()} file parsed`);
    res.end(result);
  });
});