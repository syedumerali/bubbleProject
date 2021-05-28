import {CATEGORIES_FETCH,LOADEROFF,LOADERON} from '../type';

const INITIAL_STATE ={
    
    categories: [],
    loading:false,
  
    itemsCheck : false
      
};

export default (state=INITIAL_STATE,action) => {

    console.log(action.type);
    switch(action.type){

        case CATEGORIES_FETCH:
            console.log("actiona",action);
            return {...state, categories:action.payload,
               
                itemsCheck:action.check 
            
            };

            case LOADEROFF:
                return{...state,loading:false}

                case LOADERON:
                return{...state,loading:true}


        default:
            return state;
    }
}