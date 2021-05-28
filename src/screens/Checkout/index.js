import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  KeyboardAvoidingView,
  TextInput,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import {backgrounds, assets, samplePictures, icons} from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import Toast from 'react-native-toast';
import Alert from '../../Popups/Alert';
import TextMedium from '../../Components/TextMedium';

import TextSemi from '../../Components/TextSemi';
import TouchableHOC from '../../Components/TouchableHOC';
import FilterDropdown from '../../Components/FilterDropdown';
import CircularBook from '../../Components/CircularBook';
import CartItem from '../../Components/CartItem';
import MainInput from '../../Components/MainInput';
import DropDown from '../../Components/DropDown';
import {connect} from 'react-redux';
import Button from '../../Components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TextRegular from '../../Components/TextRegular';
import Payment from '../../Popups/Payment';
import GradientBg from '../../Components/GradientBg';
import {
  PlaceOrder,
  DeleteCart,
  UpdateUser,
  GetCoupons,
  addCoupons,
  deleteCoupons,
  AddDiscount,
  storepayment,
} from '../../redux/actions';
import {primaryColor, secondaryColor, default_section_Color} from '../../../config.json';
import Animated from 'react-native-reanimated';
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
var ProductId = [];
var id = '';
let check = false;
class Checkout extends React.Component {
  state = {
    step: 1,
    discount: 0,
    user: true,
    Address: this.props.user?.address ? this.props.user?.address : '',
    notes: '',
    points: 0,
    item: 'cash',
    promo_text: '',
    firstname: '',
    lastname: '',
    filter: null,
    shift: new Animated.Value(0),
    phone: '',
    email: '',
    DiscountTotal: 0,
  };
  //   constructor(props){
  //     super(props);
  //     this.state = {

  //       Address:'',
  //       notes:'',
  //         item: 'cash'

  //   }
  // }
  userfields = () => {
    if (this.props.userId !== null) {
      return null;
    }
    return (
      <View style={styles.userInputs}>
        <MainInput
          placeholder="First Name"
          style={styles.userinput}
          fieldStyle={{textAlignVertical: 'center'}}
          // onSubmitEditing={() => { this.lastname.focus(); }}
          value={this.state.firstname}
          onChangeText={(newfirstname) =>
            this.setState({
              firstname: newfirstname,
            })
          }
        />
        <MainInput
          placeholder="Last Name"
          style={styles.userinput}
          fieldStyle={{textAlignVertical: 'center'}}
          // ref={(input)=> { this.lastname=input}}
          // onSubmitEditing={() => { this.email.focus(); }}
          value={this.state.lastname}
          onChangeText={(newlastname) =>
            this.setState({
              lastname: newlastname,
            })
          }
        />
        <MainInput
          placeholder="Email Address"
          style={styles.userinput}
          value={this.state.email}
          fieldStyle={{textAlignVertical: 'center'}}
          // ref={(input)=> { this.email=input}}
          // onSubmitEditing={() => { this.phone.focus(); }}
          keyboardType="email-address"
          onChangeText={(newemail) =>
            this.setState({
              email: newemail,
            })
          }
        />
        <MainInput
          placeholder="phone #"
          style={styles.userinput}
          keyboardType="number-pad"
          fieldStyle={{textAlignVertical: 'center'}}
          // ref={(input)=> { this.phone=input}}
          value={this.state.phone}
          onChangeText={(newphone) =>
            this.setState({
              phone: newphone,
            })
          }
        />
      </View>
    );
  };

  _onDone = (data) => {
    this.setState({
      filter: data.title,
    });

    this.props.storepayment(
      data,
      (success) => {},
      (error) => {},
    );
  };

  _selectMethod = (item) => {
    check = true;
    if (this.DropDownRef) {
      this.DropDownRef.show(
        'title',
        this.props.payment,
        'Select payment method',
        (data) => this._onDone(data),
        null,
        null,
      );
    }
  };

  signupMessage = () => {
    if (this.state.user) {
      return null;
    }
    return (
      <View style={styles.signupRow}>
        <TextMedium style={styles.newhere}>New Here?</TextMedium>
        <TouchableHOC onPress={() => this.props.navigation.navigate('SignUp')}>
          <TextMedium style={styles.signup}>Sign Up</TextMedium>
        </TouchableHOC>
      </View>
    );
  };

