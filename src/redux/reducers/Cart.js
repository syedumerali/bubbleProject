import { ADDTOCART, UPDATETOCART, DELETEFROMCART, ADD_DISCOUNT, DELETECART } from '../type';

const INITIAL_STATE = {

    cartItems: [],


};

export default (state = INITIAL_STATE, action) => {

    console.log(action.type);
    switch (action.type) {

        case ADDTOCART:
            console.log("actiona", action);
            console.log('cart', state.cartItems);
            let cart1 = state.cartItems
            let index1 = cart1.findIndex(x => x.product_id == action.payload.product_id)
            console.log('in', index1);
            // return {...state, 
            //              cartItems:[...state.cartItems,...action.payload] }

            if (index1 > -1) {
                state.cartItems[index1].quantity += action.payload.quantity;
                return {
                    ...state

                }

            }

            else {

                var newcart=[action.payload];
                return {
                    ...state,
                    cartItems: [...cart1, ...newcart]

                }
            }
        // case LOADEROFF:
        //     return{...state,loading:false}

        //     case LOADERON:
        //     return{...state,loading:true}

        case UPDATETOCART: {

            let newCart = [...state.cartItems];

            for (var i = 0; i < newCart.length; i++) {
                if (newCart[i].product_id === action.ItemId) {
                    newCart[i].quantity = action.ItemQuantity;
                }
            };

            return { ...state, cartItems: newCart }
        }




        case ADD_DISCOUNT:
            let oldcart = state.cartItems;
            let cartindex = oldcart.findIndex(x => x.product_id == action.payload.id);
            if (cartindex > -1) {

                oldcart[cartindex].discount = action.payload.discount;
                oldcart[cartindex].discountType = action.payload.discountType;
                return state;
            }

            else {

                return {
                    ...state
                }
            }


        case DELETEFROMCART:

            console.log('oldItems', state.cartItems);
            console.log('id', action.ItemId);
            let cart = state.cartItems
            let index = cart.findIndex(x => x.product_id == action.ItemId)

            if (index > -1) {

                cart.splice(index, 1);
             
                return {
                    ...state,
                    cartItems: [...cart]
                }
            } else {
                return {
                    ...state
                }
            }

        // findIndex
        // for (var i=0; i < state.cartItems.length; i++) {
        //     if (state.cartItems[i].id === action.ItemId) {
        //          state.cartItems.splice(i,1);
        //          return {
        //              ...state
        //             }
        //     }
        // };

        case DELETECART:
            return { ...state, cartItems: INITIAL_STATE.cartItems };


        default:
            return state;
    }
}