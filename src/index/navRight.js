import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'


class NavRight extends Component {
  render() {
    return (
        <View style={styles.headerRightContainer}>
          <TouchableWithoutFeedback>
            <Icon name="commenting-o" size={27} color="#333" />
          </TouchableWithoutFeedback>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  headerRightContainer: {
    borderWidth: 1,
    borderColor: 'blue',
    paddingRight: 10,
  },
})

export default NavRight;