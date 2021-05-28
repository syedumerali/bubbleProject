import {StyleSheet} from 'react-native';
import vw from '../../Units/vw';
import vh from '../../Units/vh';
import {Fonts} from '../../assets/fonts';
import {
  secondaryColor,
  default_text_color,
  default_section_Color,
  sideBarInActiveItemColor,
  defaultShadowColor,
} from '../../../config.json';

export default StyleSheet.create({
  prodCont: {
    width: vw * 44,
    backgroundColor: default_section_Color,
    marginRight: vw * 2,
    shadowColor: defaultShadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginBottom: vh * 2,
    elevation: 3,
  },
  prodImg: {width: '100%', height: vh * 18},
  heart: {
    width: vw * 5,
    height: vh * 2.5,
    marginTop: vh * 1.5,
    marginRight: vw * 3,
  },
  detailContainer: {paddingHorizontal: vw * 3, paddingVertical: vh * 1.5},
  prodName: {color: default_text_color, fontSize: vh * 2},
  prodDetail: {
    color: sideBarInActiveItemColor,
    fontSize: vh * 1.9,
    marginTop: vh * 0.5,
  },
  actionCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vh * 0.5,
  },
  price: {color: secondaryColor, fontSize: vh * 2.5},
  cart: {width: vw * 6, height: vh * 2.5},
});
