import React from 'react';
import {Image, View, ImageBackground} from 'react-native';
import styles from './styles';
import vw from '../../Units/vw';
import vh from '../../Units/vh';
import {Fonts} from '../../assets/fonts';
import {icons, samplePictures} from '../../assets/images/index';
import DropDownPicker from 'react-native-dropdown-picker';
import TextMedium from '../TextMedium';
import CircularBook from '../CircularBook';
import Alert from '../../Popups/Alert';
import Quantity from '../Quantity';
import ProductItem from '../ProductItem';
import TextRegular from '../TextRegular';
import {
  default_font_Color,
  default_placeholderColor
} from '../../../config.json';
export default class CartItem extends React.Component {
  state = {};

  render() {
    return (
      <View style={styles.card}>
        {/* <Image
          source={this.props.item.image}
          style={styles.img}
          resizeMode="contain"
        /> */}

        <View style={styles.details}>
          {this.props.cross ? null : (
            <TouchableHOC style={{alignSelf: 'flex-end'}}>
              <Image
                source={icons.crossBorder}
                style={styles.cross}
                resizeMode="contain"
              />
            </TouchableHOC>
          )}
          <TextMedium style={styles.name}
           >{this.props.item.name}</TextMedium>
          <View style={styles.priceContainer}>
            <CircularBook style={styles.price}>
              $ {this.props.item.price}
            </CircularBook>
          </View>
          <TextRegular
            style={{
              color: default_placeholderColor,
              fontSize: vh * 2,
              textAlign: 'right',
              marginRight: vw * 3,
            }}>
            Quantity:{' '}
            <CircularBook style={{color: default_font_Color, fontSize: vh * 2}}>
              {this.props.item.quantity}
            </CircularBook>
          </TextRegular>
        </View>
      </View>
    );
  }
}
