/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';
// import { Signup,LogIn } from './src/screens'
import SignUp from './src/screens/SignUp';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Products from './src/screens/Products';
import PasswordRecovery from './src/screens/PasswordRecovery';
import WishList from './src/screens/WishList';
import ProductDetail from './src/screens/ProductDetail';
import AboutUs from './src/screens/AboutUs';
import Birthday from './src/screens/BirthdayPopup';
import ContactUs from './src/screens/ContactUs';
import Cart from './src/screens/Cart';
import Checkout from './src/screens/Checkout';
import ProfileDetails from './src/screens/ProfileDetails';
import MyOrders from './src/screens/MyOrders';
import Loader from './src/Components/Loader';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import OrderDetails from './src/screens/OrderDetails';
import Categories from './src/screens/Categories';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import combineReducer from './src/redux/reducers/combineReducers';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { options } from './src/navigation/navigationHeader';
// import AnimatedSplash from 'react-native-animated-splash';
import SplashScreen from 'react-native-splash-screen'
const Auth = createStackNavigator();
const Root = createStackNavigator();
const App1 = createStackNavigator();
import Drawer from './src/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export const persistedReducer = persistReducer(persistConfig, combineReducer);
export const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
export const persistor = persistStore(store);




const AuthStack = () => {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="Login" component={Login} />
      <Auth.Screen name="PasswordRecovery" component={PasswordRecovery} />

      <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
  );
};
const RootStack = () => {
  return (
    <Root.Navigator screenOptions={{ headerShown: false }}>
      {/* <Root.Screen name="App" component={AppStack} /> */}

      <Root.Screen name="App" component={Drawer} />
      <Root.Screen name="Login" component={Login} />
      <Root.Screen name="PasswordRecovery" component={PasswordRecovery} />
      {/* <Root.Screen name="Checkout" component={Checkout} /> */}
      <Root.Screen name="SignUp" component={SignUp} />
    </Root.Navigator>
  );
};

class App extends React.Component {
  componentDidMount(){
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
      console.log('hiding screen');
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <StatusBar
              animated
              barStyle="dark-content"
              backgroundColor="#FFFFFF"
              translucent={false}
            />
            <Loader />
            {/* <Birthday /> */}
            <RootStack />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
