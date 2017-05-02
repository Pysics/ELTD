'use strict'

// React
import React from 'react'
import { StackNavigator } from 'react-navigation'

import { Button } from 'react-native'

import MyProfileScreen from '../sec'

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  }

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Profile', {name: 'Lucy'})}
        title="Go to Lucy's profile"
      />
    );
  }
}


export default StackNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Profile: {
    screen: MyProfileScreen,
  }
});

