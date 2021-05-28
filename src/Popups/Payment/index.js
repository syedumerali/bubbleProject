import React, {Component} from 'react';
import {View, Modal, Image, ImageBackground} from 'react-native';
import styles from './styles';
import {icons, assets, backgrounds, samplePictures} from '../../assets/images';

import Button from '../../Components/Button';
import TouchableHOC from '../../Components/TouchableHOC';

import TextRegular from '../../Components/TextRegular';
import TextSemi from '../../Components/TextSemi';
import MainInput from '../../Components/MainInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BlurView} from '@react-native-community/blur';
import vw from '../../Units/vw';
import vh from '../../Units/vh';
import {
  default_section_Color
} from '../../../config.json'
vh;
export default class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: this.props.value ? true : false,
      text: '',
      visible: false,
      imagesShown: false,
    };
  }

  show = (data) => {
    this.setState((p) => {
      return {
        ...p,
        visible: true,
      };
    });
  };
  hide = () => {
    // console.log("hide");

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
    this.props.onSuccess();
  };
  render() {
    return (
      <Modal
        key={'cbt'}
        visible={this.state.visible}
        transparent={true}
        animationType="fade">
        <BlurView
          style={{position: 'absolute', width: vw * 100, height: vh * 100}}
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
              <Image
                source={icons.cardGreen}
                style={styles.checkMark}
                resizeMode="contain"
              />
              <TextRegular style={styles.text}>Amount</TextRegular>
              <TextSemi style={styles.amount}>$938</TextSemi>
              <MainInput placeholder="Cardholder name" style={styles.input} />
              <MainInput placeholder="Card number" style={styles.input} />
              <MainInput placeholder="CVV Code" style={styles.input} />
              <MainInput
                placeholder="Expiry Date"
                rightIcon={icons.calendar}
                style={styles.input}
              />
              <Button
                btnContainer={styles.yesBtn}
                onPress={this.onSuccess}
                title="PAY"></Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
