import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {Fonts} from '../../assets/fonts';
import {
  primaryColor
} from '../../../config.json'
export default style = StyleSheet.create({
  cartView:{

    width:vh*2,
    height:vh*2,
    backgroundColor: primaryColor,
    borderRadius:1*vh,
    justifyContent:'center',
    position:'absolute',
    alignItems:'center',
   
   marginLeft:vw*3.5
  }
});
