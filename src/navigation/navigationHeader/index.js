import vh from '../../Units/vh';
import vw from '../../Units/vw';
import { TransitionPresets } from '@react-navigation/stack';
import { Fonts } from '../../assets/fonts';
import TouchableHOC from '../../Components/TouchableHOC';
import { assets, icons } from '../../assets/images';
import { TouchableOpacity, Image, View, StatusBar, ImageBackground, Text } from 'react-native';
import React, { useReducer } from 'react';
import TextBold from '../../Components/TextBold';
import styles from './styles';
import CartButton from '../../Components/CartButton';
import { store } from '../../../App'
import {
  default_section_Color,
  default_text_color
} from '../../../config.json'
const shouldHeaderBeShown = (activeRouteName) => {
  // console.log('shouldHeaderBeShown', activeRouteName);

  switch (activeRouteName) {
    case 'AuthStackNavigator':
      return false;
    case 'Login':
      return false;
    case 'VerificationCode':
      return false;
    case 'PasswordRecovery':
      return false;
    case 'ResetPassword':
      return false;
    case 'SignUp':
      return false;
    case 'ProductDetail':
      return false;
    case 'App':
      return false;
    case 'Home':
      return false;

    default:
      return true;
  }
};
export const options = (props) => {
  console.log('getOptionns', props);
  var activeRouteName = props.route.state
    ? props.route.state.routes[props.route.state.index].name
    : props.route.name;
  // if(activeRouteName === ''){
  // StatusBar.setBackgroundColor('transparent');
  // StatusBar.setTranslucent(true);
  // }
  return {
    ...defaultOptions(activeRouteName, props),
    ...TransitionPresets.SlideFromRightIOS,
    headerShown: shouldHeaderBeShown(activeRouteName),
    title: getTitle(activeRouteName, props),
  };
};
const getTitle = (activeRouteName, props) => {


  switch (activeRouteName) {
    case 'Home':
      return 'Home';
    case 'MyOrders':
      return 'MY ORDERS';
    case 'OrderDetails':
      return 'ORDER DETAILS';
    case 'Categories':
      return 'CATEGORIES';
       case 'Points':
         return 'POINTS';
         case 'RedeemLog':
           return 'REDEEM LOG';
    case 'Products': {
      console.log('getTitle', props);

      if (props.route.params !== undefined) {
        if(props.route.params.categoryId==null){
          return 'PRODUCTS';
        }
        else if (props.route.params.categoryId !== undefined) {

          return props.route.params.categoryName;
        }

      }


      else
        return 'PRODUCTS';
    }

    case 'AboutUs':
      return 'ABOUT US';
    case 'ContactUs':
      return 'CONTACT US';
    case 'WishList':
      return 'MY WISHLIST';
    case 'ProfileDetails':
      return 'PROFILE DETAILS';
    case 'Cart':
      return 'MY CART';
    default:
      return activeRouteName;
  }
};

const renderDrawer = (navigation) => {

  return (
    <TouchableHOC onPress={() => navigation.openDrawer()}
    >
      <Image
        source={assets.menu}
        style={styles.menu}
        resizeMode="contain"
      />
    </TouchableHOC>
  )

}

const showLeftButton = (activeRouteName, navigation, route) => {
  console.log('activeRouteName, navigation', activeRouteName);

  if (activeRouteName == 'Cart' || activeRouteName == 'AboutUs' || activeRouteName == 'ContactUs' || activeRouteName == 'Categories' || activeRouteName == 'WishList'
    || activeRouteName == 'ProfileDetails' || activeRouteName == 'MyOrders' || activeRouteName == 'Products' || activeRouteName=='Points') {

    if (activeRouteName == 'Products') {

      console.log('par',route.params)
      if (route.params !== undefined) {

        if(route.params.categoryId!==null){
           
          return (
            <TouchableOpacity
              style={{ marginLeft: 5.5 * vw }}
              onPress={() => {
  
                if (activeRouteName == 'OrderDetails') {
                  const state = store.getState()
  
                  if (state.user.userid !== null) {
  
  
                    navigation.navigate('MyOrdersStack', {
                      screen: 'MyOrders',
  
                    })
  
                  }
  
                  else {
                    navigation.navigate('Home')
  
                  }
  
                }
  
                else {
  
                  navigation.navigate('Home',{
                    categoryId: null
                  })
                }
  
              }
              }>
              <Image
                source={icons.arrowHeader}
                style={{
                  width: 5.5 * vw,
                  height: 4 * vh,
                  resizeMode: 'contain',
                  tintColor: default_text_color,
                }}
              />
            </TouchableOpacity>
  
  
  
          );

        }

        else{
          
          return (

            renderDrawer(navigation)
          )

        }
        

      }

      else {

       
        return (

          renderDrawer(navigation)
        )

      }

    }
    else {

      return (

        renderDrawer(navigation)
      )
    }


  }

  else {

    return (
      <TouchableOpacity
        style={{ marginLeft: 5.5 * vw }}
        onPress={() => {

          if (activeRouteName == 'OrderDetails') {
            const state = store.getState()

            if (state.user.userid !== null) {

              navigation.goBack()
 

            }

            else {
              navigation.navigate('Home')

            }

          }

          else {

            navigation.goBack()
          }

        }
        }>
        <Image
          source={icons.arrowHeader}
          style={{
            width: 5.5 * vw,
            height: 4 * vh,
            resizeMode: 'contain',
            tintColor: default_text_color,
          }}
        />
      </TouchableOpacity>



    );

  }

};
const showHeaderRight = (activeRouteName, navigation) => {


  if (activeRouteName == 'Cart' || activeRouteName == 'Checkout') {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: vh * 0,
          marginRight: 5 * vw,
        }}>
        <TouchableOpacity
          style={{}}
          onPress={() => navigation.navigate('Search')}>
          <Image
            source={assets.search}
            style={{
              width: 4.5 * vw,
              height: 4 * vh,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  } else if (activeRouteName == 'Search') {
    return null;
  } else {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: vh * 0,
          marginRight: 5 * vw,
        }}>
        <TouchableOpacity
          style={{ marginRight: vw * 4 }}
          onPress={() => navigation.navigate('Search')}>
          <Image
            source={assets.search}
            style={{
              width: 4.5 * vw,
              height: 4 * vh,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>

        <CartButton navigation={navigation} />

      </View>
    );
  }
};

const defaultOptions = (activeRouteName, props) => {
  console.log('defaultProps', props);
  return {
    headerStyle: {
      backgroundColor: default_section_Color,
      // height: 10 * vh,
      shadowColor: 'transparent',
      elevation: 0,
      //   paddingTop: 3 * vh,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    headerRightContainerStyle: {
      paddingRight: 5 * vw,
      //   marginTop: 2 * vh,
    },

    headerRight: () => showHeaderRight(activeRouteName, props.navigation),
    headerLeft: () => showLeftButton(activeRouteName, props.navigation, props.route),
    //   headerTitle:(props)=>(<TextBold style={props.style}>{props.children}</TextBold>),
    ...TransitionPresets.SlideFromRightIOS,
    headerTitleAlign: 'center',
  };
};
