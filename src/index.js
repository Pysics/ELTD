'use strict';

// React
import React from 'react'
// Redux
import { Provider } from 'react-redux'
import store from './store'
// Navigation
import Index from './index'

export default class App extends React.Component {
  render(){
    return(
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}
