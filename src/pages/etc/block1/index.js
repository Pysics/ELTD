import React, { Component } from 'react';
import { View, Text } from 'react-native'

class Block1 extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '消费总金额',
    };
  }
  render() {
    return (
      <View><Text>block1</Text></View>
    );
  }
}

export default Block1;