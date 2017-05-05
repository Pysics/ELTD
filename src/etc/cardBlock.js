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
    this._touchBlockInfo = null;

    // 滑动块剩余的空间
    this._touchSpace = null;

    // gs.dx的步进
    this._step = 0;
    this._panResponder = null;
  }

 componentWillMount(){
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: ()=> true,
      onPanResponderGrant: ()=>{
        this._left = this.state.left
        this.setState({isTouch: true})
        this._touchSpace = this._containerWidth - this._touchBlockInfo.width
      },
      onPanResponderMove: (evt, gs)=>{
        // 每次移动dx从0记起
        // 按住按钮不动时,dx的值是累加的,即 1, 2, 3, 4, 5这样,但每次left不应该把每一步的值都加上,只需要加相邻两步的差值
        // console.log(gs.dx);
        
        // console.log(this._left);
        
        if ( this._left>=0 && this._touchBlockInfo.x>=0 && this._left <= this._touchSpace && this._touchBlockInfo.x <= this._touchSpace ) {
          this._left += (gs.dx - this._step)
          
          // _left值小于0时使其为0贴边
          if (this._left < 0) {
            this._left = 0
          } else if (this._left > this._touchSpace) {
            this._left = this._touchSpace
          }
          this.setState({
            left: this._left
          })
        }

        // 避免滑块拉到最右边时，_step值很大，再向左移动滑块时步进很大，发生瞬移
        // 滑块拉到中间时保存的步进会用滑块自动归位处理
        if (this._left === 0 || this._left === this._touchSpace) {
          this._step = 0
        } else {
          // 将本次dx值赋予_step
          this._step = gs.dx
        }
        
      },
      onPanResponderRelease: (evt,gs)=>{

        // 设定个中间值决定滑块最终移向哪边
        const middleValue = (this._containerWidth - this._touchBlockInfo.width) / 2
        
        if (this._left <= middleValue) {
          this._left = 0
          this._step = 0
        } else {
          this._left = this._touchSpace
          this._step = 0
        }
        this.setState({
          left: this._left,
          isTouch: false
      })
    }
  })
}

  // _touchIn() {
  //   this.setState({
  //     isTouch: true,
  //   })
  // }

  // _touchOut() {
  //   this.setState({
  //     isTouch: false,
  //   })
  // }

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
                left: this.state.left,
              }
              ]}
            onLayout={ (e) => {this._touchBlockInfo = e.nativeEvent.layout} }
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
    flexDirection: 'row',
  },
  touch: {
  },
  touchContainer: {
    flex: 1.3,
    position: 'relative',
    zIndex: 100,
    backgroundColor: 'rgb(90, 180, 215)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 2
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