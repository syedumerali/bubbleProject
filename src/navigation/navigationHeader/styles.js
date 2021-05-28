import {StyleSheet} from 'react-native'
import vh from '../../Units/vh';
import vw from '../../Units/vw';

export default StyleSheet.create({
    cartView:{

        width:vw*4,
        height:vh*2.2,
        backgroundColor:'#92278F',
        borderRadius:vh*4,
        
        alignItems:'center',
       
       marginLeft:vw*3.5
      },
      menu: {width: vw * 8, height: vh * 4,marginLeft:2*vw},
})