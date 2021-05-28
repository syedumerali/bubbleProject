import { GETCOUPONS, ADDCOUPONS,DELETECOUPONS,DELETEALLCOUPONS} from '../type';

const INITIAL_STATE = {

   
    listcoupons:[],


};

export default (state = INITIAL_STATE, action) => {

    console.log(action.type);
    switch (action.type) {

                case ADDCOUPONS:
           
           
                return {...state, listcoupons:[...state.listcoupons,action.payload],    
                };

           case DELETECOUPONS:

            let coupons = state.listcoupons;
            let index = coupons.findIndex(x=> x.code == action.code)

            if(index > -1){
                console.log(index)
                coupons.splice(index,1);
              
                return {
                    ...state,
                    listcoupons:[...state.listcoupons]
                }
            }else{
                return {
                    ...state
                }     
            }
            case DELETEALLCOUPONS:
            return {...state,listcoupons:INITIAL_STATE.listcoupons};

        default:
            return state;
    }
}