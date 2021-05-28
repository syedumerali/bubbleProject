import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {
  primaryColor,
  secondaryColor,
  default_font_Color,
  default_section_Color,
  defaultShadowColor
} from '../../../config.json';

export default StyleSheet.create({
    iconContainer: {
        backgroundColor: default_section_Color,
        width: vw * 12,
        height: vw * 12,
        borderRadius: vw *6,
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
      butcon:{
        backgroundColor: primaryColor,
        width:30*vw,
        marginTop:vh,
        elevation:0,
        marginBottom:vh,
        height:5*vh
  },
      points:{
        color: default_font_Color, fontSize: vh * 2.5
      },
      price: {color: secondaryColor, fontSize: vh * 2.5},
      icon: {width: vw * 5.5, height: vh * 3.5},
});
