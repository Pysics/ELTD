'use strict';

// React
import React from 'react';

import { View, Button, TouchableWithoutFeedback, StyleSheet, Image, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const myIcon = <Icon name="rocket" size={30} color="#900" />;

export default class MyHomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: '易路通达',
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    
    return (
      <View style={styles.body}>
        {/*{myIcon}*/}
        {/*<Button
          onPress={() => this.props.navigation.navigate('Profile', {name: 'Lucy'})}
          title="Go to Lucy's profile"
        />*/}
        <View style={styles.top}>
          <Image
              source={require('./imgs/top.png')}
              resizeMode='stretch'
              style={styles.topImg}
          />
        </View>
        <View style={styles.bottom}>
          <Image
              source={require('./imgs/bottom.png')}
              resizeMode='stretch'
              style={styles.bottomImg}
          />
          <TouchableWithoutFeedback
            onPress = { () => navigate('ETC', {pageTitle: 'ETC'}) }
          >
            <View
              style={styles.etc}
            >
              <Text style={{display: 'none'}}>ETC</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  top: {
    flex: 1
  },
  bottom: {
    flex: 2
  },
  topImg: {
    flex: 1,
    width: '100%'
  },
  bottomImg: {
    flex: 1,
    width: '100%'
  },
  etc: {
    width: '40%',
    height: '25%',
    left: '30%',
    position: 'absolute',
    bottom: 0,
    borderWidth: 1,
    borderColor: 'red',
  }
});