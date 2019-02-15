'use strict';

// import { createStore } from 'redux'

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toggleTodo = function toggleTodo(todo) {
  todo.completed = !todo.completed;
  return todo;
};

var testToggleTodo = function testToggleTodo() {
  var todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  };

  var todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true
  };

  (0, _expect2.default)(toggleTodo(todoBefore)).toEqual(todoAfter);
};

testToggleTodo();
console.log('All tests passed');