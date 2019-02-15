'use strict'

// import { createStore } from 'redux'
import expect from 'expect'

const toggleTodo = (todo) => {
  return Object.assign({}, todo, {
    completed: !todo.completed
  })
}

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  }

  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true
  }

  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter)
}

testToggleTodo()
console.log('All tests passed')
