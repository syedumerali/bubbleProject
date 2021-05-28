import React from 'react';
import { Image, StyleSheet, View, Text, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
// import Animated from 'react-native-reanimated';
import Home from '../screens/Home';
// import { ChatScreen } from '../screens';
// import Tabs from '../tabs';
import { options } from './navigationHeader';
import { backgrounds, samplePictures, icons } from '../assets/images';
import vw from '../Units/vw';
import vh from '../Units/vh';
// import CircularBold from '../Components/CircularBold';
import styles from './styles';
import AboutUs from '../screens/AboutUs';
import ContactUs from '../screens/ContactUs';
import Products from '../screens/Products';
import Categories from '../screens/Categories';
import WishList from '../screens/WishList';
import ProfileDetails from '../screens/ProfileDetails';
import ProductDetail from '../screens/ProductDetail';
import Points from '../screens/Points'
import OrderDetails from '../screens/OrderDetails';
import MyOrders from '../screens/MyOrders';
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import RedeemLog from '../screens/RedeemLog'
import Search from '../screens/Search';
import { logout } from '../redux/actions';
import { connect } from 'react-redux';
import { Component } from 'react';
import {
  primaryColor,
  sideBarIconColor,
  sideBarInActiveItemColor
} from '../../config.json';
const App = createStackNavigator();
const Product = createStackNavigator();
const Drawer = createDrawerNavigator();
const Order = createStackNavigator();
const points = createStackNavigator()

const AppStack = () => {
  return (
    <App.Navigator screenOptions={options}>
      <App.Screen name="Home" component={Home} />
      <App.Screen name="Cart" component={Cart} />
      <App.Screen name="Search" component={Search} />
      <App.Screen name="Checkout" component={Checkout} />
      <App.Screen name="OrderDetails" component={OrderDetails} />
      {/* <App.Screen name="AboutUs" component={AboutUs} /> */}
      {/* <App.Screen name="ContactUs" component={ContactUs} /> */}
      {/* <App.Screen name="Products" component={Products} /> */}
      {/* <App.Screen name="ProductDetail" component={ProductDetail} /> */}
      {/* <App.Screen name="Categories" component={Categories} /> */}
      {/* <App.Screen name="WishList" component={WishList} /> */}
      {/* <App.Screen name="ProfileDetails" component={ProfileDetails} /> */}
      {/* <App.Screen name="MyOrders" component={MyOrders} /> */}
      {/* <App.Screen name="OrderDetails" component={OrderDetails} /> */}
    </App.Navigator>
  );
};
const ProductsStack = () => {
  return (
    <Product.Navigator screenOptions={options}>
      <Product.Screen name="Products" component={Products} />
      <Product.Screen name="ProductDetail" component={ProductDetail} />

    </Product.Navigator>
  );
};

const PointsStack = () => {
  return (
    <points.Navigator screenOptions={options}>

      <points.Screen name="Points" component={Points} />
      <points.Screen name="RedeemLog" component={RedeemLog} />
    </points.Navigator>
  );
}
const OrdersStack = () => {
  return (
    <Order.Navigator screenOptions={options}>
      <Order.Screen name="MyOrders" component={MyOrders} />

    </Order.Navigator>
  );
};
class DrawerContent extends React.Component {
  //   logout= ()=>{
  //     Alert.alert("Logout", "Are you sure you want to logout?",
  //     [{
  //       text: "No",
  //     }, {
  //       text: "Yes",
  //       onPress: () => {
  //         this._logout.onShow()
  //         this.props.logout(s => {
  //           this._logout.hide()
  //           this.props.navigation.navigate("Auth")

  //         }, e => {
  //           console.log(e,"logout")
  //           this._logout.hide()
  //         })
  //       }
  //     }], {})
  //   }

  ProductsNav = (name, props) => {
   
    if (name == 'ProductsStack') {
      console.log('namee',name,props);
      props.navigation.navigate('ProductsStack', {
        screen: 'Products',
        initial: false,
        params: {
          categoryId: null,
        }
      });
    
    } else if (name == 'MyOrders') {
      if (this.props.user !== null) {
        props.navigation.navigate(name);
      }
    } else if (name == 'ProfileDetails') {
      if (this.props.user !== null) {
        props.navigation.navigate(name);
      }
    } else {
      props.navigation.navigate(name);
    }
  };

  IconButton = (icon, focused) => {
    return (
      <View style={styles.iconContainer}>
        <Image
          source={icon}
          style={[styles.icon, { tintColor: focused ? primaryColor : sideBarInActiveItemColor }]}
          resizeMode="contain"
        />
      </View>
    );
  };
  render() {
    let props = this.props;
    console.log('drawer', this.props);
    return (
      <DrawerContentScrollView
        {...props}
        scrollEnabled={true}
        contentContainerStyle={styles.DrawerScrollView}>
        {/* drawer content here <- */}

        <View style={styles.optionContainer}>
          {props.state.routes.map((item, index) => {
            const focused = index === props.state.index;
            const { title, drawerLabel, drawerIcon } = props.descriptors[
              item.key
            ].options;
            return (
              <DrawerItem
                activeTintColor={props.activeTintColor}
                inactiveTintColor={props.inactiveTintColor}
                label={() => {
                  console.log('focused', focused);
                  return (
                    <Text
                      style={[
                        styles.optionLabel,
                        {
                          color: focused
                            ? props.activeTintColor
                            : props.inactiveTintColor,
                        },
                      ]}>
                      {drawerLabel}
                    </Text>
                  );
                }}
                icon={() => this.IconButton(drawerIcon, focused)}
                onPress={() => this.ProductsNav(item.name, props)}
                style={styles.option}
              // labelStyle={styles.optionLabel}
              />
            );
          })}
          <DrawerItem
            activeTintColor={props.activeTintColor}
            inactiveTintColor={props.inactiveTintColor}
            label={() => {
              // console.log('focused', focused);
              if (this.props.user !== null) {
                if (this.props.user.userId) {
                  return <Text style={[styles.optionLabel]}>LOGOUT</Text>;
                } else {
                  return <Text style={[styles.optionLabel]}>LOGIN</Text>;
                }
              } else {
                return <Text style={[styles.optionLabel]}>LOGIN</Text>;
              }
            }}
            icon={() => this.IconButton(icons.drawer8, false)}
            onPress={() => {
              if (this.props.userId == null) {
                props.navigation.navigate('Login');
              } else {
                Alert.alert(
                  'Logout',
                  'Are You sure you want to Logout?',
                  [
                    {
                      text: 'Yes',
                      onPress: () =>
                        this.props.logout((success) => {
                          if (success == 'Logout') {
                            props.navigation.navigate('Login');
                          }
                        }),
                    },
                    { text: 'No', onPress: () => console.log('OK Pressed') },
                  ],
                  { cancelable: false },
                );
              }
            }}
            style={styles.option}
          // labelStyle={styles.optionLabel}
          />
        </View>
      </DrawerContentScrollView>
    );
  }
}

const mapStates = (state) => {
  console.log('s', state);
  return {
    user: state.user.users,
    userId: state.user.userid,
  };
};
const ConnectedDrawerContent = connect(mapStates, { logout })(DrawerContent);
// const mapStates = (state) => {
//   return {
//     user: state.UserReducer.userData,
//   }
// }
// const mapProps = (dispatch) => {
//   return {
//     logout: (success, error) => {
//       dispatch(actions.logout(success, error))
//     },
//   }

// }
// DrawerContent =connect(mapStates, mapProps)(DrawerContent);

class Navigation extends Component {
  //   const [progress, setProgress] = React.useState(new Animated.Value(0));
  //   const scale = Animated.interpolate(progress, {
  //     inputRange: [0, 1],
  //     outputRange: [1, 0.8],
  //   });
  //   const borderRadius = Animated.interpolate(progress, {
  //     inputRange: [0, 1],
  //     outputRange: [0, 6 * vw],
  //   });

  //   const opacity = Animated.interpolate(progress, {
  //     inputRange: [0, 1],
  //     outputRange: [-vw * 20, 0],
  //   });

  //   const animatedStyle = { borderRadius, transform: [{ scale }] };
  //   const animatedOuterStyle = {transform: [{ scale }]}
  //   const imageStyle = { opacity };

  render() {
    console.log('user', this.props.user);
    return (
      <Drawer.Navigator
        // hideStatusBar

        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={{ flex: 1 }}
        drawerContentOptions={{
          activeBackgroundColor: 'transparent',
          activeTintColor: primaryColor,
          inactiveTintColor: sideBarInActiveItemColor,
        }}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        screenOptions={options}
        drawerContent={(props) => {
          //   setProgress(props.progress);
          return <ConnectedDrawerContent {...props} />;
        }}>
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: 'Home',
            drawerIcon: icons.drawer,
            headerShown: false,
          }}
          component={AppStack}
        />
        <Drawer.Screen
          name="AboutUs"
          options={{ drawerLabel: 'ABOUT US', drawerIcon: icons.drawer1 }}
          component={AboutUs}
        />
        <Drawer.Screen
          name="ContactUs"
          options={{ drawerLabel: 'CONTACT US', drawerIcon: icons.drawer2 }}
          component={ContactUs}
        />
        <Drawer.Screen
          name="ProductsStack"
          options={{
            drawerLabel: 'PRODUCTS',
            drawerIcon: icons.drawer3,
            headerShown: false,
          }}
          component={ProductsStack}
        />
        <Drawer.Screen
          name="Categories"
          options={{ drawerLabel: 'CATEGORIES', drawerIcon: icons.drawer4 }}
          component={Categories}
        />
        <Drawer.Screen
          name="WishList"
          options={{ drawerLabel: 'WISHLIST', drawerIcon: icons.drawer5 }}
          component={WishList}
        />
        {this.props.userId && <Drawer.Screen
          name="Points"
          options={{ drawerLabel: 'POINTS', drawerIcon: icons.drawer10, headerShown: false, }}
          component={PointsStack}
        />
        }
        <Drawer.Screen
          name="Cart"
          options={{ drawerLabel: 'CART', drawerIcon: icons.drawer9 }}
          component={Cart}
        />

        {this.props.userId && (
          <>
            <Drawer.Screen
              name="ProfileDetails"
              options={{ drawerLabel: 'PROFILE', drawerIcon: icons.drawer6 }}
              component={ProfileDetails}
            />
            <Drawer.Screen
              name="MyOrdersStack"
              options={{
                drawerLabel: 'MY ORDERS',
                drawerIcon: icons.drawer7,
                headerShown: false,
              }}
              component={OrdersStack}
            />
          </>
        )}

        {/* <Drawer.Screen name="Cart"  component={Cart} /> */}
        {/* <Drawer.Screen name="OrderDetails" component={OrderDetails} /> */}

        {/* <Drawer.Screen name="AboutUs" component={AboutUs} />
      <Drawer.Screen name="ContactUs" component={ContactUs} />
      <Drawer.Screen name="Products" component={Products} />
      <Drawer.Screen name="Categories" component={Categories} />
      <Drawer.Screen name="WishList" component={WishList} />
      <Drawer.Screen name="ProfileDetails" component={ProfileDetails} />
      <Drawer.Screen name="MyOrders" component={MyOrders} /> */}
      </Drawer.Navigator>
    );
  }
}

export default connect(mapStates)(Navigation);
// const styles = StyleSheet.create({

// });
