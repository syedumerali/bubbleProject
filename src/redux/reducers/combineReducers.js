import {combineReducers} from 'redux';
import Categories from './Categories';
import Products from './Products';
import Cart from './Cart';
import WishList from './WishList';
import User from './User';
import Orders from './Orders';
import Coupons from './Coupons';
import Payments from './Payments';

 export default combineReducers({
     category : Categories,
     product : Products,
     cart :Cart,
     wishlist:WishList,
     user: User,
     orders :Orders,
     coupons :Coupons,
     payments: Payments
 });