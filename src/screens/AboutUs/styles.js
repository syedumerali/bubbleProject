import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {
  default_font_Color,
  default_text_color
} from '../../../config.json'

export default StyleSheet.create({
  banner: {
    width: '100%',
    height: vh * 22,
    marginVertical: vh * 2,
    justifyContent: 'center',
  },
  title: {marginLeft: vw * 4},
  heading: {color: default_text_color, fontSize: vh * 2.5, marginBottom: vh * 2},
  p1: {color: default_font_Color, fontSize: vh * 1.8, marginBottom: vh * 4},
  p2: {color: default_font_Color, fontSize: vh * 1.8},
  banner: {
    alignSelf: 'center',
    width: vw * 90,
    height: vh * 22,
    marginVertical: vh * 2,
    justifyContent: 'center',
  },
  dot: {
    width: vw * 8,
    height: vh * 1,
    borderRadius: vh * 0.8,
    backgroundColor: '#ACE9B0',
    opacity: 1,
  },
  inactiveDot: {
    width: vw * 5,
    height: vh * 1,
    borderRadius: vh * 0.8,
    backgroundColor: '#F5DDE8',
  },
});
