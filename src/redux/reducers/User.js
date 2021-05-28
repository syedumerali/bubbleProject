import { act } from 'react-test-renderer';
import { CREATEUSER, LOGINUSER, UPDATEPROFILE, UPDATEUSER, LOGOUT, ENABLEBIOMETRIC, CLEARBIOMETRIC,BIRTHDAYKEY,REMOVEBIRTHDAYKEY,SAVEPROFILE } from '../type';

const INITIAL_STATE = {

  users: null,
  userid: null,
  birthday:'',
  key:0,
  biometric: null,
  profile:null,

};

export default (state = INITIAL_STATE, action) => {

  console.log(action);
  switch (action.type) {

    case CREATEUSER:
      return {
        ...state,
        birthday:action.birthday
      }
    case CLEARBIOMETRIC: 
        return{
          ...state,
          biometric:INITIAL_STATE.biometric
        }
        case SAVEPROFILE: 
        return{
          ...state,
          profile:action.payload
        }
    case BIRTHDAYKEY:
      return{
        ...state,
        key:1
      }

      case REMOVEBIRTHDAYKEY:
      return{
        ...state,
        key:INITIAL_STATE.key
      }
    case LOGINUSER:

      if (action.password) {
        return {
          ...state,

          users: {
            email: action.payload.email,
            firstname: action.payload.firstname,
            lastname: action.payload.lastname,
            userId: action.payload.id,
            phone: '',
            password: action.password,
            billing: action.billing,
            shipping: action.shipping,
          }, userid: action.payload.id,

        }
      }
      else {
        return {
          ...state,

          users: {
            email: action.payload.email,
            firstname: action.payload.first_name,
            lastname: action.payload.last_name,
            userId: action.payload.id,
            phone: '',
            password: state.users.password,
            billing: action.billing,
            shipping: action.shipping,
          }, userid: action.payload.id,

        }
      }



    case ENABLEBIOMETRIC:
      return {
        ...state, biometric: action.payload
      }
    case UPDATEPROFILE:
      return {
        ...state, users: {
          email: action.payload.email,
          firstname: action.payload.first_name,
          lastname: action.payload.last_name,
          userId: action.payload.id,
          phone: '',

        }
      }

    case UPDATEUSER:
      return {
        ...state, users: {

          email: action.payload.EmailId,
          firstname: action.payload.first_name,
          lastname: action.payload.last_name,
          userId: action.payload.id,
          phone: action.payload.phone,
          address: action.payload.address,
          customer_note: action.payload.customer_note
        }
      }

    case LOGOUT:

      if (state.userid != null) {

        return { ...state, users: INITIAL_STATE.users, userid: INITIAL_STATE.userid };
      }
      else {

        return { ...state };
      }



    default:
      return state;
  }
}