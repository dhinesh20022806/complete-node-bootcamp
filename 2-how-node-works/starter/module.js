'use strict';
console.log(arguments);
console.log(require('module').wrapper);

const C = require('./test-module-1')
const calc1 = new C();
console.log(calc1.add(5,6));

// exports
// const calc2 = require('./test-module-2')
// console.log(calc2.multiply(2,5));
const {add,multiply,divide} = require('./test-module-2')
console.log(add(5,2));

// caching
require('./test-module-3')()