import { initialWindowMetrics } from 'react-native-safe-area-context';
import api from '../Api';
import forgotPw from '../ForgotPasswordApi';
import changePasswordApi from '../Api/ChangePasswordApi';

import {
     CATEGORIES_FETCH, PRODUCTS_FETCH, LOADEROFF, LOADERON, ITEMS_FETCH, RELATEDITEMS_FETCH,
     ALLPRODUCTS_FETCH, SORTITEMSBYTITLE, ADDTOCART, UPDATETOCART, ADDTOWISHLIST, DELETEFROMCART,
     ITEMS_INITIAL, PAGE_INITIAL, REMOVEFROMWISHLIST, CREATEUSER, LOGINUSER,
     FORGOTPASSWORD, DELETECOUPONS, UPDATEPROFILE, DELETEALLCOUPONS, DELETECART, UPDATEUSER, PLACEORDER, PAYMENTSLIST,
     ADDCOUPONS, GETORDERS, GETCOUPONS, ADD_DISCOUNT, ALLITEMS_INITIAL, SORTPRODUCTSBYTITLE, LOGOUT, DELETEWISHLIST, ADDPAYMENT, ABOUTUS,
     ENABLEBIOMETRIC, CLEARBIOMETRIC,BIRTHDAYKEY,REMOVEBIRTHDAYKEY,SAVEPROFILE

} from './type';


export const categoriesFetch = (pass) => {


     console.log('here');
     let params = false;


     return dispatch => {

          // dispatch({type: LOADERON})
          api.get('products/categories', '', success => {

               if (success.length < 10) {
                    params = true

               }
               console.log('sucess'.success)
               // dispatch({type: LOADEROFF})

               dispatch({
                    type: CATEGORIES_FETCH,
                    payload: success,
                    check: params
               })

               pass(success)
          },
               error => {

                    console.log('error', error);
                    pass(error)
               }
          )
     }
}

export const productsFetch = (pass) => {

     return dispatch => {


          api.get('products/categories', { 'per_page': 4 }, success => {



               dispatch({
                    type: PRODUCTS_FETCH,
                    payload: success
               })

               pass(success)
          },
               error => {

                    console.log('error', error)
                    pass(error)
               }
          )
     }
}

export const loaderOff = () => {

     return dispatch => {

          dispatch({ type: LOADEROFF })
     }
}

export const showBirthday = () => {

     return dispatch => {

          dispatch({ type: BIRTHDAYKEY })
     }
}

export const removeKey = () => {

     return dispatch => {

          dispatch({ type: REMOVEBIRTHDAYKEY })
     }
}

export const itemsFetch = (id, page, passSuccess) => {

     console.log('page', page);

     return dispatch => {

          // dispatch({type: LOADERON})
          api.get('products', { 'category': id, 'page': page, 'per_page': 10, "status": 'publish' }, success => {

               console.log('page', page)
               console.log('success', success)

               // dispatch({

               //      type: ITEMS_INITIAL
               // })

               // dispatch({

               //      type: PAGE_INITIAL
               // })
               // // dispatch({type: LOADEROFF})


               // dispatch({
               //      type: ITEMS_FETCH,
               //      payload: success
               // })

               passSuccess(success)
          },
               error => {

                    console.log('error', error.message)
               }
          )
     }

}

export const storepayment = (payment, success, error) => {

     return dispatch => {

          dispatch({
               type: ADDPAYMENT,
               payload: payment
          })
     }
}

export const relatedProductsFetch = (relatedId, succes) => {

     console.log('id', relatedId)

     return dispatch => {


          api.get('products', { 'include': relatedId }, success => {


               console.log('success', success)


               dispatch({
                    type: RELATEDITEMS_FETCH,
                    payload: success
               })

               succes(success)
          },
               error => {

                    console.log('error message', error)
               }
          )
     }

}

export const getProduct = (relatedId, apiSuccess, apiError) => {

     console.log('id', relatedId)

     return dispatch => {


          api.get('products', { 'include': relatedId }, success => {


               console.log('success', success)

             



               return apiSuccess(success)
          },
               error => {

                    console.log('error message', error)
                    apiError(error)
               }
          )
     }

}

export const addReview = (id, review, name, email, rating, succes) => {



     return dispatch => {

          dispatch({ type: LOADERON })
          api.post('products/reviews', { "product_id": id, "review": review, "reviewer": name, "reviewer_email": email, "rating": rating }, '', success => {


               console.log('success', success)
               dispatch({ type: LOADEROFF })

               succes(success)
          },
               error => {

                    console.log('error message', error)
               }
          )
     }

}

