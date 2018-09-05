'use strict';

const { load, parse } = require('./load-big-json');
setInterval(() => {
  parse((err, result) => {
    if(err) {
      throw err;
    }
    console.log(`${Date.now()} file parsed`);
  });
}, 15000);
