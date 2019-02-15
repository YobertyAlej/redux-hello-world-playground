'use strict';

var _redux = require('redux');

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var todo = function todo(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return Object.assign({}, state, {
        completed: !state.completed
      });
    default:
      return state;
  }
};

var todos = function todos() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_TODO':
      return [].concat(_toConsumableArray(state), [todo(undefined, action)]);
    case 'TOGGLE_TODO':
      return state.map(function (t) {
        return todo(t, action);
      });
    default:
      return state;
  }
};

var visibilityFilter = function visibilityFilter() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'SHOW_ALL';
  var action = arguments[1];

  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

var todoApp = function todoApp() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  };
};

var testAddTodo = function testAddTodo() {
  var stateBefore = [];
  var action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };
  var stateAfter = [{
    id: 0,
    text: 'Learn Redux',
    completed: false
  }];

  (0, _expect2.default)(todos(stateBefore, action)).toEqual(stateAfter);
};

var testToggleTodo = function testToggleTodo() {
  var stateBefore = [{
    id: 0,
    text: 'Learn Redux',
    completed: false
  }, {
    id: 1,
    text: 'Go shopping',
    completed: false
  }];

  var action = {
    type: 'TOGGLE_TODO',
    id: 1,
    text: 'Go shopping',
    completed: true
  };

  var stateAfter = [{
    id: 0,
    text: 'Learn Redux',
    completed: false
  }, {
    id: 1,
    text: 'Go shopping',
    completed: true
  }];

  (0, _expect2.default)(todos(stateBefore, action)).toEqual(stateAfter);
};

var store = (0, _redux.createStore)(todoApp);

testAddTodo();
testToggleTodo();

console.log('All tests passed');
console.log('------------');
console.log(store.getState());