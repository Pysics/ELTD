'use strict';

// React
import React from 'react';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { View, Button, TouchableWithoutFeedback, StyleSheet, Image, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import * as Actions from '../actions/requestETCData'

class ETCScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'ETC',
    };
  }

  componentDidMount() {
    this.props.actions.fetchData();
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

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(ETCScreen)