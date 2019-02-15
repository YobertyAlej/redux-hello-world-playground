'use strict';

var _redux = require('redux');

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var counter = function counter() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var action = arguments[1];

  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

var store = (0, _redux.createStore)(counter);

/*

Counter Tests

expect(
  counter(0, { type: 'INCREMENT' })
).toEqual(1)
expect(
  counter(1, { type: 'INCREMENT' })
).toEqual(2)
expect(
  counter(2, { type: 'DECREMENT' })
).toEqual(1)
expect(
  counter(1, { type: 'DECREMENT' })
).toEqual(0)
*/

store.subscribe(function () {
  console.log(store.getState());
});

store.dispatch({ type: 'INCREMENT' });