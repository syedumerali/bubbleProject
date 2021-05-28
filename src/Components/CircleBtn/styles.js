import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {Fonts} from '../../assets/fonts';
import {
  secondaryColor,
  default_section_Color,
  defaultShadowColor
} from '../../../config.json';
export default style = StyleSheet.create({
  container: {
    width: vh * 7,
    backgroundColor: secondaryColor,
    height: vh * 7,
    borderRadius: vh * 3.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: defaultShadowColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    alignSelf: 'flex-end',

    elevation: 6,
  },
  label: {fontSize: vw * 3.5, color: default_section_Color},
  arrow: {width: vw * 6, height: vh * 4},
});
