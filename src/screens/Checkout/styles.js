import { Platform, StyleSheet } from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {
  primaryColor,
  default_font_Color,
  default_text_color,
  default_section_Color,
  defaultCartLabel
} from '../../../config.json';

export default StyleSheet.create({
  OptionsContainer: {
    flexDirection: 'row',
    width: vw * 88,
    height: vh * 6,
    borderRadius: vw * 5,
    alignSelf: 'center',
  },
  option1: {
    backgroundColor: defaultCartLabel,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: vw * 2,
    borderBottomLeftRadius: vw * 2,
  },
  optionTxt1: { color: default_section_Color, fontSize: vh * 2 },
  option2: {
    backgroundColor: default_section_Color,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: vw * 2,
    borderBottomRightRadius: vw * 2,
  },
  optionTxt2: { color: default_text_color, fontSize: vh * 2 },
  txtArea: {
    width: '100%',
    borderRadius: vw * 2,
    height: vh * 20,
    alignItems: 'flex-start',
    paddingTop: vh * 1,
    borderColor: default_section_Color,


  },
  label: { color: default_font_Color, fontSize: vh * 2, marginVertical: vh * 1.5 },
  btnContainer: {
    width: '100%',
    paddingHorizontal: vw * 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: vh * 13,
    alignItems: 'flex-end',
    paddingBottom: vh * 3,
  
  },
  detailCont: {
    backgroundColor: default_section_Color,
    width: '100%',
    paddingHorizontal: vw * 5,
    paddingVertical: vh * 2,
    borderRadius: vw * 1,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: vw * 0.05,
    borderBottomColor: '#727C8E',
    paddingBottom: vh * 1.5,
    marginBottom: vh * 1.5,
  },
  detailTxt: { color: default_text_color, fontSize: vh * 1.8 },
  promoRow: {
    width: 40*vw,
    height: vh * 4,
    borderColor: 'rgba(0,0,0,.2)',
    borderWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: vw * 3,
  },
  input: { paddingVertical: 0,width:28*vw},
  arrowBlue: { width: vw * 4, height: vh * 2 },
  trashContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  promoCode: { color: default_font_Color, fontSize: vh * 1.8, marginRight: vw * 3 },
  trash: { height: vh * 2, width: vw * 3 },
  promoSucess: { color: default_text_color, fontSize: vh * 1.5, marginTop: vh * 1.5 },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vh * 2,
    ...Platform.select({
      ios: {
        zIndex: 9999999,
      },
    }),
  },
  card: { width: vw * 4, height: vh * 1.8, marginRight: vw * 2 },
  methodHeading: { color: default_text_color, fontSize: vh * 1.8 },
  userinput: {
    width: vw * 90,
    marginBottom: vh * 1.5,
    borderColor: 'rgba(0,0,0,.2)',
  },
  userInputs: { alignItems: 'center', marginTop: vh * 3 },
  signupRow: { flexDirection: 'row', alignSelf: 'center', marginTop: vh * 3 },
  newhere: { color: default_text_color, fontSize: vh * 1.8, marginRight: vw * 1 },
  signup: {
    color: primaryColor,
    fontSize: vh * 1.8,
    textDecorationLine: 'underline',
  },
});
