import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {primaryColor, secondaryColor, default_font_Color} from '../../../config.json';

export default StyleSheet.create({
  bg: {flex: 1, width: '100%'},
  logo: {
    width: vw * 50,
    height: vh * 13,
    marginTop: vh * 5,

    alignSelf: 'center',
  },
  container: {paddingHorizontal: vw * 5, marginTop: vh * 20},
  SignUp: {color: primaryColor, fontSize: vh * 3},
  detail: {color: default_font_Color, fontSize: vh * 2.2, marginBottom: vh * 2},
  print: {
    width: 15 * vw,
    height: 15 * vw,
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  field: {width: '100%', marginBottom: vh * 2},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: vh * 15,
  },
  haveAccount: {color: default_font_Color, fontSize: vh * 2},
  signin: {
    color: primaryColor,
    fontSize: vh * 2,
    textDecorationLine: 'underline',
    padding: 2 * vw,
  },
  forgot: {
    color: secondaryColor,
    fontSize: vh * 2,
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginBottom: vh * 4,
  },
});
