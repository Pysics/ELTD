'use strict'

// Redux
import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'

import createSagaMiddleware from 'redux-saga'

import rootSaga from '../sagas/requestETCData'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// Navigation
import NavBar from '../index/navbar'

import ETCDataState from '../reducers/ETCDataState'


// Middleware
// const middleware = () => {
//   return applyMiddleware(logger)
// }

const store = createStore(
  combineReducers({
    navBar: (state,action) => NavBar.router.getStateForAction(action, state),
    ETCDataState
  }),
  applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(rootSaga)

export default store;
