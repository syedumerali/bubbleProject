import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  LayoutAnimation,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {backgrounds, assets, samplePictures} from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import TextSemi from '../../Components/TextSemi';
import ImageButton from '../../Components/ImageButton';
import Alert from '../../Popups/Alert';
import TextMedium from '../../Components/TextMedium';
import CircularBook from '../../Components/CircularBook';
import TouchableHOC from '../../Components/TouchableHOC';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import Orderproduct from '../../Components/Orderproduct';
import Toast from 'react-native-toast';
import TextRegular from '../../Components/TextRegular';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {retrieveOrder, CancelOrder} from '../../redux/actions';
import {connect} from 'react-redux';
import moment from 'moment';
import {
  default_font_Color,
  loaderColor,
  default_text_color
} from '../../../config.json';

const cart = [
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
];

class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
      flag: true,
    };
  }

  getOrder = () => {
    this.props.retrieveOrder(this.props.route.params.id, (success) => {
      if (success !== null) {
        this.setState({
          order: success,
          flag: false,
        });
      }
    });
  };
  componentDidMount() {
    this.getOrder();
  }

  render() {
    console.log('odre', this.props.route.params.id);

    var Total = 0;

    if (this.state.order !== null) {
      for (let i = 0; i < this.state.order.line_items.length; i++) {
        Total += parseFloat(this.state.order.line_items[i].subtotal);
      }
    }

    return (
      <View style={{flex: 1, paddingHorizontal: vw * 4, paddingTop: vh * 2}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.flag}
              tintColor={loaderColor}
              colors={[loaderColor]}
              onRefresh={this.getOrder}
            />
          }>
          {this.state.order !== null ? (
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.orderRow}>
                <TextMedium style={styles.text}>
                  Order # {this.state.order.id}
                </TextMedium>
                <TextMedium style={styles.text}>
                  {moment(this.state.order.date_created).format('D-MMM-YYYY')}
                </TextMedium>
              </View>
              {this.state.order.line_items.map((item, index) => (
                <Orderproduct item={item} cross={true} />
              ))}
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
                  <CircularBook style={styles.detailTxt}>
                    $
                    {this.state.order.discount_total !== ''
                      ? this.state.order.discount_total
                      : 0}
                  </CircularBook>
                </View>
                <View style={[styles.detailItem]}>
                  <CircularBook style={styles.detailTxt}>Total</CircularBook>
                  <CircularBook style={styles.detailTxt}>
                    ${this.state.order.total}
                  </CircularBook>
                </View>
                <View style={[styles.detailItem]}>
                  <CircularBook style={styles.detailTxt}>
                    Coupon Code
                  </CircularBook>
                  <CircularBook style={styles.detailTxt}>{ this.state.order.coupon_lines.length>0 ? this.state.order.coupon_lines[0].code : '--'}</CircularBook>
                </View>
                <View style={[styles.detailItem]}>
                  <CircularBook style={styles.detailTxt}>
                    Payment Status
                  </CircularBook>
                  <CircularBook style={styles.detailTxt}>Not Paid</CircularBook>
                </View>
                <View style={[styles.detailItem]}>
                  <CircularBook style={styles.detailTxt}>
                    Payment Method
                  </CircularBook>
                  <CircularBook style={styles.detailTxt}>
                    {this.state.order.payment_method_title}
                  </CircularBook>
                </View>
                <View style={[styles.detailItem, {borderBottomWidth: 0}]}>
                  <CircularBook style={styles.detailTxt}>
                    Order Status
                  </CircularBook>
                  <CircularBook style={styles.detailTxt}>
                    {this.state.order.status}
                  </CircularBook>
                </View>
                <TextMedium
                  style={{
                    color: default_text_color,
                    fontSize: vh * 2.2,
                    marginBottom: vh * 0.5,
                  }}>
                  ADDRESS DETAILS:
                </TextMedium>
                <TextRegular
                  style={{
                    color: default_font_Color,
                    fontSize: vh * 1.9,
                    marginBottom: vh * 2,
                  }}>
                  {this.state.order.shipping.address_1}
                </TextRegular>
                <TextMedium
                  style={{
                    color: default_text_color,
                    fontSize: vh * 2.2,
                    marginBottom: vh * 0.5,
                  }}>
                  ADDITIONAL NOTES:
                </TextMedium>
                <TextRegular
                  style={{
                    color: default_font_Color,
                    fontSize: vh * 1.9,
                    marginBottom: vh * 2,
                  }}>
                  {this.state.order.customer_note}
                </TextRegular>

            

               {   this.props.userId!==null &&  this.state.order.status=='pending'?<ImageButton
                  title="Cancel Order"
                  onPress={() => {
                    this.props.CancelOrder(
                      this.state.order.id,
                      'cancelled',
                      (passsucces) => {
                        if (passsucces !== null) {
                          this.cancelorder.show();
                        } else {
                          Toast.show(passsucces.message);
                        }
                      },
                    );
                  }}
                  btnContainer={styles.btn}
                />
             :null}
              </View>

              <Alert
                text={'Your order has been\ncancelled'}
                onSuccess={() => {
                 
                    if (this.props.userId !== null) {
                      this.props.navigation.navigate('MyOrders', {
                        screen: 'MyOrders',
                      });
                    } else {
                      this.props.navigation.navigate('Home');
                    }
                  

                  Toast.show('your order has been cancelled');
                }
              
              }
                ref={(e) => (this.cancelorder = e)}
              />
            </KeyboardAwareScrollView>
          ) : null}
        </ScrollView>
      </View>
    );
  }
}

const mapStates = (state) => {
  console.log('state', state);
  return {
    cart: state.cart.cartItems,
    users: state.user.users,
    userId:state.user.userid,
  };
};

export default connect(mapStates, {retrieveOrder, CancelOrder})(OrderDetails);
