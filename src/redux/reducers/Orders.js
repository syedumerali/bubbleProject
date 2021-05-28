import { GETORDERS,} from '../type';

const INITIAL_STATE = {

    orderItems: '',
  

};

export default (state = INITIAL_STATE, action) => {

    console.log(action.type);

    switch (action.type) {

        case GETORDERS:
            console.log("actiona", action);
           
                return {...state, orderItems:[...state.orderItems,{...action.payload}],    
                };


        default:
            return state;
    }
}