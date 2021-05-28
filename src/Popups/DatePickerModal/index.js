import React, { Component } from 'react';
import { View, Modal, Image, ImageBackground } from 'react-native';
import styles from './styles';
import { icons, assets } from '../../assets/images';
import { BlurView } from '@react-native-community/blur';
import Button from '../../Components/Button';
import TouchableHOC from '../../Components/TouchableHOC';
import DatePicker from 'react-native-date-picker'
import TextRegular from '../../Components/TextRegular';
import moment from 'moment';
import vw from '../../Units/vw';
import vh from '../../Units/vh';
import {
    default_section_Color
} from '../../../config.json'

export default class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: this.props.value ? true : false,
            text: '',
            pickDate: new Date(),
            visible: false,
            imagesShown: false,
        };
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
    hide = () => {
        console.log("hide");

        this.setState((p) => {
            return {
                ...p,
                visible: false,
            };
        });
    };
    onCross = () => {
        this.hide();
        if (this.props.onCross) {
            this.props.onCross();
        }
    };
    onSuccess = () => {
        this.hide();
        // this.setState({
        //     pickDate: moment(this.state.pickDate).format('DD MMM YYYY'),
        // },()=> this.props.onSuccess(this.state.pickDate))
       
        this.props.onSuccess(this.state.pickDate)
    };
    onConfirm = (date) => {
        this.setState({ pickDate: date });
    };
    render() {

        console.log('text', this.state.visible)
        return (
            <Modal
                key={'cbdfdfczcxzt'}
                visible={this.state.visible}
                transparent={true}
                animationType="fade">
                <BlurView
                    style={{ position: 'absolute', width: vw * 100, height: vh * 100 }}
                    blurType="light"
                    blurAmount={5}
                    reducedTransparencyFallbackColor={default_section_Color}
                />
                <View style={styles.modalTouchable}>
                    <View style={styles.imageBg}>
                        <TouchableHOC style={styles.crossContainer} onPress={this.onCross}>
                            <Image
                                source={icons.cross}
                                style={styles.cross}
                                resizeMode="contain"
                            />
                        </TouchableHOC>
                        <View style={styles.container}>
                            <DatePicker
                                date={this.state.pickDate}
                                mode='date'
                                style={{}}
                                onDateChange={this.onConfirm}
                            />
                             <Button title='Save'
                             onPress={()=> this.onSuccess()}
                              btnContainer={styles.butcon}
                labelStyle={{color:'#CBCBCB',fontSize:2.2*vh}}
                />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