export const getReview = (id, succes) => {



     return dispatch => {


          api.get(`products/reviews/${id}`, '', success => {


               console.log('success', success)


               succes(success)
          },
               error => {

                    console.log('error message', error)
               }
          )
     }

}

export const AllproductsFetch = (page, passsuccess) => {

     let params = false;

     return dispatch => {

          // dispatch({type: LOADERON})
          api.get('products', { 'page': page }, success => {

               if (success.length < 10) {
                    params = true

               }


               console.log('success', success)

               // dispatch({type: LOADEROFF})

               dispatch({

                    type: PAGE_INITIAL
               })

               dispatch({
                    type: ALLPRODUCTS_FETCH,
                    payload: success,
                    check: params
               })

               passsuccess(success)
          },
               error => {

                    console.log('error', error)
               }
          )
     }
}

export const Price = (id, page, params, passSucces, error) => {



     return dispatch => {

          // dispatch({type: LOADERON})
          // (id == undefined) | (id == null)
          // ? {page: page, ...params}
          //   : {category: id, page: page, ...params},


          api.get('products', (id == undefined) | (id == null)
               ? { page: page, ...params }
               : { category: id, page: page, ...params }, success => {



                    console.log('success', success)

                    // dispatch({type: LOADEROFF})

                    dispatch({

                         type: ITEMS_INITIAL
                    })
                    dispatch({
                         type: SORTITEMSBYTITLE,
                         payload: success,

                    })

                    passSucces(success)
               },
               error => {

                    console.log('error', error)
               }
          )
     }
}

export const WishlistSort = (id, params, passSucces, error) => {



     return dispatch => {

          // dispatch({type: LOADERON})
          api.get('products',
               { include: id, ...params }, success => {



                    console.log('success', success)

                    // dispatch({type: LOADEROFF})

                    dispatch({

                         type: ITEMS_INITIAL
                    })
                    dispatch({
                         type: SORTITEMSBYTITLE,
                         payload: success,

                    })

                    passSucces(success)
               },
               error => {

                    console.log('error', error)
               }
          )
     }
}

export const Popularity = (id, page, title, passSucces) => {



     return dispatch => {

          //  dispatch({type: LOADERON})
          api.get('products', { 'orderby': title, 'category': id, 'page': page, 'per_page': 10, "status": 'publish' }, success => {



               console.log('success', success)

               //  dispatch({type: LOADEROFF})

               dispatch({

                    type: ITEMS_INITIAL
               })
               dispatch({
                    type: SORTITEMSBYTITLE,
                    payload: success,

               })

               passSucces(success)
          },
               error => {

                    console.log('error', error)
               }
          )
     }
}

export const AddtoCart = (id, title, price, quantity, image, variation_id, extratopping) => {

     let params = false;

     return dispatch => {

          if (variation_id == '') {

               if (extratopping !== null) {
                    dispatch({
                         type: ADDTOCART,

                         payload: { product_id: id, quantity: quantity, add_on_details: extratopping }
                    })

               }
               else {
                    dispatch({
                         type: ADDTOCART,

                         payload: { product_id: id, quantity: quantity, }
                    })
               }

               //pass('success');
          }

          else {


               if (extratopping !== null) {
                    dispatch({
                         type: ADDTOCART,

                         payload: { product_id: id, quantity: quantity, add_on_details: extratopping, variation_id: variation_id, variationprice: price }
                    })

               }
               else {
                    dispatch({
                         type: ADDTOCART,

                         payload: { product_id: id, quantity: quantity, variation_id: variation_id, variationprice: price }
                    })
               }


          }


     }
}

filterArray = (order) => {

     // console.log('o',order)
     return order.enabled == true
}



export const UpdatetoCart = (id, quantity) => {

     let params = false;
     console.log('quan', quantity)

     return dispatch => {

          dispatch({
               type: UPDATETOCART,
               ItemId: id,
               ItemQuantity: quantity
          })
     }
}



export const addPayment = (passSucces) => {

     return dispatch => {

          api.get('payment_gateways', '', success => {

               console.log('success', success)

               //  dispatch({type: LOADEROFF})

               var array = success.filter(filterArray)
               console.log('array', array)
               dispatch({
                    type: PAYMENTSLIST,
                    payload: array,

               })

               passSucces(success)
          },
               error => {

                    console.log('error', error)
               }
          )
     }
}


