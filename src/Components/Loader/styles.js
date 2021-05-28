import vh from '../../Units/vh';
import vw from '../../Units/vw';
import Fonts from '../../assets/fonts';
const { StyleSheet } = require("react-native");
import {
  defaultShadowColor
} from '../../../config.json';


const styles = StyleSheet.create({
 


  modalView: {
      
      backgroundColor: "#fff",
      borderRadius: vh*1.2,
      paddingBottom:vh*0.5,
      marginBottom:vh,
      width:vw*50,
      justifyContent:'center',
      height:vh*15,
      shadowColor: defaultShadowColor,
      alignItems:'center',
      marginHorizontal:vw*4,
      flexDirection:'row',
      marginTop:vw*1.5,
      shadowOffset: {
        width: 0,
        height: 2
      },
      justifyContent:'space-evenly',
      shadowOpacity: 0.25,
      shadowRadius: 2.84,
      elevation: 2
    },


    centeredView: {
      flex: 1,
      width:vw*100,
    
      justifyContent: "center",
      alignItems:'center',
      backgroundColor:'rgba(0,0,0,0.6)',
    },
    
})
export default styles;