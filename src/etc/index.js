'use strict';

// React
import React from 'react';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { View, Button, TouchableWithoutFeedback, StyleSheet, Image, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class ETCScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'ETC',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // 注意dispatch的格式，参数为对象而不是字符串
    dispatch({type: 'FETCH_ETC_DATA_REQUEST'})
    // console.log(this.props);
    
  }
  

  render() {
    console.log(this.props);
    
    return (
      <Text>111</Text>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.ETCDataState.loading,
    hasData: state.ETCDataState.hasData,
    error: state.ETCDataState.error,
    data: state.ETCDataState.data,
    fetchTime: state.ETCDataState.fetchTime
  };
};

const styles = StyleSheet.create({
  headerRightContainer: {
    borderWidth: 1,
    borderColor: 'red'
  },
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

// 不传递mapDispatchToProps则默认会传递一个dispatch参数，用来手动触发action
export default connect(mapStateToProps)(ETCScreen)