export const AddtoWishList = (item) => {

     let params = false;
     let wishItems = [];


     console.log('wish', item.id)

     return dispatch => {

          dispatch({
               type: ADDTOWISHLIST,
               payload: item.id
          })
     }
}

export const RemovefromCart = (id) => {




     return dispatch => {

          dispatch({
               type: DELETEFROMCART,
               ItemId: id,
          })
     }
}

export const RemovefromWishlist = (id) => {




     return dispatch => {

          dispatch({
               type: REMOVEFROMWISHLIST,
               ItemId: id,
          })
     }
}

export const ViewmoreItems = (id, page, succces) => {

     console.log('page', page);
     return dispatch => {


          if (id !== '') {
               api.get('products', { 'category': id, 'page': page, 'per_page': 10 }, success => {

                    console.log('page', page)
                    console.log('success', success)



                    dispatch({
                         type: ITEMS_FETCH,
                         payload: success
                    })

                    succces(success)
               },
                    error => {

                         console.log('error', error)
                    }
               )

          }

          else {
               api.get('products', { 'page': page, 'per_page': 10 }, success => {

                    console.log('page', page)
                    console.log('success', success)



                    dispatch({
                         type: ITEMS_FETCH,
                         payload: success
                    })

                    succces(success)
               },
                    error => {

                         console.log('error', error)
                    }
               )

          }
     }


}

export const PriceProduct = (page, sort, title, passSucces) => {

     console.log(sort)

     return dispatch => {

          dispatch({ type: LOADERON })
          api.get('products', { 'order': sort, 'orderby': title, 'page': page, 'per_page': 10 }, success => {



               console.log('success', success)

               dispatch({ type: LOADEROFF })

               dispatch({

                    type: ALLITEMS_INITIAL
               })
               dispatch({
                    type: SORTPRODUCTSBYTITLE,
                    payload: success,

               })

               passSucces(success)
          },
               error => {

                    console.log('error', error)
               }
          )
     }
}

export const PopularityProduct = (page, title, passSucces) => {



     return dispatch => {

          dispatch({ type: LOADERON })
          api.get('products', { 'orderby': title, 'page': page, 'per_page': 10 }, success => {



               console.log('success', success)

               dispatch({ type: LOADEROFF })

               dispatch({

                    type: ALLITEMS_INITIAL
               })
               dispatch({
                    type: SORTPRODUCTSBYTITLE,
                    payload: success,

               })

               passSucces(success)
          },
               error => {

                    console.log('error', error)
               }
          )
     }
}

export const CreateUser = (firstName, LastName, Email, phone, password, Address, dob, passSucess) => {

     console.log('dob', dob);
     var billing = {
          "phone": phone,
          "address_1": Address,
          "address_2": Address
     }

     var shipping = {
          "phone": phone,
          "address_1": Address,
          "address_2": Address
     }

     return dispatch => {

          dispatch({ type: LOADERON })

          api.postredeem('signup', { 'firstname': firstName, 'lastname': LastName, 'email': Email, 'username': Email, 'billing': billing, "shipping": shipping, 'password': password, 'dateofbirth': dob }, '', success => {

               console.log('success', success)
               dispatch({ type: LOADEROFF })

               passSucess(success)
          },
               error => {

                    passSucess(error)
                    console.log('error', error)
               }


          )


     }
}

export const redeem = (id, passSucess) => {


     return dispatch => {


          api.postredeem('redeempoints', {'points_id':id}, '', success => {

               console.log('orderGet', success)
               passSucess(success)

          },
               error => {


                    passSucess(error)
                    console.log('error', error)
               }
          )
     }
}
export const getRedeemLogs = (id, passSucess,sort=false) => {

     if(sort==false){
          return dispatch => {


               api.getredeem('redeemlogs', id, '', success => {
     
                    console.log('orderGet', success)
                    passSucess(success)
     
               },
                    error => {
     
     
                         passSucess(error)
                         console.log('error', error)
                    }
               )
          }
     }
     else{
          return dispatch => {


               api.getredeem('redeemlogs', id, sort, success => {
     
                    console.log('orderGet', success)
                    passSucess(success)
     
               },
                    error => {
     
     
                         passSucess(error)
                         console.log('error', error)
                    }
               )
          }
     }
  
}
export const redeempoints = (id, passSucess) => {


     return dispatch => {


          api.getredeem('getallpoints', id, '', success => {

               console.log('orderGet', success)
               passSucess(success)

          },
               error => {


                    passSucess(error)
                    console.log('error', error)
               }
          )
     }
}
export const SaveUser = (id, passSucess) => {


     return dispatch => {


          api.getredeem('profile', id, '', success => {

               console.log('orderGet', success)

               dispatch({
                    type: SAVEPROFILE,
                    payload: success
               })
               // dispatch({
               //      type: LOGINUSER,
               //      payload: success,
               //      shipping:success.shipping,
               //      billing:success.billing
               // })
               passSucess(success)

          },
               error => {


                    passSucess(error)
                    console.log('error', error)
               }
          )
     }
}


