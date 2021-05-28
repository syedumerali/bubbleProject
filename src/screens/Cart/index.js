import React from 'react';
import {View, ScrollView, Image, Text, RefreshControl} from 'react-native';
import {backgrounds, assets, samplePictures, icons} from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import Alert from '../../Popups/Alert';
import TextMedium from '../../Components/TextMedium';
import TouchableHOC from '../../Components/TouchableHOC';
import CircularBook from '../../Components/CircularBook';
import CartItem from '../../Components/CartItem';
import Button from '../../Components/Button';
import GradientBg from '../../Components/GradientBg';
import {connect} from 'react-redux';
import {getProduct} from '../../redux/actions';
import {secondaryColor, loaderColor} from '../../../config.json';

const items = [
  {
    image: samplePictures.prod,
    name: 'Beige Color Block Cable Knit Sweater Dress',
    price: '123',
    quantity: '3',
  },
  {
    image: samplePictures.prod1,
    name: 'khaki Color Block block Casual Long Tnic...',
    price: '123',
    quantity: '2',
  },
  {
    image: samplePictures.prod2,
    name: 'Lightweight Knir Leopard Cardigan',
    price: '123',
    quantity: '1',
  },
];
var array = [];

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cartitems: null,
      flag: false,
      SubTotal: 0,
    };
  }

  getdetails = () => {
    var array = [];

    if (this.props.cart.length > 0) {
      this.setState({
        flag: true,
      });
      for (let i = 0; i < this.props.cart.length; i++) {
        array.push(this.props.cart[i].product_id);
      }
      this.props.getProduct(array, (success) => {
        if (success?.length > 0) {
          for (let i = 0; i < success.length; i++) {
            let stateCartItem = success[i];

            let localCartItem = this.props.cart.find(
              (element) => element.product_id == stateCartItem.id,
            );
            let localCartItemindex = this.props.cart.findIndex(
              (element) => element.product_id == stateCartItem.id,
            );

            if (localCartItem) {
              if (localCartItemindex != -1) {
                if (
                  this.props.cart[localCartItemindex].variation_id &&
                  this.props.cart[localCartItemindex].add_on_details
                ) {
                  success[localCartItemindex].price = this.props.cart[
                    localCartItemindex
                  ].variationprice;
                  let arr = this.props.cart[localCartItemindex].add_on_details;
                  let varprice = parseFloat(success[localCartItemindex].price);
                  for (let i = 0; i < arr.length; i++) {
                    if (arr[i].add_on_price == '') {
                      varprice += 0;
                    } else {
                      varprice += parseFloat(arr[i].add_on_price);
                    }
                  }
                  console.log('it', varprice);
                  success[localCartItemindex].price = varprice;
                } else if (this.props.cart[localCartItemindex].variation_id) {
                  let varprice = parseInt(success[localCartItemindex].price);
                  varprice = this.props.cart[localCartItemindex].variationprice;
                  success[localCartItemindex].price = varprice;
                } else if (this.props.cart[localCartItemindex].add_on_details) {
                  let arr = this.props.cart[localCartItemindex].add_on_details;
                  let varprice = parseFloat(success[localCartItemindex].price);
                  for (let i = 0; i < arr.length; i++) {
                    if (arr[i].add_on_price == '') {
                      varprice += 0;
                    } else {
                      varprice += parseFloat(arr[i].add_on_price);
                    }
                  }
                  success[localCartItemindex].price = varprice;
                }
              }
            }
          }

          this.setState({
            cartitems: success,
            flag: false,
          });
        }
      });
    } else {
      this.setState({
        flag: false,
      });
    }
  };

  clearProducts = () => {
    this.setState({
      cartitems: null,
    });
  };
  componentDidMount() {
    this.props.navigation.addListener('focus', this.getdetails);
    this.props.navigation.addListener('blur', this.clearProducts);
  }

  removeFromCart = (id) => {
    let newCart = [...this.state.cartitems];

    let index = newCart.findIndex((element) => element.id == id);
    newCart.splice(index, 1);

    this.setState({
      cartitems: [...newCart],
    });
  };

  render() {
    var ProductId = [];

    var Total = 0;
    if (this.state.cartitems !== null) {
      for (let i = 0; i < this.state.cartitems.length; i++) {
        let stateCartItem = this.state.cartitems[i];

        let localCartItem = this.props.cart.find(
          (element) => element.product_id == stateCartItem.id,
        );
        let localCartItemindex = this.props.cart.findIndex(
          (element) => element.product_id == stateCartItem.id,
        );

        if (localCartItem) {
          if (localCartItemindex != -1) {
            console.log('price', this.state.cartitems[i].price);

            Total +=
              parseFloat(this.state.cartitems[i].price) *
              parseFloat(localCartItem.quantity);
          }
        }
      }
    }

    Total = parseFloat(Total).toFixed(2);

    console.log('ca', this.state.cartitems);

    return (
      <GradientBg
        style={{flex: 1, paddingHorizontal: vw * 5, paddingTop: vh * 2}}>
        {this.props.cart.length <= 0 && (
          <View
            style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <CircularBook
              style={[
                styles.detailTxt,
                {marginBottom: 3 * vh, fontSize: 3 * vh},
              ]}>
              Cart is Empty
            </CircularBook>
            <Button
              title="Shop More"
              onPress={() =>
                this.props.navigation.navigate('ProductsStack', {
                  screen: 'Products',
                  params: {
                    categoryName: 'PRODUCTS',
                    categoryId: null,
                  },
                })
              }
              btnContainer={{width: '41%'}}
            />
          </View>
        )}

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.flag}
              tintColor={loaderColor}
              colors={[loaderColor]}
              onRefresh={this.getdetails}
              // key={Math.random()}
            />
          }>
          {this.state.cartitems?.map((item, index) => (
            <CartItem
              item={item}
              key={item.id}
              id={item.id}
              removeFromCart={this.removeFromCart}
            />
          ))}

          {this.state.cartitems && this.props.cart.length > 0 && (
            <>
              <View style={styles.detailCont}>
                <View style={styles.detailItem}>
                  <CircularBook style={styles.detailTxt}>
                    Sub Total
                  </CircularBook>
                  <CircularBook style={styles.detailTxt}>${Total}</CircularBook>
                </View>
                <View style={styles.detailItem}>
                  <CircularBook style={styles.detailTxt}>
                    Delivery Charges
                  </CircularBook>
                  <CircularBook style={styles.detailTxt}>$0</CircularBook>
                </View>
                <View style={styles.detailItem}>
                  <CircularBook style={styles.detailTxt}>Tax</CircularBook>
                  <CircularBook style={styles.detailTxt}>$0</CircularBook>
                </View>
                <View style={styles.detailItem}>
                  <CircularBook style={styles.detailTxt}>Discount</CircularBook>
                  <CircularBook style={styles.detailTxt}>$0</CircularBook>
                </View>
                <View
                  style={[
                    styles.detailItem,
                    {borderBottomWidth: 0, marginBottom: 0},
                  ]}>
                  <CircularBook style={styles.detailTxt}>Total</CircularBook>
                  <CircularBook style={styles.detailTxt}>${Total}</CircularBook>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh * 2,
                }}>
                <Button
                  title="Shop More"
                  onPress={() =>
                    this.props.navigation.navigate('ProductsStack', {
                      screen: 'Products',
                      params: {
                        categoryName: 'PRODUCTS',
                        categoryId: null,
                      },
                    })
                  }
                  btnContainer={{width: '41%'}}
                />
                <Button
                  title="Proceed To Checkout"
                  onPress={() =>
                    this.props.navigation.navigate('Checkout', {
                      item: this.state.cartitems,
                    })
                  }
                  btnContainer={{width: '56%', backgroundColor: secondaryColor}}
                />
              </View>
            </>
          )}
        </ScrollView>
      </GradientBg>
    );
  }
}

const mapStates = (state) => {
  console.log('state', state);
  return {
    cart: state.cart.cartItems,
  };
};

export default connect(mapStates, {getProduct})(Cart);
