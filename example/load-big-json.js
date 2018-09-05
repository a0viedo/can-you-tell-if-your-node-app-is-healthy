'use strict';

const fs = require('fs');

function load(cb) {
  fs.readFile('/home/fsociety/Documents/dev/event-loop/citylots.json',{ encoding: 'utf8'} ,(err, result) => {
    cb(err, result);
  });
}

function parse(cb) {
  load((err, result) => {
    if(err) {
      return cb(err);
    }
    cb(null, JSON.parse(result));
  });
}

module.exports.load = load;
module.exports.parse = parse;



