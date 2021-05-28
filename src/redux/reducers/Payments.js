import { PAYMENTSLIST,ADDPAYMENT } from '../type';

const INITIAL_STATE = {

    payments: null,
      paymentmethod:null

};

export default (state = INITIAL_STATE, action) => {

    console.log(action.type);
    switch (action.type) {

        case PAYMENTSLIST:
              
          
            return {...state, payments: action.payload};

            case ADDPAYMENT:
              
          
                return {...state, paymentmethod: action.payload};

        default:
            return state;
    }
}