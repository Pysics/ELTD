'use strict'

// React
import React from 'react'

// Navigation
import { addNavigationHelpers } from 'react-navigation'

//Redux
import { connect } from 'react-redux'

import { NavBar } from './navbar'

const mapStateToProps = (state) => {
  console.log(state);
  return {
    navigationState: state.navBar
  }
}

class Index extends React.Component {

  render(){
    const { dispatch, navigationState } = this.props
    return (
      <NavBar
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState,
          })
        }
      />
    )
  }
}

export default connect(mapStateToProps)(Index)
