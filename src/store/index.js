'use strict'

// Redux
import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'

// Navigation
import NavBar from '../index/navbar'

// Middleware
// const middleware = () => {
//   return applyMiddleware(logger)
// }

export default createStore(
  combineReducers({
    navBar: (state,action) => NavBar.router.getStateForAction(action, state),
  }),
  applyMiddleware(logger)
)
