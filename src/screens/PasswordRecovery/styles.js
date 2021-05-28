import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {
  primaryColor,
  default_font_Color,
  default_cartLabel_Color
} from '../../../config.json';

export default StyleSheet.create({
  bg: {flex: 1, width: '100%', height: '100%'},
  logo: {
    width: vw * 50,
    height: vh * 13,
    marginTop: vh * 5,
    alignSelf: 'center',
  },
  container: {paddingHorizontal: vw * 5, marginTop: vh * 15, flex: 1},
  SignUp: {color: primaryColor, fontSize: vh * 3, marginBottom: vh * 2},
  detail: {color: default_font_Color, fontSize: vh * 2.2, marginBottom: vh * 2},
  field: {width: '100%', marginBottom: vh * 2},
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'center',
    width: '100%',
  },

  haveAccount: {color: default_font_Color, fontSize: vh * 2},
  signin: {color: primaryColor, fontSize: vh * 2},
  forgot: {
    color: '#92278F',
    fontSize: vh * 2,
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginBottom: vh * 4,
  },
  arrow: {width: vw * 7, height: vh * 2.3, marginRight: vw * 1},
  message: {color: default_font_Color, fontSize: vh * 2, width: '90%'},
  sendAgainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: vh * 3,
  },
  sendAgain: {
    color: primaryColor,
    fontSize: vh * 2,
    textDecorationLine: 'underline',
  },
});
