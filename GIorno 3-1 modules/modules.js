const Calculator = require('./test-module-1'); // so we're importing a dev module, a personal module 

/* console.log(arguments);
console.log(require('module').wrapper); */

const C = Calculator;

// module.exports
const calc1 = new C(); // a new istance, just like js
console.log(calc1.add(2, 5))

// exports
const calc2 = require('./test-module-2');
console.log(calc2.multiply(2,5));

const { add, multiply } = require('./test-module-2'); // or in this way
console.log(multiply(2, 5))

// catching 
require('./test-module-3')(); // with the () we will execute it 
require('./test-module-3')();
require('./test-module-3')();
// 'hello from the module' will be executed just on time 