import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'


class NavRight extends Component {
  render() {
    const icon = this.props.navRightIcon
    let element = null

    if (icon === 'message') {
      element =  <Icon name="commenting-o" size={27} color="#333" />
    } else if (icon === null) {
      element = <View></View>
    } else {
      element = <Icon name="search" size={27} color="#333" />
    }
    
    return (
        <View style={styles.headerRightContainer}>
          <TouchableWithoutFeedback>
            {/*{ icon==='message' ? 
              <Icon name="commenting-o" size={27} color="#333" />
              :
              <Icon name="search" size={27} color="#333" />
            }*/}
            { element }
          </TouchableWithoutFeedback>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  headerRightContainer: {
    // borderWidth: 1,
    // borderColor: 'blue',
    paddingRight: 10,
  },
})

export default NavRight;