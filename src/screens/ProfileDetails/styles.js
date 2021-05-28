import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {
  primaryColor,
  secondaryColor,
  default_text_color,
  sideBarInActiveItemColor,
  textBoxBorderColor
} from '../../../config.json';

export default StyleSheet.create({
  label: {color: sideBarInActiveItemColor, fontSize: vh * 1.6},
  userfield: {
    color: default_text_color,
    fontSize: vh * 2,
    borderBottomWidth: vw * 0.09,
    borderColor: textBoxBorderColor,
    paddingVertical: vh * 1,
    marginBottom: vh * 1.5,
  },
  box: {
    width: '100%',
    marginTop: vh * 1,
    borderWidth: vw * 0.4,
    borderRadius: 3 * vh,
    marginBottom: vh * 1.5,
    height: 6 * vh,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderColor: 'rgba(0,0,0,.2)',
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
  biotext: {
    color: default_text_color,
    fontSize: vh * 2,
    marginLeft: vw,
  },
  smallcircle: {
    width: 4 * vw,
    height: 4 * vw,
    borderRadius: 2 * vw,
    backgroundColor: secondaryColor,
  },
  circle: {
    width: 6 * vw,
    height: 6 * vw,
    resizeMode: 'contain',
  },
  changePassword: {
    color: secondaryColor,
    fontSize: vh * 1.5,
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginTop: vh * 1.5,
    marginBottom: vh * 1.5,
  },
  btn: {marginTop: vh * 2},
  input: {
    width: '100%',
    marginTop: vh * 1,
    marginBottom: vh * 1.5,
    borderColor: 'rgba(0,0,0,.2)',
  },
});
