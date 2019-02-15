'use strict'

import { createStore } from 'redux'
// import expect from 'expect'

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const store = createStore(counter)

store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch({ type: 'INCREMENT' })

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
