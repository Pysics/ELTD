'use strict'

import React from 'react'

import { StackNavigator } from 'react-navigation'

import { Text } from 'react-native'

import ETCScreen from '../pages/etc/index'
import HomeScreen from '../pages/home/index'
import LoginScreen from '../pages/login/index'

import NavRight from './navRight'

export default StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    ETC: {
      screen: ETCScreen,
    },
    Login: {
      screen: LoginScreen
    }
  },
  {
    // headerMode: 'none',
    navigationOptions: (navigation) => {
      // const { pageTitle } = navigation.navigation.state.params || null
      const { params } = navigation.navigation.state;
      // console.log(params)
      return {
        title: params !== undefined ? params.pageTitle : '易路通达',
        headerRight: <NavRight />,
        headerTitleStyle: {
          alignSelf: 'center'
        }
      }
    }
  }
);

