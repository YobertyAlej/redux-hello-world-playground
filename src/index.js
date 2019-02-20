'use strict'

import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'

let nextTodoId = 0
const addTodo = text => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

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

const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{ children }</span>
  }
  return (
    <a href='#' onClick={e => {
      e.preventDefault()
      onClick()
    }}>{ children }</a>
  )
}

class FilterLink extends React.Component {
  componentDidMount () {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount () {
    this.unsubscribe()
  }
  render () {
    const props = this.props
    const { store } = this.context
    const state = store.getState()

    return (
      <Link
        active={ props.filter === state.visibilityFilter }
        onClick={ () =>
          store.dispatch(setVisibilityFilter(props.filter))
        }
      >
        { props.children }
      </Link>
    )
  }
}

FilterLink.contextTypes = {
  store: React.PropTypes.object
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

const AddTodo = (props) => {
  let input

  return (
    <div>
      <input ref={node => {
        input = node
      }}></input>
      <button onClick={() => {
        store.dispatch(addTodo(input.value))
        input.value = ''
      }}>
        Add todo +
      </button>
    </div>
  )
}

const Footer = () => {
  return (
    <p>
      Show:
      {' '}
      <FilterLink filter='SHOW_ALL'>ALL</FilterLink>
      {', '}
      <FilterLink filter='SHOW_ACTIVE'>ACTIVE</FilterLink>
      {', '}
      <FilterLink filter='SHOW_COMPLETED'>COMPLETED</FilterLink>
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

class VisibleTodoList extends React.Component {
  componentDidMount () {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    const props = this.props
    const { store } = this.context
    const state = store.getState()

    return (
      <TodoList
        todos={
          getVisibleTodos(
            state.todos,
            state.visibilityFilter
          )
        }
        onTodoClick={id =>
          store.dispatch(toggleTodo(id))
        }
      />
    )
  }
}

VisibleTodoList.contextTypes = {
  store: React.PropTypes.object
}

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

class Provider extends React.Component {
  getChildContext () {
    return {
      store: this.props.store
    }
  }

  render () {
    return this.props.children
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object
}

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)
