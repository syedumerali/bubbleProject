import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {
  primaryColor,
  default_font_Color,
  default_section_Color,
  defaultShadowColor,
  defaultCartLabel,
  orderStatusColor
} from '../../../config.json';

export default StyleSheet.create({
  btn: {
    width: '33.3333%',
    height: vh * 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: default_section_Color,
    borderRightWidth: vw * 0.06,
    borderRightColor: 'rgba(112,112,112,.2)',
  },
  btnTxt: {fontSize: vh * 2, color: default_font_Color},
  pinkBg: {backgroundColor: primaryColor},
  whiteTxt: {color: default_section_Color},
  tabs: {
    flexDirection: 'row',
    width: '100%',
    shadowColor: defaultShadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderRadius: vw * 3,
    elevation: 3,
  },
  borderLeft: {
    borderTopLeftRadius: vw * 2,
    borderBottomLeftRadius: vw * 2,
  },
  borderRight: {
    borderTopRightRadius: vw * 2,
    borderBottomRightRadius: vw * 2,
  },
  card: {
    width: '100%',
    backgroundColor: default_section_Color,
    shadowColor: defaultShadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderRadius: vw * 1,
    elevation: 3,
    paddingHorizontal: vw * 5,
    paddingVertical: vh * 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vh * 2,
  },
  orderTxt: {color: default_font_Color, fontSize: vh * 1.8, marginBottom: vh * 1.5},
  statusCont: {
    backgroundColor: orderStatusColor,
    height: vh * 4.5,
    borderRadius: vh * 2.25,
    width: vw * 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusTxt: {color: default_section_Color, fontSize: vh * 1.8},
  price: {color: defaultCartLabel, fontSize: vh * 2.7},
  priceCont: {alignItems: 'center', justifyContent: 'space-between'},
});
