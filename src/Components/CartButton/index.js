import React from 'react'
import {
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Image
} from 'react-native'
import TextMedium from '../TextMedium'
import styles from './styles'
import TouchableHOC from '../TouchableHOC'
import { Component } from 'react'
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {icons, samplePictures} from '../../assets/images/index';
import { connect } from 'react-redux';
import { verifyCode } from '../../redux/actions'
import {
    primaryColor,
    default_section_Color
} from '../../../config.json';

 class Button extends Component{

    render(){

    return(
        <TouchableOpacity
          style={{}}
          hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
          onPress={() => this.props.navigation.navigate('Cart')}>
         
         
          <Image
            source={icons.cart}
            style={{
              width: 4.5 * vw,
              height: 4 * vh,
              resizeMode: 'contain',
              tintColor: primaryColor,
             
            }}
        />

    {   this.props.cart.length > 0 ? <View style={styles.cartView}>

        <Text style={{ color: default_section_Color , fontSize: vh * 1.5 }}>{this.props.cart.length}</Text>
              </View>


        :null}

       
    
        </TouchableOpacity>
    )
    }
}

const mapStates = state => {

    console.log('state', state)
    return {

        item: state.product.items,
        loading: state.category.loading,
        page: state.product.page,
          title: state.product.itemsByTitle,
          cart: state.cart.cartItems,
    };
}

export default connect(mapStates)(Button);