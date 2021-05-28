import React from 'react';
import {Text, View, TextInput} from 'react-native';
import TextMedium from '../TextMedium';
import styles from './styles';
import Ripple from 'react-native-material-ripple';
import IconButton from '../IconButton';
import {icons} from '../../assets/images';
import vh from '../../Units/vh';
import LinearGradient from 'react-native-linear-gradient';

class GradientBg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <LinearGradient
        style={[{flex: 1}, this.props.style]}
        colors={
          this.props.colors
            ? this.props.colors
            : [
                '#82FBFF',
                '#99FBF9',
                '#99FBF9',
                '#D0FBED',
                '#F2FBE5',
                '#FFFCE3',
                '#FDFBE0',
                '#F9F9D7',
                '#F3F6C8',
                '#F3F6C8',
                '#F3F6C8',
                '#DEEB98',
                '#CFE377',
                // '#BDDA4F',
                '#A9D023',
              ]
        }>
        {this.props.children}
      </LinearGradient>
    );
  }
}
export default GradientBg;
