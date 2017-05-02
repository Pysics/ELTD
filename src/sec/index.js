'use strict'

// React
import React from 'react'

import { Button } from 'react-native'


export default class MyProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  }

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Home', {name: 'Lucy'})}
        title="Go to Lucy's Home"
      />
    );
  }
}


