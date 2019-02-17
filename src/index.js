'use strict'

import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        completed: !state.completed
      })
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action))
    default:
      return state
  }
}

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
        )
        return nextState
      },
      {}
    )
  }
}

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

const store = createStore(todoApp)

const FilterLink = ({
  filter,
  currentFilter,
  children,
  onClick
}) => {
  if (filter === currentFilter) {
    return <span>{children}</span>
  }
  return (
    <a href='#' onClick={e => {
      e.preventDefault()
      onClick(filter)
    }}>{ children }</a>
  )
}

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li onClick={onClick} style={{
    textDecoration: completed ? 'line-through' : 'none',
    cursor: 'pointer'
  }}>
    {text}
  </li>
)

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {
      todos.map(todo =>
        <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)}/>
      )
    }
  </ul>
)

const AddTodo = ({
  onAddClick
}) => {
  let input

  return (
    <div>
      <input ref={node => {
        input = node
      }}></input>
      <button onClick={() => {
        onAddClick(input.value)
        input.value = ''
      }}>
        Add todo +
      </button>
    </div>
  )
}

const Footer = ({
  visibilityFilter,
  onFilterClick
}) => {
  return (
    <p>
      Show:
      {' '}
      <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter} onClick={onFilterClick}>ALL </FilterLink>
      <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter} onClick={onFilterClick}>ACTIVE </FilterLink>
      <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter} onClick={onFilterClick}>COMPLETED </FilterLink>
    </p>
  )
}

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      )
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      )
  }
}

let nextTodoId = 0
const TodoApp = ({
  todos,
  visibilityFilter
}) => (
  <div>
    <AddTodo onAddClick={text => {
      store.dispatch({
        type: 'ADD_TODO',
        text,
        id: nextTodoId++
      })
    }}/>
    <TodoList
      todos={getVisibleTodos(
        todos,
        visibilityFilter
      )}
      onTodoClick={id => {
        store.dispatch({
          type: 'TOGGLE_TODO',
          id
        })
      }}
    />
    <Footer
      visibilityFilter={visibilityFilter}
      onFilterClick={filter =>
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })}
    />
  </div>
)

const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()}/>,
    document.getElementById('root')
  )
}

store.subscribe(render)
render()
