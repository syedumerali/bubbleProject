import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {Fonts} from '../../assets/fonts';
import {
  default_font_Color,
  loaderColor
} from '../../../config.json'
const styles = StyleSheet.create({
  container: {
    width: 78 * vw,
    height: 6 * vh,
    backgroundColor: '#FFF',
    borderRadius: 3 * vh,

    flexDirection: 'row',
    alignItems: 'center',
    borderColor: loaderColor,
    borderWidth: vw * 0.4,
  },
  field: {
    flex: 1,
    // width: 60 * vw,
    fontFamily: Fonts.BL,
    marginLeft: vw * 2,
    fontSize: 1.8 * vh,
    // top:0.3*vh,
    
    
    padding: 0,
    margin: 0,
    paddingLeft: 2 * vw,
    color: '#050E37',
  },
  leftIcon: {
    marginLeft: 4 * vw,
    height: 1.5 * vh,
  },
  rightIcon: {
    marginRight: 4 * vw,
    height: 2.1 * vh,
  },
  label: {
    fontSize: 1.8 * vh,
    color: default_font_Color,
  },
  labelContainer: {
    width: '100%',

    marginBottom: vh * 0.8,
  },
});
export default styles;
