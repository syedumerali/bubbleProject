import {StyleSheet} from 'react-native';
import vw from '../../Units/vw';
import vh from '../../Units/vh';
import {Fonts} from '../../assets/fonts';
import {secondaryColor} from '../../../config.json';
import {
  default_font_Color,
  default_section_Color,
  defaultShadowColor,
  orderStatusColor
} from '../../../config.json'

export default StyleSheet.create({
  card: {
    width: 90 * vw,
    backgroundColor: default_section_Color,
    shadowColor: defaultShadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderRadius: vw * 1,
    elevation: 3,
    paddingHorizontal: vw * 4,
    paddingVertical: vh * 1.5,

    marginBottom: vh * 2,
  },
  butcon: {
    backgroundColor: orderStatusColor,
    width: 25 * vw,

    // marginBottom:vh,
    height: 4.5 * vh,
  },
  des: {
    color: default_font_Color,
    fontSize: vh * 1.7,

    width: 55 * vw,
  },
  price: {color: secondaryColor, fontSize: vh * 2.7},
  img: {width: vh * 15, height: vh * 15, resizeMode: 'contain'},
});
