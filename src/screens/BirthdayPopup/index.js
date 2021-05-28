import React, { Component } from 'react'
import {
    View,
    Text,
    Animated,
    Easing,
    TouchableOpacity, Modal, LayoutAnimation
} from 'react-native'

import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import GradientBg from '../../Components/GradientBg';
import { connect } from 'react-redux';

import celebAnim from './celebAnim.json'
import LottieView from 'lottie-react-native';
import vw from '../../Units/vw';
import vh from '../../Units/vh';


class PointsEarnedScreen extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props)
        this.progress = new Animated.Value(0);
        this.textAnim = new Animated.Value(1);

        this.state = {
            point: 0,
            visible: false,
            totalPoint: 0,
            count: 0,
            showButton: false
        }

    }



    show = () => {
        console.log('show')
        // this.setState((p) => {


        //   return {
        //     //...p,
        //     visible: true,
        //   };
        // });
        this.setState({
            visible: true
        }, () => console.log('h', this.state.visible))

    };
    // showPoints = () => {
    //     console.log('this.props.Store.userAwardedPoints sp ', this.props.Store.userAwardedPoints, ' count ', this.state.count, '  length ', this.props.Store.userAwardedPoints.length);

    //     if (this.state.count < this.props.Store.userAwardedPoints.length) {



    //         if (this.state.count == 0) {

    //             this.setState({
    //                 point: this.props.Store.userAwardedPoints[this.state.count].earned,
    //                 totalPoint: this.props.Store.userAwardedPoints[this.state.count].total_point,
    //                 count: this.state.count + 1
    //             },
    //                 this._startPointsAnim

    //             )
    //         }

    //         else {

    //             setTimeout(() => {
    //                 this.setState({
    //                     point: this.props.Store.userAwardedPoints[this.state.count].earned,
    //                     totalPoint: this.props.Store.userAwardedPoints[this.state.count].total_point,
    //                     count: this.state.count + 1
    //                 }, this._startPointsAnim)

    //             }, 100)
    //         }
    //     }

    //     else {
    //         LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    //         this.setState({
    //             showButton: true
    //         })

    //     }


    // }



    componentDidMount() {


        this._startAnim();

    }




    _startPointsAnim = () => {

        this.textAnim.setValue(0)

        Animated.spring(this.textAnim, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            friction: 2,
            useNativeDriver: true
        })
            .start(this.showPoints)

    }


    _startAnim = () => {
        this.progress.setValue(0)

        Animated.timing(this.progress, {
            toValue: 0.5,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true
        })
            .start(this._startAnim)

    }

    hide = () => {
        console.log("hide");

        this.setState((p) => {
            return {
                ...p,
                visible: false,
            };
        });

    }
    render() {


        const transformStyle = {
            transform: [{
                scale: this.textAnim,
            }]
        }




        return (


            <Modal
                visible={this.state.visible}
                animationType='fade'
                // visible={this.props.Store.userAwardedPoints.length > 0 ? true : false}
                key="points earned"
                style={styles.container}>


<LinearGradient style={styles.mainBox} colors={['#161948', '#2B318F']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                    <Text style={styles.headingTxt}>Happy Birthday</Text>
                    <Text style={styles.mainTxt}>To</Text>
                    <Text style={[styles.mainTxt,{  fontSize: 4 * vh,}]}>{this.props?.users?.firstname + ' '+this.props?.users?.lastname}</Text>


                    <View style={styles.pointsMain}>
                        <Text style={styles.totalPntTxt}>from</Text>
                        <Text style={styles.totalPntTxt2}>Bubble Leaf</Text>
                    </View>

                    <LottieView
                        resizeMode='cover'
                        ref={animation => {
                            this.animation = animation;
                        }}
                        source={celebAnim}
                        progress={this.progress}
                        style={{ height: 100 * vh, width: 100 * vw, backgroundColor: 'transparent', position: 'absolute', top: 0, left: 0 }}
                    />

                    {/* <Text style={styles.mainTxt}>here are some ways to earn more points rite now</Text> */}

                    <TouchableOpacity style={styles.topBtnMain} onPress={this.hide} >
                        <Text style={styles.topBtnMaintxt}>OK</Text>
                    </TouchableOpacity>

                    </LinearGradient>


            </Modal>
        )

    }
}


const mapStates = state => {

    console.log('state', state)
    return {
  
      products: state.product.products,
      loading: state.category.loading,
      users: state.user.users,
      userID:state.user.userid,
      coupons: state.coupons.listcoupons,
      about: state.product.aboutus
  
    };
  }
  
  export default connect(mapStates,null,null, { forwardRef: true })(PointsEarnedScreen);