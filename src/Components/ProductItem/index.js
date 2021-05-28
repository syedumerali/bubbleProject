import React from 'react';
import { Image, View, ImageBackground, TouchableOpacity } from 'react-native';
import styles from './styles';
import { icons, samplePictures } from '../../assets/images/index';
import Toast from 'react-native-toast';
import TextMedium from '../TextMedium';
import { connect } from 'react-redux';
import CircularBook from '../CircularBook';
import Alert from '../../Popups/Alert';
import TouchableHOC from '../TouchableHOC';
import { AddtoWishList, AddtoCart, RemovefromCart, RemovefromWishlist } from '../../redux/actions';


class ProductItem extends React.Component {

  // handelSelect = (wishlistadded) => {
  //   if (wishlistadded==true) {
  //     this.removeWishlist.show();
  //     this.props.RemovefromWishlist(this.props.item.id)
  //       wishlistadded=false;
  //   } else {
  //     this.wishlist.show();
  //     this.props.AddtoWishList(this.props.item);
  //    wishlistadded=true;
  //   }
  // };


  handelCart = (cartadded) => {
    if (this.props.item.price > 0) {


      if (cartadded==true) {

        console.log('ca', cartadded)

        this.removecart.show();
        Toast.show('Product has been removed from your cart.')
        this.props.RemovefromCart(this.props.item.id)
        cartadded = false;
      } else {

        console.log('ca', cartadded)
        this.addtocart.show()
        this.props.AddtoCart(this.props.item.id, this.props.item.name, this.props.item.price, 1, this.props.item.images[0].src, '');
      
        Toast.show('Product has been added in your cart.')
        cartadded = true;
      }

    }

    else {


      Toast.show('cannot be added to cart')

    }
  };

  render() {
    // alert(this.props.item);

    var cartadded = false;
    var wishlistadded = false;
    let index = this.props.cartItems.findIndex(x => x.product_id == this.props.item.id);
    let WishListindex = this.props.wishlist.findIndex(x => x == this.props.item.id);
    if (index > -1) {



      cartadded = true

    }

    if (WishListindex > -1) {
      wishlistadded = true

    }

    return (
      <View style={styles.prodCont}>
        <Alert
          text={'Product Added to\nWish List!'}
          ref={(e) => (this.wishlist = e)}
          key="wishlist1"
        />
        <Alert
          text={'Product has been removed\nfrom your Wish List.'}
         
          ref={(e) => (this.removeWishlist = e)}
          key="wishlist2"
        />

        <Alert
          text={'Product has been added\nin your cart.'}
         
          key="cart1"
          ref={(e) => (this.addtocart = e)}
          
        />

        <Alert
          text={'Product has been removed\nfrom your cart.'}
         
          key="cart2"
          ref={(e) => (this.removecart = e)}
          
        />
        <ImageBackground
          source={this.props.item.images.length > 0 ? { uri: this.props.item.images[0].src }
            : samplePictures.fruitteas}
          style={styles.prodImg}
          resizeMode="cover">
          <TouchableHOC
            style={{ alignSelf: 'flex-end', zIndex: 9999 }}
            onPress={() => {

              if (wishlistadded == true) {
                this.removeWishlist.show();
                // Toast.show('Product has been removed from your wishlist.')
                this.props.RemovefromWishlist(this.props.item.id)
                if(this.props.removeFromWishlist ){
                  this.props.removeFromWishlist(this.props.item.id)
                }
                
                wishlistadded = false;
              } else {
                this.wishlist.show();
                // Toast.show('Product has been added in your wishlist.')
                this.props.AddtoWishList(this.props.item);
                wishlistadded = true;
              }

            }}>
            <Image
              source={wishlistadded ? icons.heartFill : icons.heart}
              style={styles.heart}
              resizeMode="contain"
            />
          </TouchableHOC>
        </ImageBackground>



        <TouchableOpacity
          style={styles.detailContainer}
          onPress={this.props.onPress}>
          <TextMedium numberOfLines={1} style={styles.prodName}>
            {this.props.item.name}
          </TextMedium>
          <CircularBook numberOfLines={2} style={styles.prodDetail}>
            {this.props.item.categories[0].name}
          </CircularBook>
          <View style={styles.actionCont}>
            <CircularBook style={styles.price}>${this.props.item.price == 0 ? 0
              : this.props.item.price}</CircularBook>


            <TouchableOpacity style={{ alignSelf: 'flex-end', zIndex: 9999 }}
              onPress={() => {
                if (this.props.item.price > 0) {


                  if (cartadded==true) {
            
                    console.log('ca', cartadded)
            
                    this.removecart.show();
                    Toast.show('Product has been removed from your cart.')
                    this.props.RemovefromCart(this.props.item.id)
                    cartadded = false;
                  } else {
            
                    console.log('ca', cartadded)
                    this.addtocart.show()
                    this.props.AddtoCart(this.props.item.id, this.props.item.name, this.props.item.price, 1, this.props.item.images[0].src, '');
                  
                    Toast.show('Product has been added in your cart.')
                    cartadded = true;
                  }
            
                }
            
                else {
            
            
                  Toast.show('cannot be added to cart')
            
                }
              }}>
              <Image
                source={cartadded ? icons.fillcart : icons.cart}
                style={styles.cart}
                resizeMode="contain"
              />

            </TouchableOpacity>
          </View>
        </TouchableOpacity>


      </View>
    );
  }
}

const mapStates = state => {

  console.log('state', state)
  return {


    wishlist: state.wishlist.WishListItems,
    cartItems: state.cart.cartItems,

  };
}
export default connect(mapStates, { AddtoWishList, AddtoCart, RemovefromWishlist, RemovefromCart })(ProductItem)