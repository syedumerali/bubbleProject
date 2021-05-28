import {StyleSheet} from 'react-native'
import vw from '../../Units/vw';
import vh from '../../Units/vh';
import {Fonts} from '../../assets/fonts';
import {
  default_text_color,
  default_section_Color,
  defaultShadowColor,
  defaultCartLabel
} from '../../../config.json'


export default StyleSheet.create({
 card:{
  flexDirection: "row", backgroundColor: default_section_Color, paddingHorizontal: vw * 2, paddingVertical: vh * 1,
  shadowColor: defaultShadowColor,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5, marginBottom: vh * 2
},
img:{ width: vw * 25, height: vh * 12, borderRadius: vw * 2, marginRight: vw * 4 },
details:{ flex: 1 },
cross:{ width: vw * 3.5, height: vh * 2 },
name:{ color: default_text_color, fontSize: vh * 2, width: "82%" },
subcat:{
    fontSize: vh * 2,
    // width: 65*vw,
   marginLeft:2*vw,
    
    color:default_text_color,
    
  },
priceContainer:{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: vh * 1 },
price:{ color: defaultCartLabel, fontSize: vh * 2.2 }
})