'use strict';

// import { createStore } from 'redux'

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addCounter = function addCounter(list) {
  list.push(0);
  return list;
};

var testAddCounter = function testAddCounter() {
  var listBefore = [];
  var listAfter = [0];
  (0, _expect2.default)(addCounter(listBefore)).toEqual(listAfter);
};

testAddCounter();
console.log('All tests passed');