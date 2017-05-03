'use strict'

import React from 'react'

import { StackNavigator } from 'react-navigation'

import { Text } from 'react-native'

import ETCScreen from '../etc/index'
import HomeScreen from '../home/index'

import NavRight from './navRight'

export default StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    ETC: {
      screen: ETCScreen,
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

