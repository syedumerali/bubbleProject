import React from 'react';
import {View, LayoutAnimation, RefreshControl} from 'react-native';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import TextSemi from '../../Components/TextSemi';
import TextMedium from '../../Components/TextMedium';
import TextRegular from '../../Components/TextRegular';
import TouchableHOC from '../../Components/TouchableHOC';
import {connect} from 'react-redux';
import moment from 'moment';
import {FlatList} from 'react-native-gesture-handler';
import {GetOrder} from '../../redux/actions';
import {secondaryColor, loaderColor} from '../../../config.json';

const All = [
  {status: 'Pending'},
  {status: 'Cancelled'},
  {status: 'Refund'},
  {status: 'Delivered'},
];
let Current = [];

let Previous = [];

class MyOrders extends React.Component {
  state = {
    edit: true,
    current: 0,
    orders: [],
    currentOrders: [],
    previousOrders: [],
    flag: false,
  };

  retrieveOrder = () => {
    this.setState({
      flag: true,
    });
    this.props.GetOrder(this.props.users.userId, (success) => {
      if (success.length > 0) {
        this.setState({
          orders: success,
          flag: false,
        });
      } else {
        this.setState({
          flag: false,
        });
      }
    });
  };

  clear = () => {
    this.setState({
      orders: [],
      current: 0,
    });
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', this.retrieveOrder);
    this.props.navigation.addListener('blur', this.clear);
  }

  setType = (type) => {
    //LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({current: type});
  };
  renderStatus = (status) => {
    switch (status) {
      case 'pending':
        return (
          <View style={styles.statusCont}>
            <TextMedium style={styles.statusTxt}>Pending</TextMedium>
          </View>
        );
        break;
      case 'cancelled':
        return (
          <View style={styles.statusCont}>
            <TextMedium style={styles.statusTxt}>Cancelled</TextMedium>
          </View>
        );
        break;
      case 'Refund':
        return (
          <View style={styles.statusCont}>
            <TextMedium style={styles.statusTxt}>Refund</TextMedium>
          </View>
        );
        break;
      case 'completed':
        return (
          <View style={[styles.statusCont, {backgroundColor: loaderColor}]}>
            <TextMedium style={styles.statusTxt}>Delivered</TextMedium>
          </View>
        );
        break;
    }
  };
  renderItem = ({item, index}) => {
    console.log('orders', Previous);
    return (
      <TouchableHOC
        style={styles.card}
        onPress={() =>
          this.props.navigation.navigate('OrderDetails', {
            status: item.status,
            id: item.id,
          })
        }>
        <View>
          <TextMedium style={styles.orderTxt}>Order # {item.id}</TextMedium>
          <TextMedium style={styles.orderTxt}>
            {moment(item.date_created).format('D-MMM-YYYY')}
          </TextMedium>
          <TextMedium style={[styles.orderTxt, {marginBottom: 0}]}>
            {item.line_items.length} Items
          </TextMedium>
        </View>
        <View style={styles.priceCont}>
          {this.renderStatus(item.status)}
          <TextSemi style={styles.price}>${item.total}</TextSemi>
        </View>
      </TouchableHOC>
    );
  };
  filterArray = (order) => {
    return order.status == 'pending';
  };
  filterArrayPrevious = (order) => {
    return order.status == 'completed' || order.status == 'cancelled';
  };

  empty = () => {
    return (
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        {this.state.flag == false ? (
          <TextRegular>No Orders found</TextRegular>
        ) : null}
      </View>
    );
  };

  renderData = () => {
    if (this.state.orders.length > 0) {
      switch (this.state.current) {
        case 0:
          // props.orders
          return this.state.orders;
          break;

        case 1:
          var array = this.state.orders;
          Current = array.filter(this.filterArray);
          return Current;

          break;
        case 2:
          var array = this.state.orders;

          Previous = array.filter(this.filterArrayPrevious);

          return Previous;
          break;
      }
    }
  };
  render() {
    var orderlist = [];
    orderlist = this.renderData();

    console.log('s', this.state.orders);
    return (
      <View style={{flex: 1, paddingHorizontal: vw * 5, paddingTop: vh * 4}}>
        <View style={styles.tabs}>
          <TouchableHOC
            onPress={() => this.setType(0)}
            style={[
              styles.btn,
              styles.borderLeft,
              this.state.current == 0 ? styles.pinkBg : {},
            ]}>
            <TextMedium
              style={[
                styles.btnTxt,
                this.state.current == 0 ? styles.whiteTxt : {},
              ]}>
              All
            </TextMedium>
          </TouchableHOC>
          <TouchableHOC
            onPress={() => this.setType(1)}
            style={[
              styles.btn,
              this.state.current == 1 ? {backgroundColor: secondaryColor} : {},
            ]}>
            <TextMedium
              style={[
                styles.btnTxt,
                this.state.current == 1 ? styles.whiteTxt : {},
              ]}>
              Current
            </TextMedium>
          </TouchableHOC>
          <TouchableHOC
            onPress={() => this.setType(2)}
            style={[
              styles.btn,
              styles.borderRight,
              this.state.current == 2 ? {backgroundColor: secondaryColor} : {},
            ]}>
            <TextMedium
              style={[
                styles.btnTxt,
                this.state.current == 2 ? styles.whiteTxt : {},
              ]}>
              Previous
            </TextMedium>
          </TouchableHOC>
        </View>

        <FlatList
          data={orderlist}
          style={{paddingTop: vh * 3}}
          renderItem={this.renderItem}
          ListEmptyComponent={this.empty}
          refreshControl={
            <RefreshControl
              refreshing={this.state.flag}
              tintColor={loaderColor}
              colors={[loaderColor]}
              onRefresh={this.retrieveOrder}
            />
          }
        />
      </View>
    );
  }
}

const mapStates = (state) => {
  console.log('state', state);
  return {
    cart: state.cart.cartItems,
    users: state.user.users,
  };
};

export default connect(mapStates, {GetOrder})(MyOrders);
