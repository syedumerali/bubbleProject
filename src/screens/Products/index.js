import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {icons, samplePictures} from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import Toast from 'react-native-toast';
import vw from '../../Units/vw';
import TextMedium from '../../Components/TextMedium';
import ProductItem from '../../Components/ProductItem';
import Button from '../../Components/Button';
import GradientBg from '../../Components/GradientBg';
import {connect} from 'react-redux';
import {
  itemsFetch,
  Price,
  AllproductsFetch,
  ViewmoreItems,
} from '../../redux/actions';
import DropDown from '../../Components/DropDown';
import TextSemi from '../../Components/TextSemi';
import {
  primaryColor,
  loaderColor
} from '../../../config.json';

let id = '';

class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      page: 1,
      flag: true,
      filter: null,
    };
  }

  clearProducts = () => {
    console.log('ppaa',this.props);
    if(!this.props.route.params?.categoryId){
      this.props.navigation.setParams({ categoryId: null})
    }
   
    this.setState({
      items: [],
      page: 1,
      flag: true,
      filter: null,
    });
  };
  loadProducts = () => {
    console.log('flag', this.props);
    this.setState({
      flag: true,
    });

    if (this.props.route.params?.categoryId) {
      id = this.props.route.params.categoryId;

      this.props.itemsFetch(id, 1, (passSuccess) => {
        this.setState({
          items: passSuccess,
          flag: false,
        });
      });
    } else {
      this.props.AllproductsFetch(1, (success) => {
        this.setState({
          items: success,
          flag: false,
        });
      });
    }
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', this.loadProducts);
    this.props.navigation.addListener('blur', this.clearProducts);
  }

  

  checkitems = () => {

   
    if (this.props.route.params) {
      if(this.state.items.length>=10){
             
        this.props.ViewmoreItems(id, this.state.page, (passucces) => {
          if (passucces.length == 0) {
            Toast.show('No more products');
            this.setState({
              flag: false,
            });
          } else {
            this.setState({
              items: [...this.state.items, ...passucces],
              flag: false,
            });
          }
        });

      }
      else{

        Toast.show('No products found');
      }
     
    } else {
 
       if(this.state.items.length>=10){

        this.props.ViewmoreItems('', this.state.page, (passucces) => {
          if (passucces.length == 0) {
            Toast.show('No more products');
            this.setState({
              flag: false,
            });
          } else {
            this.setState({
              items: [...this.state.items, ...passucces],
              flag: false,
            });
          }
        });
       }

       else{

        Toast.show('No products found');
      }
     
     
    }
  };
  _renderItem = ({item, index}) => {
    return (
      <ProductItem
        item={item}
        key={item.id}
        onPress={() =>
          this.props.navigation.navigate('ProductDetail', {
            itemid: item.id,
          })
        }
      />
    );
  };
  footer = () => {
    
    if(this.state.items.length>0)
    {
    return (
      
      <Button
        title="View More"
        onPress={() => {

          if(this.state.items.length>=10){
               
            this.setState(
              {
                page: this.state.page + 1,
                flag: true,
              },
              this.checkitems,
            );

          }

          else{

            Toast.show('No products found')
          }

        
        }}
        btnContainer={{
          backgroundColor: primaryColor,
          width: '30%',
          height: vh * 4,
          alignSelf: 'center',
          marginBottom: vh * 2,
        }}
      />
    );


      }

      else{
        return(
             
          <View style={{alignItems:'center'}}>

          <TextMedium style={styles.EmptyProducts}>No Products Found</TextMedium>

        </View>
        )
        
       
      }
  };

  sortingItems = (params = null) => {
    // if (itemlabel == 'Price Low to High' || itemlabel == 'Price High to Low') {
    //   this.setState({

    //     flag: true
    //   })
    //   this.props.Price(id, 1, sort, 'price', success => {

    //     this.setState({
    //       items: success,
    //       flag: false
    //     })
    //   });

    // }

    // else if (itemlabel == 'Popularity') {

    //   this.setState({

    //     flag: true
    //   })
    //   this.props.Popularity(id, 1, 'popularity', success => {

    //     this.setState({
    //       items: success,
    //       flag: false
    //     })
    //   });
    // }

    this.setState({
      flag: true,
      // allproducts: [],
    });
    this.props.Price(
      this.props.route.params?.categoryId ?? null,
       this.state.page,
      params,
      (success) => {
        if (success.length === 0) {

          this.setState({
            flag: false,
            items: success,
          });
          Toast.show('No more products found');
        } else {
          if (this.state.page == 1) {
            this.setState({
              flag: false,
              items: success,
            });
          }

          else {
            this.setState({
              flag: false,
              items: [...this.state.items, ...success],
            });
          }
          this.setState({
            flag: false,
            items: success,
          });
        }
      },

      (err) => {},
    );
  };

  onSort = (data) => {
    this.setState({
      filter: data,
    });

    if (data.value == 'on_sale') {
      let param = {
        featured: true,
      };
      this.sortingItems(param);
    } else if (data.value == 'asc' || data.value == 'desc') {
      let param = {
        order: data.value,
      };

      this.sortingItems(param);
    } else if (data.value == 'date') {
      let param = {
        orderby: data.value,
      };

      this.sortingItems(param);
    }
  };

  onSelector = () => {
    let _options = [
      {label: 'On Sale', value: 'on_sale'},
      {label: 'A to Z', value: 'asc'},
      {label: 'Z to A', value: 'desc'},
      {label: 'Newest', value: 'date'},
    ];

    if (this.DropDownRef) {
      this.DropDownRef.show(
        'label',
        _options,
        'Sort by',
        (data) => this.onSort(data),
        null,
        null,
      );
    }
  };

  render() {
    console.log('fla', this.props.route.params);
    return (
      <GradientBg style={{flex: 1}}>
        <DropDown ref={(_ref) => (this.DropDownRef = _ref)} />
        <View style={styles.header}>
          <View style={styles.headerInner}>
            <Image
              source={icons.sort}
              style={styles.sort}
              resizeMode="contain"
            />
            <TextMedium style={styles.sortText}>Sort By</TextMedium>
          </View>

          <TouchableOpacity
            style={{
              paddingHorizontal: 1 * vw,
              paddingVertical: 0.5 * vh,
              backgroundColor: '#ccc',
              borderRadius: 1 * vw,
            }}
            onPress={this.onSelector}>
            <TextSemi style={{fontSize: vh * 2}}>
              {this.state.filter?.label ?? 'Latest'}
            </TextSemi>
          </TouchableOpacity>
          {/* <FilterDropdown

            onchange={(sort, itemlabel) => {

              this.sortingItems(sort, itemlabel)
            }}

            items={[
              { label: 'Popularity', value: 'popularity' },
              { label: 'Price Low to High', value: 'asc' },
              { label: 'Price High to Low', value: 'desc' },
            ]}


          /> */}
        </View>

        <FlatList
          data={this.state.items}
          style={[styles.flatlist]}
          renderItem={this._renderItem}
          numColumns={2}
          refreshControl={
            <RefreshControl
              refreshing={this.state.flag}
              onRefresh={this.loadProducts}
              tintColor={loaderColor}
              colors={[loaderColor]}
            />
          }
          ListFooterComponent={this.state.flag == false ? this.footer : null}
          key={Math.random()}
          keyExtractor={(item, index) => String(index)}
        />
      </GradientBg>
    );
  }
}

const mapStates = (state) => {
  console.log('state', state);
  return {
    item: state.product.items,
    loading: state.category.loading,
    page: state.product.page,
    title: state.product.itemsByTitle,
    cart: state.cart.cartItems,
  };
};

export default connect(mapStates, {
  itemsFetch,
  Price,
  AllproductsFetch,
  ViewmoreItems,
})(Products);
