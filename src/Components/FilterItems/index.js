import React from 'react';
import {Image, View, ImageBackground,TouchableOpacity} from 'react-native';
import styles from './styles';
import vw from '../../Units/vw';
import vh from '../../Units/vh';
import {Fonts} from '../../assets/fonts';
import {icons, samplePictures} from '../../assets/images/index';
import DropDownPicker from 'react-native-dropdown-picker';
import TextMedium from '../TextMedium';
import CircularBook from '../CircularBook';
import Alert from '../../Popups/Alert';
import Quantity from '../Quantity';
import ProductItem from '../ProductItem';
import TextRegular from '../TextRegular';
import {
  default_text_color
} from '../../../config.json'


export default class CartItem extends React.Component {
    constructor(props) {

        super(props);

        this.state = {


            wishlistadded: false,
            opencat:false,
            agree:false
        }

    }

    opneCat = () => {

        console.log()
        this.setState({
          opencat: !this.state.opencat
        })
      }
   

    render() {
      
        return (
            
        

 
<View style={{marginBottom:2*vh,marginTop:vh}}>
<View style={{ flexDirection: 'row' }}>

  <TouchableOpacity 
  onPress={() =>
    
    {
    this.setState({
      agree: !this.state.agree,
    },()=> {
        console.log('age',this.state.agree)
        if(this.state.agree==true){
    
            this.props.onClick(this.props.name,this.props.options)
        }

        else{
            this.props.remove(this.props.name,this.props.options)

        }
    })

}
  }
  style={{ width: 6 * vw, height: 6 * vw, backgroundColor: '#D8D8D8', borderRadius: 2 * vw ,alignItems:'center',justifyContent:'center'}}>

  {this.state.agree == true ? (
            <Image
              source={icons.check}
              style={{
                height: 3 * vw,
                width: 3 * vw,
                resizeMode: 'contain',
                tintColor:default_text_color
              }}
            />
          ) : null}
  </TouchableOpacity>
  <TextRegular style={styles.subcat}>{this.props.name}</TextRegular>
 

</View>


</View>
  
  

        );
    }
}
