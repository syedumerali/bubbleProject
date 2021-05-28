import {StyleSheet} from 'react-native';
import {Fonts} from '../../assets/fonts';
import vw from '../../Units/vw';
import vh from '../../Units/vh';
import {
  default_font_Color,
  default_section_Color,
  sideBarInActiveItemColor,
  defaultShadowColor,
  default_cartLabel_Color
} from '../../../config.json';
export default styles = StyleSheet.create({
  modalTouchable: {
    backgroundColor: 'rgba(0,0,0,.5)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: vh * 100,
    width: vw * 100,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: default_section_Color,
    borderRadius: 3 * vw,
    paddingTop: vh * 2,
    paddingBottom: vh * 4,
    alignItems: 'center',
    paddingHorizontal: vw * 8,
  },
  check: {width: vw * 15, height: vh * 5, marginBottom: vh * 1},
  title: {fontSize: vw * 5, marginVertical: vh * 1},
  Message: {
    color: default_font_Color,
    fontSize: vh * 1.8,
    width: '80%',
    alignSelf: 'flex-start',
    marginVertical: vh * 2,
  },
  redirect: {fontSize: vw * 3.5, marginTop: vh * 3},
  login: {
    fontSize: vw * 3.5,
    textDecorationLine: 'underline',
    color: '#00AF41',
  },
  BtnContainer: {marginTop: vh * 3, width: '50%'},
  cross: {width: vw * 3, height: vh * 2},
  imageBg: {
    shadowColor: defaultShadowColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    borderRadius: vw * 2,
    elevation: 7,
    width: vw * 85,
    backgroundColor: default_section_Color,
    paddingBottom: vh * 3,
    // minHeight:vh*20,
  },
  crossContainer: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    paddingTop: vh * 1.5,
    paddingRight: vw * 3,
  },
  // cross:{
  //   width: vw * 3,

  // },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    
   
    paddingHorizontal: vw * 6,
    // marginVertical:4*vh
  },
  checkMark: {width: vw * 10, height: vh * 5},
  text: {
    fontSize: vh * 2.2,
    width: '95%',
    textAlign: 'center',
    color: default_font_Color,
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh * 2,
    width: '80%',
  },
  yesBtn: {backgroundColor: '#FF4343', width: '48%'},
  noBtn: {width: '48%'},
  request: {backgroundColor: '#92278F', width: '45%', marginTop: vh * 2},
  feedback: {color: default_font_Color, fontSize: vh * 2.5},
  description: {
    color: sideBarInActiveItemColor,
    fontSize: vh * 1.8,
    marginTop: vh * 1,
    marginBottom: vh * 0.8,
  },
  txtArea: {
    width: '100%',
    borderRadius: vw * 1,
    height: vh * 15,
    marginBottom: vh * 1,
    alignItems:'flex-start',
    borderColor: '#E6E6E6',
  },
  field: {width: '100%', marginBottom: vh * 1, borderColor: '#E6E6E6'},
  btn: {
    width: '40%',
    height: vh * 5.5,
    alignSelf: 'flex-end',
    marginTop: vh * 1,
  },
});