  validate = (text) => {
    console.log(text);
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  onPressGrayBox = () => {
    this.address.focus();
  };
  renderBody = (Total, ProductId) => {
    // console.log('this.props ', this.props);
    switch (this.state.step) {
      case 1:
        return (
          <View style={{paddingHorizontal: vw * 5}}>
            {this.userfields()}

            <TextMedium style={styles.label}>Enter Your Address</TextMedium>

            <MainInput
              placeholder="Enter Your Address Here"
              // onSubmitEditing={() => { this.notes.focus(); }}
              // value={this.props.userId !== null ? this.props.user?.billing?.address_1 : this.state.Address}
              value={this.state.Address}
              multiline={true}
              numberOfLines={10}
              onChangeText={(newAddress) => {
                this.setState({Address: newAddress});
              }}
              style={styles.txtArea}
              fieldStyle={{height: 20 * vh, textAlignVertical: 'top'}}
            />

            <TextMedium style={styles.label}>Additional Notes</TextMedium>
            <MainInput
              placeholder="Enter notes"
              value={this.state.notes}
              fieldStyle={{height: 20 * vh, textAlignVertical: 'top'}}
              multiline={true}
              onChangeText={(newnotes) => {
                this.setState({notes: newnotes});
              }}
              style={styles.txtArea}
            />
            <View style={styles.paymentRow}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={icons.card}
                  style={styles.card}
                  resizeMode="contain"
                />
                <TextMedium style={styles.methodHeading}>
                  Payment Method
                </TextMedium>
              </View>
              {/* <FilterDropdown
                containerStyle={{ height: vh * 3.5 }}
                items={[
                  { label: 'Credit Card', value: 'Credit Card' },
                  { label: 'Cash On Delivery', value: 'Cash On Delivery' },
                ]}
                placeholder="Select"
              /> */}

              {this.props.payment && (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 1 * vw,
                    paddingVertical: 0.5 * vh,
                    backgroundColor: '#ccc',
                    borderRadius: 1 * vw,
                  }}
                  onPress={this._selectMethod}>
                  <TextSemi style={{fontSize: vh * 2}}>
                    {this.state.filter == null ? 'Select' : this.state.filter}
                  </TextSemi>
                </TouchableOpacity>
              )}
            </View>

            {this.signupMessage()}
          </View>
        );
        break;
      case 2:
        return (
          <View style={{paddingHorizontal: vw * 5, paddingTop: vh * 2}}>
            {this.props.route.params.item.map((item, index) => (
              <CartItem
                item={item}
                id={item.product_id}
                placeorder={true}
                cross={true}
              />
            ))}
            <View style={styles.detailCont}>
              <View style={styles.detailItem}>
                <CircularBook style={styles.detailTxt}>Sub Total</CircularBook>
                <CircularBook style={styles.detailTxt}>
                  ${parseFloat(Total).toFixed(2)}
                </CircularBook>
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
                  ${this.state.discount}
                </CircularBook>
              </View>
              <View style={[styles.detailItem]}>
                <CircularBook style={styles.detailTxt}>Total</CircularBook>
                <CircularBook style={styles.detailTxt}>
                  $
                  {this.state.DiscountTotal !== 0
                    ? parseFloat(this.state.DiscountTotal).toFixed(2)
                    : parseFloat(Total).toFixed(2)}
                </CircularBook>
              </View>
              <View style={[styles.detailItem, {borderBottomWidth: 0}]}>
                <CircularBook style={styles.detailTxt}>Promocode</CircularBook>
                {this.state.discount ? (
                  <View>
                    <View style={styles.trashContainer}>
                      <TextSemi style={styles.promoCode}>
                        {this.state.promo_text}
                      </TextSemi>
                      <TouchableHOC
                        onPress={() => {
                          this.props.deleteCoupons(
                            this.state.promo_text,
                            (succes) => {
                              if (succes == 'coupons deleted') {
                                this.setState({
                                  successpromo: !this.state.successpromo,
                                  DiscountTotal: 0,
                                  discount: 0,
                                });
                              }
                            },
                          );
                        }}>
                        <Image
                          source={icons.trash}
                          style={styles.trash}
                          resizeMode="contain"
                        />
                      </TouchableHOC>
                    </View>
                    <TextRegular style={styles.promoSucess}>
                      Promocode applied successfully
                    </TextRegular>
                  </View>
                ) : (
                  <View style={styles.promoRow}>
                    <TextInput
                      placeholder=""
                      style={styles.input}
                      onChangeText={(newpromo) => {
                        this.setState({
                          promo_text: newpromo,
                        });
                      }}
                      value={this.state.promo_text}
                    />

                    <TouchableHOC
                      onPress={
                        () => {
                          console.log('pdocu', ProductId);
                          if (this.state.promo_text !== '') {
                            this.props.GetCoupons(
                              this.state.promo_text,
                              (success) => {
                                console.log(success);
                                if (success.length == 0) {
                                  this.enterCode.show();
                                } else {
                                  if (
                                    success[0].discount_type == 'fixed_product'
                                  ) {
                                    this.enterCode.show();
                                  } else if (
                                    success[0].discount_type == 'percent'
                                  ) {
                                    if (success[0].product_ids.length > 0) {
                                      if (
                                        JSON.stringify(ProductId) !==
                                        JSON.stringify(success[0].product_ids)
                                      ) {
                                        Toast.show(
                                          'Promocode cannot be applied',
                                        );
                                      } else {
                                        if (Total < success[0].minimum_amount) {
                                          Toast.show(
                                            'Promocode cannot be applied',
                                          );
                                        } else {
                                          var value =
                                            (success[0].amount / 100) * Total;
                                          var TotalAmount =
                                            parseFloat(Total) -
                                            parseFloat(value);

                                          if (TotalAmount < 0) {
                                            Toast.show(
                                              'Please add more products to avail coupon',
                                            );
                                          } else {
                                            this.props.addCoupons(
                                              this.state.promo_text,
                                              success[0].amount,
                                              (passSucces) => {
                                                if (
                                                  passSucces == 'coupons added'
                                                ) {
                                                  this.setState({
                                                    discount: value,
                                                    DiscountTotal: TotalAmount,
                                                    couponList: success,
                                                  });
                                                }
                                              },
                                            );
                                          }
                                        }
                                      }
                                    } else if (
                                      Total < success[0].minimum_amount
                                    ) {
                                      Toast.show('Promocode cannot be applied');
                                    } else {
                                      var value =
                                        (success[0].amount / 100) * Total;
                                      var TotalAmount =
                                        parseFloat(Total) - parseFloat(value);

                                      if (TotalAmount < 0) {
                                        Toast.show(
                                          'Please add more products to avail coupon',
                                        );
                                      } else {
                                        this.props.addCoupons(
                                          this.state.promo_text,
                                          success[0].amount,
                                          (passSucces) => {
                                            if (passSucces == 'coupons added') {
                                              this.setState({
                                                successpromo: true,
                                                couponList: success,
                                                discount: value,
                                                DiscountTotal: TotalAmount,
                                              });
                                            }
                                          },
                                        );
                                      }
                                    }
                                  } else if (
                                    success[0].discount_type == 'fixed_cart'
                                  ) {
                                    if (success[0].product_ids.length > 0) {
                                      if (
                                        JSON.stringify(ProductId) !=
                                          JSON.stringify(
                                            success[0].product_ids,
                                          ) &&
                                        Total < success[0].minimum_amount
                                      ) {
                                        Toast.show(
                                          'Promocode cannot be applied',
                                        );
                                      } else {
                                        if (Total < success[0].minimum_amount) {
                                          Toast.show(
                                            'Promocode cannot be applied',
                                          );
                                        } else {
                                          let tot_amnt =
                                            Total - success[0].amount;
                                          if (tot_amnt < 0) {
                                            Toast.show(
                                              'Please add more products to avail coupon',
                                            );
                                          } else {
                                            this.props.addCoupons(
                                              this.state.promo_text,
                                              success[0].amount,
                                              (passSucces) => {
                                                if (
                                                  passSucces == 'coupons added'
                                                ) {
                                                  this.setState({
                                                    discount: success[0].amount,
                                                    DiscountTotal:
                                                      Total - success[0].amount,

                                                    couponList: success,
                                                  });
                                                }
                                              },
                                            );
                                          }
                                        }
                                      }
                                    } else if (
                                      Total < success[0].minimum_amount
                                    ) {
                                      Toast.show('Promocode cannot be applied');
                                    } else {
                                      let tot_amnt = Total - success[0].amount;
                                      if (tot_amnt < 0) {
                                        Toast.show(
                                          'Please add more products to avail coupon',
                                        );
                                      } else {
                                        this.props.addCoupons(
                                          this.state.promo_text,
                                          success[0].amount,
                                          (passSucces) => {
                                            if (passSucces == 'coupons added') {
                                              this.setState({
                                                discount: success[0].amount,
                                                DiscountTotal:
                                                  Total - success[0].amount,

                                                couponList: success,
                                              });
                                            }
                                          },
                                        );
                                      }
                                    }
                                  }
                                }
                              },
                            );
                          } else {
                            Toast.show('promocode is required');
                          }
                        }

                        //this.enterCode.show()
                      }>
                      <Image
                        source={icons.arrowBlue}
                        style={styles.arrowBlue}
                        resizeMode="contain"
                      />
                    </TouchableHOC>
                  </View>
                )}
              </View>
            </View>
            {this.signupMessage()}
          </View>
        );
        break;
    }
  };
  renderButtons = () => {
    switch (this.state.step) {
      case 1:
        return (
          <View style={styles.btnContainer}>
            <Button
              title="Go To Cart"
              btnContainer={{width: '45%', backgroundColor: secondaryColor}}
            />
            <Button
              title="Continue"
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );

                if (this.props.userId !== null) {
                  if (this.state.Address == '') {
                    Toast.show('Address required');
                  } else if (check == false) {
                    Toast.show('Select payment method');
                  } else {
                    this.props.UpdateUser(
                      this.props.user.firstname,
                      this.props.user.lastname,
                      this.props.user.email,
                      this.props.user.phone,
                      this.state.Address,
                      this.props.user.userId,
                      this.state.notes,
                    );
                    this.setState({step: 2});
                  }

                  // if (this.state.Address == '') {
                  //   Toast.show('Address required');
                  // } else if (this.state.notes == '') {
                  //   Toast.show('notes required');
                  // } else if (
                  //   this.props.user !== null &&
                  //   this.state.Address !== '' &&
                  //   this.state.notes !== ''
                  // ) {
                  //   this.props.UpdateUser(
                  //     this.props.user.firstname,
                  //     this.props.user.lastname,
                  //     this.props.user.email,
                  //     this.props.user.phone,
                  //     this.state.Address,
                  //     this.props.user.userId,
                  //     this.state.notes,
                  //   );

                  //   this.setState({ step: 2 });
                  // } else if (
                  //   this.state.firstname !== '' &&
                  //   this.state.lastname !== '' &&
                  //   this.state.phone !== '' &&
                  //   this.state.email !== '' &&
                  //   this.state.Address !== '' &&
                  //   this.state.notes !== ''
                  // ) {
                  //   this.props.UpdateUser(
                  //     this.state.firstname,
                  //     this.state.lastname,
                  //     this.state.email,
                  //     this.state.phone,
                  //     this.state.Address,
                  //     '',
                  //     this.state.notes,
                  //   );

                  //   this.setState({ step: 2 });
                  // }

                  // else {
                  //   this.setState({ step: 2 });
                  // }
                } else if (this.props.userId == null) {
                  if (this.state.firstname == '') {
                    Toast.show('first name required');
                  } else if (this.state.lastname == '') {
                    Toast.show('last name required');
                  } else if (this.state.Address == '') {
                    Toast.show('Address required');
                  } else if (this.state.phone == '') {
                    Toast.show('phone no is required');
                  } else if (this.state.email == '') {
                    Toast.show('email is required');
                  } else if (!this.validate(this.state.email)) {
                    Toast.show('Invalid email');
                  } else if (this.state.phone.length < 10) {
                    Toast.show('Number should contain atleast 10 digits');
                  } else if (check == false) {
                    Toast.show('Select payment method');
                  } else {
                    this.props.UpdateUser(
                      this.state.firstname,
                      this.state.lastname,
                      this.state.email,
                      this.state.phone,
                      this.state.Address,
                      '',
                      this.state.notes,
                    );
                    this.setState({step: 2});
                  }
                }
              }}
              btnContainer={{width: '45%'}}
            />
          </View>
        );
        break;
      case 2:
        return (
          <View style={styles.btnContainer}>
            <Button title="Go To Cart" btnContainer={{width: '47%'}} />
            <Button
              title="Place Order"
              onPress={() => {
                this.placeorder.show();
              }}
              btnContainer={{width: '47%', backgroundColor: secondaryColor}}
            />
          </View>
        );
        break;
    }
  };

  clearProducts = () => {
    this.setState({
      firstname: '',
      lastname: '',
      promo_text: '',
      discount: '',
      Address: '',
      notes: '',
    });
  };

  componentDidMount() {
    // SplashScreen.hide();
    //Keyboard.addListener("keyboardDidHide", this._keyboardDidHide());

    // Keyboard.addListener("keyboardDidShow", this._keyboardDidShow());

    this.props.navigation.addListener('blur', this.clearProducts);
  }

  _keyboardDidHide = () => {};

  _keyboardDidShow = () => {};
  render() {
    var Total = 0;
    var ProductId = [];

    var cart = this.props.route.params.item;

    if (cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        let stateCartItem = cart[i];
        let localCartItem = this.props.cart.find(
          (element) => element.product_id == stateCartItem.id,
        );
        ProductId.push(cart[i].id);

        if (localCartItem) {
          Total +=
            parseFloat(cart[i].price) * parseFloat(localCartItem.quantity);
        }
      }
    }
    return (
      <GradientBg style={{flex: 1, paddingTop: vh * 2}}>
        <DropDown ref={(_ref) => (this.DropDownRef = _ref)} />
        <KeyboardAwareScrollView style={{flex: 1}}>
          <Payment
            ref={(e) => (this.payment = e)}
            onSuccess={() => this.paymentSuccess.show()}
          />

          <Alert
            text="Invalid Coupon Code"
            btntxt="ENTER AGAIN"
            ref={(e) => (this.enterCode = e)}
            icon={icons.caution}
            onSuccess={() => {
              this.setState({discount: 0});
            }}
          />

          <Alert
            text={'There was some error with\nyour payment'}
            icon={icons.crossCircle}
            ref={(e) => (this.paymentFail = e)}
            onSuccess={() => this.orderSuccess.show()}
          />
          <Alert
            text={'Payment Successfull!\nYour Order Has Been Placed'}
            ref={(e) => (this.paymentSuccess = e)}
            onSuccess={() => this.paymentFail.show()}
          />
          <Alert
            text={`Congratulations\nYou have earned ${this.state.points} point (s)`}
            ref={(e) => (this.earnedpoints = e)}
            onSuccess
            redeemSuccess={() => {
              this.props.navigation.popToTop();
              this.props.navigation.navigate('OrderDetails', {
                id: id,
              });
            }}
          />
          <Alert
            text={'Your Order Has Been\nPlaced Successfully'}
            ref={(e) => (this.orderSuccess = e)}
            onSuccess
            redeemSuccess={() => {
              if (this.props.userId !== null) {
                this.earnedpoints.show();
              } else {
                this.props.navigation.popToTop();
                this.props.navigation.navigate('OrderDetails', {
                  id: id,
                });
              }
            }}
          />

          <Alert
            text="Place Order?"
            ref={(e) => (this.placeorder = e)}
            icon={icons.question}
            onSuccess2={() => {}}
            onSuccess={() => {
              // this.orderSuccess.show();
              this.props.PlaceOrder(
                this.props.user,
                Total,
                this.state.discount,
                this.props.cart,
                this.props.coupons,
                this.props.paymentmethod,
                (passsucces) => {
                  // this.orderSuccess.hide();
                  if (passsucces.id === undefined) {
                    Toast.show('Cannot place order');
                  } else if (passsucces.id !== '') {
                    id = passsucces.id;
                    this.setState(
                      {
                        points: passsucces.points,
                      },
                      () => {
                        this.orderSuccess.show();
                        this.props.DeleteCart();
                      },
                    );
                  }
                },
              );
            }}
          />

          <View style={styles.OptionsContainer}>
            <View
              style={[
                styles.option1,
                {
                  backgroundColor:
                    this.state.step == 1 ? primaryColor : default_section_Color,
                },
              ]}>
              <TextMedium
                style={
                  this.state.step == 1 ? styles.optionTxt1 : styles.optionTxt2
                }>
                Personal Details
              </TextMedium>
            </View>
            <View
              style={[
                styles.option2,
                {
                  backgroundColor:
                    this.state.step == 2 ? primaryColor : default_section_Color,
                },
              ]}>
              <TextMedium
                style={
                  this.state.step == 2 ? styles.optionTxt1 : styles.optionTxt2
                }>
                Place Order
              </TextMedium>
            </View>
          </View>

          {this.renderBody(Total, ProductId)}
          {this.renderButtons()}
        </KeyboardAwareScrollView>
      </GradientBg>
    );
  }
}
const mapStates = (state) => {
  return {
    cart: state.cart.cartItems,
    user: state.user.users,
    userId: state.user.userid,
    coupons: state.coupons.listcoupons,
    paymentmethod: state.payments.paymentmethod,
    payment: state.payments.payments,
  };
};
export default connect(mapStates, {
  PlaceOrder,
  DeleteCart,
  UpdateUser,
  GetCoupons,
  addCoupons,
  deleteCoupons,
  AddDiscount,
  storepayment,
})(Checkout);
