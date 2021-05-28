import React, {Component} from 'react';
import {View, Modal, Image, ImageBackground} from 'react-native';
import styles from './styles';
import {icons, assets} from '../../assets/images';
import {BlurView} from '@react-native-community/blur';
import Button from '../../Components/Button';
import TouchableHOC from '../../Components/TouchableHOC';

import TextRegular from '../../Components/TextRegular';

import vw from '../../Units/vw';
import vh from '../../Units/vh';

import {secondaryColor, default_section_Color} from '../../../config.json';

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

  show = () => {
    console.log('show');
    // this.setState((p) => {

    //   return {
    //     //...p,
    //     visible: true,
    //   };
    // });
    this.setState(
      {
        visible: true,
      },
      () => console.log('h', this.state.visible),
    );
  };
  hide = () => {
    console.log('hide');

    this.setState((p) => {
      return {
        ...p,
        visible: false,
      };
    });
    if (this.props.redeemSuccess) {
      this.props.redeemSuccess();
    }
  };
  onCross = () => {
    this.hide();
    if (this.props.onCross) {
      this.props.onCross();
    }
  };
  onSuccess = () => {
    this.hide();
    if (this.props.onSuccess) {
      this.props.onSuccess();
    }
  };
  render() {
    console.log('text', this.state.visible);
    return (
      <Modal
        key={'cbdfdfczcxzt'}
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
                source={this.props.icon ? this.props.icon : assets.checkcircle}
                style={styles.checkMark}
                resizeMode="contain"
              />
              <TextRegular style={styles.text}>{this.props.text}</TextRegular>
              {this.props.onSuccess2 ? (
                <View style={styles.btnsContainer}>
                  <Button
                    btnContainer={styles.yesBtn}
                    onPress={this.onSuccess}
                    title="Yes"></Button>
                  <Button
                    btnContainer={styles.noBtn}
                    labelStyle={{color: secondaryColor}}
                    onPress={this.hide}
                    title="No"></Button>
                </View>
              ) : this.props.onSuccess ? (
                <Button
                  btnContainer={[
                    styles.request,
                    this.props.btntxt ? {width: '50%'} : {},
                  ]}
                  onPress={this.onSuccess}
                  title={this.props.btntxt ? this.props.btntxt : 'OK'}></Button>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
