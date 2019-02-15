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

const incrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)
  ]
}

// tests

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

const testIncrementCounter = () => {
  const listBefore = [0, 10, 20]
  const listAfter = [0, 11, 20]

  expect(
    incrementCounter(listBefore, 1)
  ).toEqual(listAfter)
}

testAddCounter()
testRemoveCounter()
testIncrementCounter()
console.log('All tests passed')
