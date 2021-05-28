import {PRODUCTS_FETCH,ITEMS_FETCH,RELATEDITEMS_FETCH,ALLPRODUCTS_FETCH,
    SORTITEMSBYTITLE,ITEMS_INITIAL,PAGE_INITIAL,ALLITEMS_INITIAL,SORTPRODUCTSBYTITLE,ABOUTUS} from '../type';

const INITIAL_STATE ={products: null,
                       items:[],
                    page:1,
                     relatedItems:'',
                    allItems:[],
                    itemsCheck : false,
                    itemsByTitle:[],
                    aboutus:null
                };

export default (state=INITIAL_STATE,action) => {

    console.log('actiontype',action.type);
   
    switch(action.type){

        case PRODUCTS_FETCH:
          
            return {...state, products: action.payload};
            
            case ITEMS_INITIAL:
               
                var array=state.items;
                console.log('stateitem',state.items);
                console.log('listitem',action.payload)
                return {...state,items:INITIAL_STATE.items};

                case ALLITEMS_INITIAL:
               
                    var array=state.items;
                    console.log('stateitem',state.items);
                    console.log('listitem',action.payload)
                    return {...state,allItems:INITIAL_STATE.allItems};

                case PAGE_INITIAL:
               
                    var array=state.items;
                   
                    console.log('pageinitial',state.page)
                    return {...state,page:INITIAL_STATE.page};
    
                    
            case ITEMS_FETCH:
               
                var array=state.items;
                console.log('listitem',state.items)
                return {...state,items:[...state.items,...action.payload],
                                    page :state.page+1 };

                 case RELATEDITEMS_FETCH:
                     console.log('action',action.payload)
                  return {...state, relatedItems: action.payload};

                  case ALLPRODUCTS_FETCH:
                    return {...state, allItems:[...state.allItems,...action.payload],
                        page :state.page+1, itemsCheck:action.check  };

                        case SORTITEMSBYTITLE:
                            
                            return {...state, items:[...state.items,...action.payload],
                                page :state.page+1 };

                                case SORTPRODUCTSBYTITLE:
                            
                                    return {...state, allItems:[...state.allItems,...action.payload],
                                        page :state.page+1 };

                                        case ABOUTUS:
                                      return {...state, aboutus: action.payload};
             
        default:
            return state;
    }
}