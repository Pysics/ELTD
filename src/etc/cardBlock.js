import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, PanResponder, Animated } from 'react-native'


class CardBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      isTouch: false,
    }

    this._left = 0;
    this._containerWidth = null;
    this._touchBlockWidth = null;

    // 滑动块剩余的空间
    // this._touchSpace = null;

    // gs.dx的步进
    // this._step = 0;
    // this._panResponder = null;

    this._blockInLeft = true;

    // 不允许双击事件发生
    this._touchTimeStamp = null;
  }

  componentWillMount() {
    this._animatedValue = new Animated.ValueXY()
    this._value = {x: 0}
    this._animatedValue.addListener((value) => this._value = value);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
      onPanResponderGrant: this._handlePanResponderGrant.bind(this),
      onPanResponderMove: this._handlePanResponderMove.bind(this),
      onPanResponderRelease: this._handlePanResponderEnd.bind(this),
      onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
      });
  }
  _handleStartShouldSetPanResponder(e, gestureState){
    // 与上次点击在500ms以内时不处理点击事件
    const tick = new Date().getTime();
    if (tick - this._touchTimeStamp < 500) {
      return false;
    }
    this._touchTimeStamp = tick;
    return true;
  }
  _handleMoveShouldSetPanResponder(e, gestureState){
    return true;
  }
  _handlePanResponderGrant(e, gestureState){
    this._animatedValue.setOffset({x: this._value.x});
    this._animatedValue.setValue({x: 0});
  }

  _handlePanResponderMove(e, gestureState) {
    // console.log(this._animatedValue.x);
    
    let canTouchLength = this._containerWidth - this._touchBlockWidth
    
    // 在边界处不可向己边滑动
    if ( (this._blockInLeft && gestureState.dx > 0 && gestureState.dx < canTouchLength) || (!this._blockInLeft && gestureState.dx < 0 && gestureState.dx > -canTouchLength) ) {
      this._animatedValue.setValue({x: gestureState.dx})
    }
    
    // Animated.event([
    //     null, {dx: this._animatedValue.x}
    // ])
  }

  _handlePanResponderEnd(e, gestureState){

    let canTouchLength = this._containerWidth - this._touchBlockWidth

    

    // 偏移
    // gestureState.moveX有移动才会有值，点击的话值为0
    let moveDistance = gestureState.moveX !== 0 ? gestureState.moveX - gestureState.x0 : 0;
    
    
    // 确定移动方向
    const toRight = moveDistance>0 ? true : false;

    // 取移动距离
    moveDistance = Math.abs(moveDistance)
    
    // 设定个中间值决定滑块最终移向哪边
    const middleValue = canTouchLength / 2

    // endValue是有累加性的，即新动画始终从当前位置计算
    // 所以，向右移动时，中点以前为0，过了中点为最大值
    // 再向左移动时，中点以前为0（即不移动），过了中点为最大值的反向
    let endValue = 0

    // 防止还是能拖出边界，给第二个条件加上 this._blockInLeft 的判断      
    if ( (this._blockInLeft && moveDistance === 0) || (toRight && this._blockInLeft && (moveDistance > middleValue)) ) {
      endValue = canTouchLength
      this._blockInLeft = false
    } else if ( (!this._blockInLeft && moveDistance === 0) || (!toRight && !this._blockInLeft && (moveDistance > middleValue)) ) {
      endValue = -canTouchLength
      this._blockInLeft = true
    }
    // console.log(moveDistance);

    // console.log(middleValue);
    

    // console.log(toRight);
    
    // console.log(endValue);
    
    
    Animated.spring(this._animatedValue, {
      toValue: endValue,
      tension: 80
    }).start();
  }


  render() {
    const data = this.props.data;
    
    return (
      <View
        style={styles.container}
        onLayout={ (e) => {this._containerWidth = e.nativeEvent.layout.width} }
      >

        {/*<TouchableOpacity
          onPressIn={this._touchIn.bind(this)}
          onPressOut={this._touchOut.bind(this)}
        >*/}
          <Animated.View
            style={[
              styles.touchContainer,
              {
                transform: [
                  {translateX: this._animatedValue.x}
                ],
              }
              ]}
            onLayout={ (e) => {this._touchBlockWidth = e.nativeEvent.layout.width} }
            {...this._panResponder.panHandlers}
          >
            <Image
              source={require('./imgs/car.png')}
              style={styles.car}
            />
            <View style={styles.titleWrap}>
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.summary_all}>{data.summary_all}元</Text>
            </View>
            {/*touchContainer end*/}
          </Animated.View>
        {/*</TouchableOpacity>*/}

        <View style={styles.cardInfo, {opacity: this.state.isTouch ? 0.5 : 1,}}>
          <View style={styles.cardInfoTop}>
            <View style={styles.descTitlewrap}>
              <Text style={styles.descTitle}>{data.tab1.desc}</Text>
            </View>
            <View style={styles.cardSummaryWrap}>
              <Text style={styles.cardSummary}>共{data.tab1.cards.length}张</Text>
              <Text style={[styles.cardSummary, styles.cardSummaryMoney]}>共消费{data.tab1.summary_each}元</Text>
            </View>
            {/*cardInfoTop end*/}
          </View>
          <View style={styles.cardInfoDivision}>
            {/*cardInfoDivision end*/}
          </View>
          <View style={styles.cardInfoBottom}>
            <Text>{data.tab1.cards[0].card1}</Text>
            {/*cardInfoBottom end*/}
          </View>
          {/*cardInfo end*/}
        </View>
        
        {/*container end*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    backgroundColor: 'rgb(37, 108, 136)',
    marginBottom: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'red',
    flexDirection: 'row',

  },
  touch: {
  },
  touchContainer: {
    flex: 1.3,
    position: 'relative',
    backgroundColor: 'rgb(90, 180, 215)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 2,
    zIndex: 100,
    // shadowColor: 'black',
    // shadowRadius: 2,
    // shadowOpacity: 1,

  },
  title: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  summary_all: {
    color: '#fff',
    fontSize: 11,
  },
  car: {
    width: 30,
    height: 30,
    // borderWidth: 1,
    // borderColor: 'blue'
  },
  titleWrap: {
    alignItems: 'center',
  },
  cardInfo: {
    flex: 3,
  },
  cardInfoTop: {
    flexDirection: 'row',
    height: 28,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  descTitleWrap: {
    // flex: 1,
  },
  descTitle: {
    color: '#fff',
  },
  cardSummaryWrap: {
    // flex: 1,
    flexDirection: 'row',
    marginRight: 15,
  },
  cardSummary: {
    color:  '#fff',
    fontSize: 11,
  },
  cardSummaryMoney: {
    marginLeft: 10,
  },
  cardInfoDivision: {
    borderTopWidth: 2,
    borderColor: '#fff',
    borderStyle: 'dotted',
  }

})

export default CardBlock;