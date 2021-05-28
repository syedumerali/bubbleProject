import {StyleSheet} from 'react-native';
import vw from '../../Units/vw';
import vh from '../../Units/vh';
import {Fonts} from '../../assets/fonts';
import {secondaryColor, default_font_Color} from '../../../config.json';

export default StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  btn: {
    backgroundColor: '#BBE8BA',
    width: vw * 6.5,
    height: vw * 6.5,
    borderRadius: vw * 3.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {height: vw * 3.5, width: vw * 3.5, tintColor: default_font_Color},
  text: {color: secondaryColor, fontSize: vh * 3, paddingHorizontal: vw * 4},
});