export const LoginUser = (email, password, passSucess) => {

     var credentials = { email: email, password: password }
     return dispatch => {

          dispatch({ type: LOADERON })
          api.auth(credentials, success => {

               console.log('success login', success)


               dispatch({ type: LOADEROFF })
               dispatch({
                    type: LOGINUSER,
                    payload: success.user,
                    password: password,
                    shipping: '',
                    billing: ''
               })

               passSucess(success)
          },
               error => {

                    dispatch({ type: LOADEROFF })
                    passSucess(error)
                    console.log('error', error)
               }
          )
     }
}
export const savebiometric = (info) => {

     return dispatch => {
          dispatch({
               type: ENABLEBIOMETRIC,
               payload: info
          })
     }
}
export const clearbiometric = () => {

     return dispatch => {
          dispatch({
               type: CLEARBIOMETRIC,

          })
     }
}
export const ForgotPassword = (email, passSucess) => {

     return dispatch => {

          dispatch({ type: LOADERON })
          forgotPw.post('forgotpassword', { '?email': email }, success => {

               console.log('email sent', success)


               dispatch({ type: LOADEROFF })

               passSucess(success)
          },
               error => {

                    dispatch({ type: LOADEROFF })
                    passSucess(error)
                    console.log('error', error)
               }
          )
     }
}

export const verifyCode = (code, passSucess) => {

     return dispatch => {

          dispatch({ type: LOADERON })
          forgotPw.post('code_verify', { '?code': code }, success => {

               console.log('email sent', success)
               dispatch({ type: LOADEROFF })

               passSucess(success)
          },
               error => {

                    dispatch({ type: LOADEROFF })
                    passSucess(error)
                    console.log('error', error)
               }
          )
     }
}

export const changePassword = (code, newPassword, passSucess) => {

     return dispatch => {

          dispatch({ type: LOADERON })
          changePasswordApi.post('change_password', { 'code': code, 'password': newPassword }, success => {

               console.log('email sent', success)
               dispatch({ type: LOADEROFF })

               passSucess(success)
          },
               error => {

                    dispatch({ type: LOADEROFF })
                    passSucess(error)
                    console.log('error', error)
               }
          )
     }
}
export const UpdateProfile = (firstName, LastName, Email, phone, id,dob, passSucess) => {

     console.log('first', firstName)
     var billing = {
          "first_name": firstName,
          "last_name": LastName,
       
          "phone": phone,
     }
     var shipping = {
          "first_name": firstName,
          "last_name": LastName,
        
          "phone": phone,
     }
     return dispatch => {

          dispatch({ type: LOADERON })
          api.postredeem('updateprofile', { 'firstname': firstName, 'lastname': LastName, "email": Email,"phone":phone, "billing": billing, "shipping": shipping,"user_id":id,"dateofbirth":dob }, '', success => {

               console.log('email sent', success)


               dispatch({ type: LOADEROFF })
               // dispatch({
               //      type: UPDATEPROFILE,
               //      payload: success
               // })
               passSucess(success)
          },
               error => {

                    dispatch({ type: LOADEROFF })
                    passSucess(error)
                    console.log('error', error)
               }
          )
     }
}
export const UpdatePasswordApi = (firstName, Email, id, password, passSucess) => {

     return dispatch => {

          dispatch({ type: LOADERON })
          api.post(`customers/${id}`, { 'first_name': firstName, 'password': password, 'username': Email, 'email': Email }, '', success => {

               console.log('email sent', success)


               dispatch({ type: LOADEROFF })
               passSucess(success)
          },
               error => {

                    dispatch({ type: LOADEROFF })
                    passSucess(error)
                    console.log('error', error)
               }
          )
     }
}


