import React from 'react';
import {Text, View, TextInput} from 'react-native';
import TextMedium from '../TextMedium';
import styles from './styles';
import Ripple from 'react-native-material-ripple';
import IconButton from '../IconButton';
import {icons} from '../../assets/images';
import vh from '../../Units/vh';
import TextRegular from '../TextRegular';

class MainInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  toggle = () => {
    this.setState({show: !this.state.show});
  };
  renderEye = () => {
    if (this.props.secureTextEntry === true) {
      return (
        <IconButton
          hitSlop={{
            top: 5,
            bottom: 5,
          }}
          onPress={this.toggle}
          iconStyle={styles.rightIcon}
          icon={this.state.show === false ? icons.eyecross : icons.eye}
        />
      );
    }
  };
  renderLabel = () => {
    if (this.props.label) {
      return (
        <View style={[styles.labelContainer, this.props.labelContainer]}>
          <TextRegular style={styles.label}>{this.props.label}</TextRegular>
        </View>
      );
    }
  };
  render() {
    var secure = false;
    if (this.props.secureTextEntry === true && this.state.show === false) {
      secure = true;
    } else {
      secure = false;
    }
    return (
      <>
        {this.renderLabel()}
        <View style={[styles.container, this.props.style]}>
          {this.props.leftIcon && (
            <IconButton
              iconStyle={styles.leftIcon}
              icon={this.props.leftIcon}
            />
          )}
          <TextInput
            placeholderTextColor="#CCCCCC"
            {...this.props}
            
            secureTextEntry={secure}
            style={[styles.field, this.props.fieldStyle]}
          />
          {this.renderEye()}
          {this.props.rightIcon && (
            <IconButton
              iconStyle={styles.rightIcon}
              icon={this.props.rightIcon}
            />
          )}
        </View>
      </>
    );
  }
}
export default MainInput;
