import { StyleSheet } from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {
  primaryColor,
  default_font_Color,
  default_section_Color,
  loaderColor
} from '../../../config.json';

export default StyleSheet.create({
  bg: { flex: 1, width: '100%' },
  box: {
    backgroundColor: default_section_Color,
    width: 90 * vw,
    justifyContent:'center',
    borderColor: loaderColor,
    borderWidth: vw * 0.4,
 marginBottom:2*vh,
borderRadius:3*vh,
    height: 6 * vh
},
calendar:{
  width:4*vw,
  height:4*vw,
  resizeMode:'contain',
  tintColor:primaryColor
},
from:{
  color: '#CCCCCC', fontSize: vh *1.7
},
  logo: {
    width: vw * 50,
    height: vh * 13,
    marginTop: vh * 5,
    alignSelf: 'center',
  },
  container: { paddingHorizontal: vw * 5, marginTop: vh * 15 },
  SignUp: { color: primaryColor, fontSize: vh * 3 },
  detail: { color: default_font_Color, fontSize: vh * 2.2, marginBottom: vh * 2 },
  field: { width: '100%', marginBottom: vh * 2 },
  txtArea: {
    width: '100%',
    borderRadius: vw * 5,
    height: vh * 20,
    alignItems: 'flex-start',
    paddingTop: vh * 1,
    marginBottom: vh * 2

  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: vh * 2,
  },
  haveAccount: { color: default_font_Color, fontSize: vh * 2 },
  signin: { color: primaryColor, fontSize: vh * 2, textDecorationLine: 'underline', padding: 2 * vw },
});
