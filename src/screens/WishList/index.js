import React from 'react';
import { View, ImageBackground, Image, FlatList, TouchableOpacity,RefreshControl } from 'react-native';
import { backgrounds, assets, icons, samplePictures } from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import TextRegular from '../../Components/TextRegular';

import TextMedium from '../../Components/TextMedium';
import ProductItem from '../../Components/ProductItem';
import { connect } from 'react-redux';
import DropDown from '../../Components/DropDown';
import TextSemi from '../../Components/TextSemi';
import { getProduct, WishlistSort} from '../../redux/actions';
import {
  loaderColor
} from '../../../config.json';

const data = [
  { image: samplePictures.prod1 },
  { image: samplePictures.prod2 },
  { image: samplePictures.prod1 },
  { image: samplePictures.prod2 },
  { image: samplePictures.prod1 },
  { image: samplePictures.prod2 },
  { image: samplePictures.prod1 },
  { image: samplePictures.prod2 },
];


class Products extends React.Component {

  componentDidMount() {
    this.props.navigation.addListener('focus', this.loadProducts);
    this.props.navigation.addListener('blur', this.clearProducts);
  }

  constructor(props) {

    super(props);

    this.state = {


      items: null,
      page: 1,
      flag: true,
      filter: null,
    }

  }

  clearProducts = () => {


    this.setState({

      items: [],
      page: 1,
      flag: true
    })
  }
  componentWillUnmount() {
    this.props.navigation.removeListener('focus');
    this.props.navigation.removeListener('blur');
  }
  loadProducts = () => {

    console.log('flag', this.state.flag)
    
    if(this.props.wishlist.length>0){
          
      this.setState({
        flag: true
      })
     
      this.props.getProduct(this.props.wishlist, passSuccess => {

        this.setState({
  
          items: passSuccess,
          flag: false
        })
      },error=> {
           if(error.length>0)
           {
            this.setState({

              flag: false
            })

           }
      
         
      }
      
      );

    }
    else{

      this.setState({
        flag: false
      })
    }
  
  }

  removeFromWishlist = (id) => {

    let newwishlist = [...this.state.items]

    let index = newwishlist.findIndex(element => element.id == id)
    newwishlist.splice(index, 1);

    this.setState({
      items: [...newwishlist]
    });
  }
  _renderItem = ({ item, index }) => {
    return (
      <ProductItem
        item={item}
        onPress={() =>    this.props.navigation.navigate('ProductsStack', {
          screen: 'ProductDetail',
          params: {
            itemid: item.id,
           
          }
        })}
        selected={true}
        removeFromWishlist={this.removeFromWishlist}
      />
    );
  };

  // sortingItems = (params = null) => {

  //   // if (itemlabel == 'Price Low to High' || itemlabel == 'Price High to Low') {
  //   //   this.setState({

  //   //     flag: true
  //   //   })
  //   //   this.props.Price(id, 1, sort, 'price', success => {

  //   //     this.setState({
  //   //       items: success,
  //   //       flag: false
  //   //     })
  //   //   });

  //   // }

  //   // else if (itemlabel == 'Popularity') {

  //   //   this.setState({

  //   //     flag: true
  //   //   })
  //   //   this.props.Popularity(id, 1, 'popularity', success => {

  //   //     this.setState({
  //   //       items: success,
  //   //       flag: false
  //   //     })
  //   //   });
  //   // }

  //   this.setState({
  //     flag: true,
  //     // allproducts: [],
  //   });
  //   this.props.WishlistSort(
  //     this.props.wishlist,
      
  //     params,
  //     (success) => {

  //       if(params){

  //         if (success.length === 0) {
  //           this.setState({
  //             flag: false,
  //           });
  //           Toast.show('No more products found');
  //         } else {
         
  //             this.setState({
  //               flag: false,
  //               items: success,
  //             });
            
  //         }
  //       }
        
  //     },

  //     (err) => { },
  //   );

  // }

  // onSort = (data) => {
  //   this.setState({
  //     filter: data,
  //   });

  //   if (data.value == 'on_sale') {
  //     let param = {
  //       featured: true,
  //     };
  //     this.sortingItems(param);
  //   } else if (data.value == 'asc' || data.value == 'desc') {
  //     let param = {
  //       order: data.value,
  //     };

  //     this.sortingItems(param);
  //   } else if (data.value == 'date') {
  //     let param = {
  //       orderby: data.value,
  //     };

  //     this.sortingItems(param);
  //   }
  // };

  // onSelector = () => {
  //   let _options = [
  //     { label: 'On Sale', value: 'on_sale' },
  //     { label: 'A to Z', value: 'asc' },
  //     { label: 'Z to A', value: 'desc' },
  //     { label: 'Newest', value: 'date' },
  //   ];

  //   if (this.DropDownRef) {
  //     this.DropDownRef.show(
  //       'label',
  //       _options,
  //       'Sort by',
  //       (data) => this.onSort(data),
  //       null,
  //       null,
  //     );
  //   }
  // };

  // renderListHeader = () => {
  //   return <View style={styles.header}>

  //     <View style={styles.headerInner}>
  //       <Image
  //         source={icons.sort}
  //         style={styles.sort}
  //         resizeMode="contain"
  //       />
  //       <TextMedium style={styles.sortText}>Sort By</TextMedium>
  //     </View>
  //     {/* <FilterDropdown
  //     items={[
  //       {label: 'Popularity', value: 'Popularity'},
  //       {label: 'Price: Low to High', value: 'Price: Low to High'},
  //       {label: 'Price: High to Low', value: 'Price: High to Low'},
  //     ]}
  //   /> */}


  //     <TouchableOpacity
  //       style={{
  //         paddingHorizontal: 1 * vw,
  //         paddingVertical: 0.5 * vh,
  //         backgroundColor: '#ccc',
  //         borderRadius: 1 * vw,
  //       }}
  //       onPress={this.onSelector}>
  //       <TextSemi style={{ fontSize: vh * 2 }}>
  //         {this.state.filter?.label ?? 'Latest'}
  //       </TextSemi>
  //     </TouchableOpacity>
  //   </View>

  // }

  empty=()=>{

    return(
      <View style={{ alignItems: 'center',justifyContent:'center',flex:1 }}>

     { 
     
     this.state.flag==false? <TextRegular>

        No Products in wishlist
  </TextRegular>
  :null}
    </View>

    )
  }

  render() {
    return (

      <View style={{flex: 1}}>
 

        <FlatList
          data={this.state.items}
          style={styles.flatlist}
          renderItem={this._renderItem}
          numColumns={2}
          refreshControl={
            <RefreshControl
              refreshing={this.state.flag}
              tintColor={loaderColor}
              colors={[loaderColor]}
              onRefresh={this.loadProducts} />
          }
       
          ListEmptyComponent={this.empty}
          key={Math.random()}
          keyExtractor={(item, index) => String(item.id)}
        />

<DropDown ref={(_ref) => (this.DropDownRef = _ref)} />
      </View>

    );
  }
}


{/* <View style={{ alignItems: 'center', marginVertical: vh * 30 }}>

            <TextRegular>

              No Products in wishlist
        </TextRegular>
          </View> */}
const mapStates = state => {


  return {

    cart: state.cart.cartItems,
    wishlist: state.wishlist.WishListItems,

  };
}
export default connect(mapStates, { getProduct, WishlistSort })(Products);
