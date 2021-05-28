import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import {backgrounds, assets, icons, samplePictures} from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import TextRegular from '../../Components/TextRegular';
import TextSemi from '../../Components/TextSemi';
import CircularBook from '../../Components/CircularBook';
import MainInput from '../../Components/MainInput';
import CircleBtn from '../../Components/CircleBtn';
import Alert from '../../Popups/Alert';
import {connect} from 'react-redux';
import {categoriesFetch} from '../../redux/actions';
import TextMedium from '../../Components/TextMedium';
import FilterDropdown from '../../Components/FilterDropdown';
import TouchableHOC from '../../Components/TouchableHOC';
import GradientBg from '../../Components/GradientBg';
import {
  default_font_Color,
  sub_section_primaryColor,
  loaderColor
} from '../../../config.json';

const data = [
  {name: 'Fruit Teas', image: samplePictures.fruitteas},
  {name: 'Milk Teas', image: samplePictures.milkTeas},
  {name: 'Smoothies', image: samplePictures.smoothies},
  {name: 'Shaved Ice', image: samplePictures.cat4},
  {name: 'Green Tea', image: samplePictures.greenTea},
  {name: 'Coffee', image: samplePictures.coffee},
];
class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flag: true,
    };
  }

  fetchCategories = () => {
    this.setState({
      flag: true,
    });
    this.props.categoriesFetch((success) => {
      this.setState({
        flag: false,
      });
    });
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', this.fetchCategories);
    //this.props.navigation.addListener('blur', this.clearProducts);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus');
    //this.props.navigation.removeListener('blur');
  }
  _renderItem = ({item, index}) => {
    return (
      <TouchableHOC
        onPress={() => {
          console.log('id', item.id);

          this.props.navigation.navigate('ProductsStack', {
            screen: 'Products',
            params: {
              categoryId: item.id,
              categoryName: item.name,
            },
          });
        }}>
        {/* <ImageBackground
          source={item.image !== null ? {uri:item.image?.src}
            : samplePictures.placeholder}
          style={{
            width: vw * 40.5,
            height: vh * 20,
            paddingLeft: vw * 3,
            backgroundColor: sub_section_primaryColor,
            borderRadius: vw * 2,
            marginLeft: vw * 2,
            marginTop: vh * 2,
            
          }}
         
          resizeMode={item.image !== null ? 'cover'
            : 'contain'}> */}

        <View
          style={{
            width: vw * 40,
            height: vh * 20,
            // paddingLeft: vw * 3,
            backgroundColor: sub_section_primaryColor,
            borderRadius: vw * 2,
            marginLeft: vw * 2,
            marginTop: vh * 2,
          }}>
          <View style={{marginTop: vh * 1, paddingLeft: vw * 3}}>
            <TextMedium style={{color: default_font_Color, fontSize: vh * 1.8}}>
              {item.name}
            </TextMedium>
            <TextRegular
              style={{color: default_font_Color, fontSize: vh * 1.5}}>
              {item.count} Items
            </TextRegular>
          </View>
          <View style={{alignItems: 'center', marginTop: vh}}>
            <Image
              source={
                item.image !== null
                  ? {uri: item.image?.src}
                  : samplePictures.placeholder
              }
              style={{width: 25 * vw, height: 24 * vw}}
              resizeMode={item.image !== null ? 'cover' : 'contain'}
            />
          </View>
        </View>
        {/* </ImageBackground> */}
      </TouchableHOC>
    );
  };
  render() {
    return (
      <GradientBg style={{flex: 1}}>
        <FlatList
          data={this.props.categories}
          contentContainerStyle={styles.flatlist}
          renderItem={this._renderItem}
          refreshControl={
            <RefreshControl
              refreshing={this.state.flag}
              tintColor={loaderColor}
              colors={[loaderColor]}
              onRefresh={this.fetchCategories}
              key={Math.random()}
            />
          }
          numColumns={2}
        />
      </GradientBg>
    );
  }
}

const mapStates = (state) => {
  return {
    categories: state.category.categories,
    loading: state.category.loading,
    page: state.category.page,
    check: state.category.itemsCheck,
    cart: state.cart.cartItems,
  };
};

export default connect(mapStates, {categoriesFetch})(Categories);

// <TouchableHOC
//   onPress={() => this.props.navigation.navigate('Products')}
//   style={{
//     height: vh * 20,
//     width: vw * 40.5,
//     backgroundColor: sub_section_primaryColor,
//     marginRight: vw * 3,
//     marginBottom: vh * 2,
//     borderRadius: vw * 1,
//   }}>
//   <View style={{marginLeft: vw * 3, marginTop: vh * 1}}>
//     <TextMedium style={{color: default_font_Color, fontSize: vh * 1.8}}>
//       {item.name}
//     </TextMedium>
//     <TextRegular style={{color: default_font_Color, fontSize: vh * 1.5}}>
//       23 Items
//     </TextRegular>
//   </View>

//   <Image
//     source={item.image}
//     style={{width: '100%', height: vh * 15}}
//     resizeMode="contain"
//   />
// </TouchableHOC>
