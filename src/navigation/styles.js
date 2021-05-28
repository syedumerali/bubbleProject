import {StyleSheet, Platform} from 'react-native';
import {Fonts} from '../assets/fonts';
import vw from '../Units/vw';
import vh from '../Units/vh';
import {
  default_section_Color,
  sideBarInActiveItemColor,
  defaultShadowColor
} from '../../config.json'
export default styles = StyleSheet.create({
  stack: {
    flex: 1,
    // height: 100 * vh,
    // width: 100 * vw,
    zIndex: 999,
    overflow: 'hidden',
    // overflow: 'scroll',
    // borderWidth: 1,
  },
  outerStyle: {
    flex: 1,
    shadowColor: '#7A7A7A',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'visible',
  },
  drawerStyles: {flex: 1, width: '60%', backgroundColor: default_section_Color},
  drawerItem: {alignItems: 'flex-start', marginVertical: 0},
  drawerLabel: {color: default_section_Color, marginLeft: -16},
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: default_section_Color,
    borderWidth: StyleSheet.hairlineWidth,
  },
  DrawerScrollView: {paddingLeft: vw * 3},
  redSpot: {
    position: 'absolute',
    bottom: '0%',
    left: '0%',
    width: vw * 30.2,
    height: vh * 12,
  },
  drawerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh * 4,
  },
  userContainer: {
    width: vw * 14,
    height: vw * 14,
    borderRadius: vw * 7,
    marginRight: vw * 5,
  },
  userImg: {width: vw * 14, height: vw * 14, borderRadius: vw * 7},
  status: {
    position: 'absolute',
    width: vw * 4,
    height: vw * 4,
    borderRadius: vw * 2,
    backgroundColor: '#03F58A',
    bottom: '-2%',
    right: '-2%',
    borderColor: default_section_Color,
    borderWidth: vw * 0.3,
  },
  userName: {color: '#050E37', fontSize: vw * 4.5},
  optionContainer: {marginTop: vh * 4},
  optionImg: {width: vw * 4},
  option: {backgroundColor: default_section_Color, width: 85*vw},
  optionLabel: {
    fontSize: vh *2.1,
    color: sideBarInActiveItemColor,
    fontFamily: Fonts.BR,
    right: vw * 2,
  },
  blueSpot: {
    position: 'absolute',
    top: '0%',
    width: vw * 20,
    height: vh * 10,
  },
  iconContainer: {
    backgroundColor: default_section_Color,
    width: vw * 11,
    height: vw * 11,
    borderRadius: vw * 5.5,
    shadowColor: defaultShadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {width: vw * 5, height: vh * 3},
});
