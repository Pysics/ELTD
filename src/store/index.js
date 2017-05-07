'use strict'

// Redux
import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'

import createSagaMiddleware from 'redux-saga'

import rootSaga from '../sagas/requestETCData'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// Navigation
import Nav from '../index/nav'

import ETCDataState from '../reducers/ETCDataState'


// Middleware
// const middleware = () => {
//   return applyMiddleware(logger)
// }

const store = createStore(
  combineReducers({
    nav: (state,action) => Nav.router.getStateForAction(action, state),
    ETCDataState
  }),
  applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(rootSaga)

export default store;
