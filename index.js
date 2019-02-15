'use strict'

// import { createStore } from 'redux'
import expect from 'expect'

const addCounter = list => [...list, 0]

const removeCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ]
}

const testAddCounter = () => {
  const listBefore = []
  const listAfter = [0]
  expect(
    addCounter(listBefore)
  ).toEqual(listAfter)
}

const testRemoveCounter = () => {
  const listBefore = [0, 10, 20]
  const listAfter = [0, 20]
  expect(
    removeCounter(listBefore, 1)
  ).toEqual(listAfter)
}

testAddCounter()
testRemoveCounter()
console.log('All tests passed')
