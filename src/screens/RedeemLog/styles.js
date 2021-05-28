import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {
  primaryColor,
  secondaryColor,
  default_font_Color,
  default_section_Color,
  defaultShadowColor
} from '../../../config.json';

export default StyleSheet.create({
  iconContainer: {
    backgroundColor: default_section_Color,
    width: vw * 12,
    height: vw * 12,
    borderRadius: vw * 6,
    shadowColor: defaultShadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sort: {
    color: default_font_Color,
    fontSize: vh * 2,
    marginLeft: 6 * vw,
    marginTop: 2 * vh,
  },
  calendar: {
    width: 4 * vw,
    height: 4 * vw,
    resizeMode: 'contain',
    tintColor: primaryColor,
  },
  from: {
    color: '#CCCCCC',
    fontSize: vh * 1.7,
  },
  butcon: {
    backgroundColor: '#E6E6E6',
    width: 30 * vw,
    marginTop: vh,
    elevation: 0,
    marginBottom: vh,
    height: 5 * vh,
  },
  box: {
    backgroundColor: default_section_Color,
    width: 44 * vw,
    justifyContent: 'center',
    borderColor: '#E6E6E6',
    borderWidth: 0.5 * vw,

    borderRadius: 3 * vh,
    height: 6 * vh,
  },
  points: {
    color: default_font_Color,
    fontSize: vh * 2.5,
  },
  price: {color: secondaryColor, fontSize: vh * 2.5},
  icon: {width: vw * 5.5, height: vh * 3.5},
});
