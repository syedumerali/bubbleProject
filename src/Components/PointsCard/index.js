import React from 'react';
import { Image, View, ImageBackground, TouchableOpacity } from 'react-native';
import styles from './styles';
import { icons, samplePictures } from '../../assets/images/index';
import Toast from 'react-native-toast';
import TextRegular from '../TextRegular';
import { connect } from 'react-redux';
import TextSemi from '../../Components/TextSemi';
import Alert from '../../Popups/Alert';
import TouchableHOC from '../TouchableHOC';
import { AddtoWishList, AddtoCart, RemovefromCart, RemovefromWishlist } from '../../redux/actions';
import Button from '../Button';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {
  default_section_Color,
  orderStatusColor
} from '../../../config.json';


class ProductItem extends React.Component {

  render() {
    

    return (
        <View
        style={styles.card}
       >
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Image source={samplePictures.prod2}
            style={styles.img}/>
            {/* <View> */}
                {/* <View style={{flexDirection:'row',justifyContent:'space-between'}}> */}
                <TextSemi style={styles.price}>{this.props.item.points} Points</TextSemi> 
                <Button title={this.props.checkredeem==0?'Redeem':'Redeemed'}
                onPress={this.props.redeem}
                labelStyle={{fontSize:2*vh,color:this.props.checkredeem==0? default_section_Color :'#CBCBCB'}}
                btnContainer={[styles.butcon,{backgroundColor:this.props.checkredeem==0?orderStatusColor:'#E6E6E6',}]}/>
                {/* </View> */}
                {/* <View >
                <TextRegular style={styles.des}>{this.props.item.text}</TextRegular>
                </View> */}
              
            {/* </View> */}
          
        </View>
      </View>
    );
  }
}
export default ProductItem