export const UpdateUser = (firstName, LastName, Email, phone, address, id, notes) => {

     return dispatch => {

          dispatch({
               type: UPDATEUSER,
               payload: {
                    first_name: firstName,
                    last_name: LastName,
                    phone: phone,
                    EmailId: Email,
                    address: address,
                    id: id,
                    customer_note: notes
               }
          })
     }
}

export const aboutUs = (passSucess) => {

     return dispatch => {


          forgotPw.get('get_app_data', success => {

               console.log('email sent', success)

               dispatch({
                    type: ABOUTUS,
                    payload: success

               })
               passSucess(success)
          },
               error => {


                    passSucess(error)
                    console.log('error', error)
               }
          )
     }
}


export const PlaceOrder = (user, Total, discount, cart, coupons, payment, passSucess) => {

     console.log('list', payment)

     var billing = {
          "first_name": user.firstname,
          "last_name": user.lastname,
          "address_1": user.address,
          "email": user.email
     }
     var items = [];

     for (let i = 0; i < cart.length; i++) {

          if (cart[i].variation_id == undefined && cart[i].add_on_details == undefined) {
               items.push({
                    "product_id": cart[i].product_id,
                    "quantity": cart[i].quantity,

               })
          }

          else if (cart[i].variation_id && cart[i].add_on_details) {

               console.log('ss')
               items.push({
                    "product_id": cart[i].product_id,
                    "quantity": cart[i].quantity,
                    "add_on_details": cart[i].add_on_details,
                    "variation_id": cart[i].variation_id
               })
          }
          else if (cart[i].add_on_details) {
               items.push({
                    "product_id": cart[i].product_id,
                    "quantity": cart[i].quantity,
                    "add_on_details": cart[i].add_on_details
               })

          }

          else if (cart[i].variation_id) {

               items.push({
                    "product_id": cart[i].product_id,
                    "quantity": cart[i].quantity,
                    "variation_id": cart[i].variation_id
               })
          }

     }



     console.log('items', cart)

     return dispatch => {

          dispatch({ type: LOADERON })
          if (user.userId !== '') {

               api.post('orders', {
                    "customer_id": user.userId, "coupon_lines": coupons, "shipping": billing, "billing": billing,
                    "line_items": items, "customer_note": user.customer_note, "payment_method": payment.id, "payment_method_title": payment.method_title
               }, '', success => {

                    console.log('order', success)


                    dispatch({ type: LOADEROFF })

                    dispatch({

                         type: DELETEALLCOUPONS,
                    })
                    dispatch({
                         type: GETORDERS,
                         payload: success,

                    })


                    passSucess(success)
               },
                    error => {

                         dispatch({ type: LOADEROFF })
                         passSucess(error)
                         console.log('error', error)
                    }
               )

          }

          else {


               api.post('orders', { "coupon_lines": coupons, "shipping": billing, "billing": billing, "line_items": items, "customer_note": user.customer_note, "payment_method": payment.id, "payment_method_title": payment.method_title }, '', success => {

                    console.log('order', success)


                    dispatch({ type: LOADEROFF })

                    dispatch({

                         type: DELETEALLCOUPONS,
                    })

                    dispatch({
                         type: LOGOUT,
                    })

                    dispatch({
                         type: GETORDERS,
                         payload: success,

                    })


                    passSucess(success)
               },
                    error => {

                         dispatch({ type: LOADEROFF })
                         passSucess(error)
                         console.log('error', error)
                    }
               )
          }
     }

}

export const GetOrder = (id, pass) => {



     return dispatch => {


          api.get('orders', { 'customer': id }, success => {

               console.log('orderGet', success)



               pass(success)

          },
               error => {


                    pass(error)
                    console.log('error', error)
               }
          )
     }
}

export const Getprofile = (id, passsucces) => {



     return dispatch => {


          api.getredeem('profile',id ,'', success => {

               console.log('orderGet', success)


               dispatch({
                    type: SAVEPROFILE,
                    payload: success
               })
               passsucces(success)

          },
               error => {


                    passsucces(error)
                    console.log('error', error)
               }
          )
     }
}

export const retrieveOrder = (id, passsucces) => {



     return dispatch => {


          api.get(`orders/${id}`, '', success => {

               console.log('orderGet', success)



               passsucces(success)

          },
               error => {


                    passSucess(error)
                    console.log('error', error)
               }
          )
     }
}

