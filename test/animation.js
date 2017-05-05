import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  Dimensions
} from 'react-native';
var {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window');
export default class touch extends Component{
  componentWillMount() {
    this._animatedValue = new Animated.ValueXY()
    this._value = {x: 0, y: 0}
    this._animatedValue.addListener((value) => this._value = value);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
      onPanResponderGrant: this._handlePanResponderGrant.bind(this),
      onPanResponderMove: Animated.event([
        null, {dx: this._animatedValue.x, dy: this._animatedValue.y}
      ]),
      onPanResponderRelease: this._handlePanResponderEnd.bind(this),
      onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
      });
  }
  _handleStartShouldSetPanResponder(e, gestureState){
    return true;
  }
  _handleMoveShouldSetPanResponder(e, gestureState){
    return true;
  }
  _handlePanResponderGrant(e, gestureState){
    this._animatedValue.setOffset({x: this._value.x, y: this._value.y});
    this._animatedValue.setValue({x: 0, y: 0});
  }
  _handlePanResponderEnd(e, gestureState){
    Animated.spring(this._animatedValue, {
      toValue: 0,
      tension: 80
    }).start();
  }
  
  render() {
    var interpolatedColorAnimation = this._animatedValue.y.interpolate({
      inputRange: [- deviceHeight, deviceHeight],
      outputRange: ['rgba(225,0,0,1)', 'rgba(225,0,225,1)'],
      extrapolate: 'clamp'
    });
    var interpolatedRotateAnimation = this._animatedValue.x.interpolate({
      inputRange: [0, deviceWidth/2, deviceWidth],
      outputRange: ['-360deg', '0deg', '360deg']
    });
    return (
      <View style={styles.container}>
        <Animated.View 
          style={[
              styles.box, 
              {
                transform: [
                  {translateX: this._animatedValue.x},
                  {translateY: this._animatedValue.y},
                  {rotate: interpolatedRotateAnimation}
                ],
                backgroundColor: interpolatedColorAnimation
              }
            ]} 
            {...this._panResponder.panHandlers} 
          />
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    width: 100,
    height: 100
  }
});
