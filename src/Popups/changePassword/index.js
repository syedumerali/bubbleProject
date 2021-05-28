import React, { Component } from 'react';
import { View, Modal, Image, ImageBackground } from 'react-native';
import styles from './styles';
import { icons, assets, backgrounds, samplePictures } from '../../assets/images';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import Button from '../../Components/Button';
import TouchableHOC from '../../Components/TouchableHOC';

import TextRegular from '../../Components/TextRegular';
import TextSemi from '../../Components/TextSemi';
import MainInput from '../../Components/MainInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StarRating from 'react-native-star-rating';
import TextMedium from '../../Components/TextMedium';
import { BlurView } from '@react-native-community/blur';
import {
  default_section_Color
} from '../../../config.json';

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: this.props.value ? true : false,
      text: '',
      visible: false,
      imagesShown: false,
      newPassword: '',
      ConfirmPassword: ''
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
  onSuccess = (newpass,confirmpass) => {

   
    this.hide();
    
    if (this.props.onSuccess) {
      this.props.onSuccess(newpass,confirmpass);
      this.setState({
         newPassword:'',
         ConfirmPassword:''
      })
    }
  };
  render() {
    return (
      <Modal
        key={'cbt'}
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
              <Image
                source={icons.key}
                style={styles.checkMark}
                resizeMode="contain"
              />
              <TextMedium style={styles.feedback}>Update Password</TextMedium>

              <MainInput style={styles.field}
              secureTextEntry={true}
              placeholder="New Password"
                onChangeText={(newpw) => {
                  this.setState({
                    newPassword: newpw
                  })
                }}
                value={this.state.newPassword} />
              <MainInput
                style={styles.field}
                secureTextEntry={true}
                placeholder="Re-Type New Password"
                onChangeText={(newConfirmpw) => {

                  this.setState({

                    ConfirmPassword: newConfirmpw
                  })
                }}
                value={this.state.ConfirmPassword}
              />
              <Button
                title="UPDATE"
                onPress={()=> this.onSuccess(this.state.newPassword,this.state.ConfirmPassword)}
                btnContainer={styles.btn}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