export const RetrieveOrder = (id, passsucces) => {
     return dispatch => {

          dispatch({ type: LOADERON })
          api.get(`orders/${id}`, '', success => {

               console.log('order', success)


               dispatch({ type: LOADEROFF })
               passsucces(success)

          },
               error => {

                    dispatch({ type: LOADEROFF })
                    passsucces(error)

                    console.log('error', error)
               }
          )
     }
}
export const GetCoupons = (promo, passSucess) => {
     return dispatch => {

          dispatch({ type: LOADERON })
          api.get('coupons', { 'code': promo }, success => {

               console.log('coupons', success)


               dispatch({ type: LOADEROFF })

               dispatch({
                    type: GETCOUPONS,
                    payload: success,

               })

               passSucess(success)
          },
               error => {

                    dispatch({ type: LOADEROFF })
                    passSucess(error)
                    console.log('error', error)
               }
          )
     }
}


export const AddDiscount = (id, discount, discountType, passsucces) => {

     console.log('here')
     return dispatch => {

          dispatch({
               type: ADD_DISCOUNT,
               payload: {
                    id: id,
                    discount: discount,
                    discountType: discountType,

               }
          })

          passsucces('success')
     }
}

export const DeleteCart = () => {

     console.log('here')
     return dispatch => {

          dispatch({
               type: DELETECART,

          })


     }
}


export const DeleteallCoupons = () => {

     console.log('here')
     return dispatch => {

          dispatch({
               type: DELETEALLCOUPONS,

          })


     }
}

export const addCoupons = (code, discount, success) => {

     console.log('here')

     var list = {
          code: code,
          discount: discount
     }
     return dispatch => {

          dispatch({
               type: ADDCOUPONS,
               payload: list
          })

          success('coupons added')
     }
}

export const deleteCoupons = (code, success) => {

     console.log('here')

     return dispatch => {

          dispatch({
               type: DELETECOUPONS,
               code: code
          })

          success('coupons deleted')
     }
}

export const CancelOrder = (id, status, passsucces) => {
     return dispatch => {

          dispatch({ type: LOADERON })
          api.cancel(`orders/${id}`, { 'status': status }, success => {

               console.log('order', success)


               dispatch({ type: LOADEROFF })
               passsucces(success)

          },
               error => {

                    dispatch({ type: LOADEROFF })
                    passsucces(error)

                    console.log('error', error)
               }
          )
     }
}

export const contactUs = (name, email, message, phone, pass) => {

     console.log('p', phone)
     return dispatch => {

          dispatch({ type: LOADERON })
          forgotPw.post('contact_form', { '?name': name, '&email': email, '&message': message, '&phone': phone }, success => {

               console.log('order', success)


               dispatch({ type: LOADEROFF })
               pass(success)

          },
               error => {

                    dispatch({ type: LOADEROFF })
                    pass(error)

                    console.log('error', error)
               }
          )
     }
}

export const logout = (success) => {

     console.log('here')

     return dispatch => {

          dispatch({
               type: LOGOUT,
          })

          dispatch({
               type: DELETECART,
          })

          dispatch({
               type: DELETEWISHLIST,
          })

          success('Logout')
     }
}

export const getVariations = (id, passSucces) => {

     console.log('itemid', id)


     return dispatch => {

          dispatch({ type: LOADERON })
          api.get(`products/${id}`, '', success => {

               console.log('variations', success)


               dispatch({ type: LOADEROFF })
               passSucces(success)

          },
               error => {

                    dispatch({ type: LOADEROFF })
                    passSucces(error)

                    console.log('error', error)
               }
          )
     }
}

export const getListVariations = (id, passSucces) => {

     console.log('itemid', id)


     return dispatch => {

          dispatch({ type: LOADERON })
          api.get(`products/${id}/variations`, '', success => {

               console.log('variations list', success)


               dispatch({ type: LOADEROFF })
               passSucces(success)

          },
               error => {

                    dispatch({ type: LOADEROFF })
                    passSucces(error)

                    console.log('error', error)
               }
          )
     }
}

export const searchProducts = (product, passSucces) => {

     return dispatch => {

          // dispatch({ type: LOADERON })
          api.get('products', { 'search': product }, success => {

               console.log('variations', success)

               // dispatch({ type: LOADEROFF })
               passSucces(success)

          },
               error => {

                    // dispatch({ type: LOADEROFF })
                    passSucces(error)

                    console.log('error', error)
               }
          )
     }
}









