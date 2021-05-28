import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {
  secondaryColor,
  default_font_Color,
  default_text_color,
  sideBarInActiveItemColor,
  defaultShadowColor
} from '../../../config.json';

export default StyleSheet.create({
  dot: {
    width: vw * 5,
    height: vh * 1,
    borderRadius: vh * 0.8,
    backgroundColor: secondaryColor,
  },
  inactiveDot: {
    width: vw * 2.2,
    height: vw * 2.2,
    borderRadius: vw * 1.1,
    backgroundColor: '#F5DDE8',
  },
  card: {
    height: vh * 75,
    marginTop: -vh * 2,
    borderTopLeftRadius: vw * 5,
    borderTopRightRadius: vw * 5,
    backgroundColor: '#FFF2F8',
    paddingHorizontal: vw * 4,
    elevation: 25,
    width: '100%',
    shadowColor: defaultShadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pname: {color: default_text_color, fontSize: vh * 2.8},
  catName: {color: sideBarInActiveItemColor, fontSize: vh * 2.1, marginTop: vh * 2},
  featureCont: {marginTop: vh * 1.5},
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh * 1.5,
  },

  containerStyle: {

    height: vh * 5,
    width:vw * 35,
    marginEnd: vw * 5
  },

  labelStyle: {

    fontSize: vh * 2,
    fontFamily: 'Barlow-Regular',
    color: '#666666'
  },
  listpoint: {
    width: vw * 2.2,
    height: vw * 2.5,
    borderRadius: vw * 1.25,
    backgroundColor: default_font_Color,
    marginRight: vw * 3,
  },
  featureTxt: {color: default_font_Color, fontSize: vh * 1.8},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  
  },
  price: {color: secondaryColor, fontSize: vh * 3},
  btn: {marginTop: vh * 3,elevation:0},
});
