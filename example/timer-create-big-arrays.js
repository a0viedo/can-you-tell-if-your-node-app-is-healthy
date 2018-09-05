'use strict';

setInterval(() => {
  Array(10000000).join('a');
}, 500);
 
setInterval(() => {
  Array(100000000).join('a');
}, 3000);
