import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {Fonts} from '../../assets/fonts';
import {
  primaryColor,
  default_section_Color,
  defaultShadowColor
} from '../../../config.json';

export default style = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: primaryColor,

    height: vh * 6.5,
    borderRadius: vw * 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: defaultShadowColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  label: {fontSize: vw * 3.5, color: default_section_Color},
});
