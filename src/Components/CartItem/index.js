import React from 'react';
import { Image, View, ImageBackground } from 'react-native';
import styles from './styles';
import vw from '../../Units/vw';
import vh from '../../Units/vh';
import { Fonts } from '../../assets/fonts';
import { icons, samplePictures } from '../../assets/images/index';
import DropDownPicker from 'react-native-dropdown-picker';
import TextMedium from '../TextMedium';
import CircularBook from '../CircularBook';
import Alert from '../../Popups/Alert';
import Quantity from '../Quantity';
import ProductItem from '../ProductItem';
import Toast from 'react-native-toast';
import { connect } from 'react-redux';
import { RemovefromCart, AddtoCart, UpdatetoCart, GetCoupons, AddDiscount, addCoupons, deleteCoupons } from '../../redux/actions';
import TouchableHOC from '../TouchableHOC';

class CartItem extends React.Component {
  state = {};

  render() {

    let index1 = this.props.cartItems.findIndex(x => x.product_id == this.props.item.id);
    let quantity = 1;
    if (index1 != -1) {
      quantity = this.props.cartItems[index1].quantity;
    }

      console.log('p',this.props.item)
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: this.props.item.images[0]?.src }}
          style={styles.img}
          resizeMode="contain"
        />

        <View style={styles.details}>
          {this.props.cross && this.props.placeorder  ? null : (
            <TouchableHOC style={{ alignSelf: 'flex-end' }}
              onPress={() => {
                this.props.Remove(this.props.id)
                this.props.removeFromCart(this.props.id)
              }}>
              <Image
                source={icons.crossBorder}
                style={styles.cross}
                resizeMode="contain"
              />
            </TouchableHOC>
          )}
          <TextMedium style={styles.name}
            numberOfLines={1}>{this.props.item.name}</TextMedium>
          <View style={styles.priceContainer}>
            <CircularBook style={styles.price}>
              $ {parseFloat(this.props.item.price).toFixed(2)}
            </CircularBook>
            
            { !this.props.placeorder &&(
            <Quantity size={vh * 2.5} quantity={quantity}
              id={this.props.item.id}
              ref={(ref) => this.quantity = ref} />

             ) }
          </View>
        </View>
      </View>
    );
  }
}

const mapStates = state => {



  return {

    cartItems: state.cart.cartItems,
    quan: state.cart.quantity,
    user: state.user.users,
    coupon: state.coupons.listcoupons

  };
}
const mapDispatch = dispatch => {
  return {
    Remove: (id) => {
      // dispatch({
      //   type: DELETEFROMCART,
      //   ItemId: id,
      // })

      dispatch(
        RemovefromCart(id)
      )
    },

    update: (id, quantity) => {

      dispatch(
        UpdatetoCart(id, quantity)
      )
    },

    addDiscount: (id, discount, discountType) => {

      dispatch(
        AddDiscount(id, discount, discountType)
      )
    },

    coupons: (promo, success) => {
      dispatch(
        GetCoupons(promo, success)
      )
    },

    addcoupons: (code, discount, passSucces) => {

      dispatch(
        addCoupons(code, discount, passSucces)
      )
    },

    deletecoupons: (code, pasSucces) => {

      dispatch(
        deleteCoupons(code, pasSucces)
      )
    }

  }
}
export default connect(mapStates, mapDispatch,)(CartItem);