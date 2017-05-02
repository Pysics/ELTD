'use strict'

import { StackNavigator } from 'react-navigation'

import MyProfileScreen from '../sec/index'
import MyHomeScreen from '../home/index'

export default StackNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Profile: {
    screen: MyProfileScreen,
  }
});

