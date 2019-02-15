'use strict'

// import { createStore } from 'redux'
import expect from 'expect'

const addCounter = (list) => {
  list.push(0)
  return list
}

const testAddCounter = () => {
  const listBefore = []
  const listAfter = [0]
  expect(
    addCounter(listBefore)
  ).toEqual(listAfter)
}

testAddCounter()
console.log('All tests passed')
