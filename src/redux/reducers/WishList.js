import {ADDTOWISHLIST,REMOVEFROMWISHLIST,DELETEWISHLIST} from '../type';

const INITIAL_STATE ={
    
    WishListItems: [],
    
      
};

export default (state=INITIAL_STATE,action) => {

    
    switch(action.type){
            // case LOADEROFF:
            //     return{...state,loading:false}

            //     case LOADERON:
            //     return{...state,loading:true}

            case ADDTOWISHLIST:

             
                
                return {...state, WishListItems:[...state.WishListItems,action.payload], 
                };

                case REMOVEFROMWISHLIST:
                    console.log('oldItems', state.WishListItems);
                    console.log('id', action.ItemId);
                    let cart = state.WishListItems
                    let index = cart.findIndex(x=> x == action.ItemId)
        
                    if(index > -1){
                        
                        cart.splice(index,1);
                        console.log('cartcartcart ',cart)
                        return {
                            ...state,WishListItems:[...cart]
                        }
                    }else{
                        return {
                            ...state
                        }     
                    }


                    case DELETEWISHLIST:
                        return {...state,WishListItems:INITIAL_STATE.WishListItems};
    
        default:
            return state;
    }
}