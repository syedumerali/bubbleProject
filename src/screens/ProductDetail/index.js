import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  FlatList,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {backgrounds, assets, icons, samplePictures} from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import TextRegular from '../../Components/TextRegular';
import FilterDropdown from '../../Components/FilterDropdown';
import TextSemi from '../../Components/TextSemi';
import CircularBook from '../../Components/CircularBook';
import {connect} from 'react-redux';
import {
  relatedProductsFetch,
  getVariations,
  getListVariations,
  AddtoCart,
  addReview,
  getReview,
} from '../../redux/actions';
import TextMedium from '../../Components/TextMedium';
import Toast from 'react-native-toast';
import Quantity from '../../Components/Quantity';
import DropDownPicker from 'react-native-dropdown-picker';
import ImageButton from '../../Components/ImageButton';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Button from '../../Components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ProductItem from '../../Components/ProductItem';
import HTML from 'react-native-render-html';
import StarRating from 'react-native-star-rating';
import Feedback from '../../Popups/Feedback';
import FilterItems from '../../Components/FilterItems';
import Alert from '../../Popups/Alert';
import DropDown from '../../Components/DropDown';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import GradientBg from '../../Components/GradientBg';
import {
  primaryColor,
  secondaryColor,
  loaderColor,
  default_text_color,

  gradientColorSecond_Background,
  gradientColorThird_Background,
  gradientColorFourth_Background,
  gradientColorFifth_Background,
  gradientColorSixth_Background,
} from '../../../config.json';
const features = [
  {text: 'Fashionable For any wardrobe'},
  {text: 'It has two-sided pockets'},
  {text: 'Suitable for lounging work or on the go'},
];
var price = '';
let id = '';
let p1;
let toppings = null;
class ProductDetail extends React.Component {
  state = {activeSlide: 1};

  constructor(props) {
    super(props);

    this.state = {
      renderprice: '',
      item: null,
      relatedItems: null,
      initial_quantity: 1,
      variation_id: '',
      addonDetails: null,
      productVariation: null,
      selectVariation: {},
      flag: false,
      // p1: '',
      addons: null,
      variationFlag: false,
      variationProduct: null,
      newrating: '',
      variationList: [],
    };
  }

  checkVariationsLength = () => {
    console.log('related', this.state.item);
    this.props.relatedProductsFetch(this.state.item.related_ids, (success) => {
      if (success.length > 0) {
        this.setState({
          relatedItems: success,
          flag: false,
        });
      }
    });

    if (this.state.item.variations.length > 0) {
      this.props.getListVariations(this.state.item.id, (success) => {
        this.setState({
          productVariation: success,
          flag: false,
        });
      });
    }
  };

  getdetails = () => {
    let id = this.props.route.params.itemid;

    this.props.getVariations(id, (success) => {
      let metadata = success.meta_data;
      let Productaddonindex = metadata.findIndex(
        (x) => x.key == '_product_addons',
      );
      toppings = metadata[Productaddonindex];
      console.log('top', toppings);
      this.setState(
        {
          item: success,
        },
        this.checkVariationsLength,
      );
    });
  };

  clearProducts = () => {
    this.setState({
      item: null,
      flag: true,
    });
  };

  validate = (text) => {
    console.log(text);
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };
  componentDidMount() {
    this.props.navigation.addListener('focus', this.getdetails);
    this.props.navigation.addListener('blur', this.clearProducts);
  }

  checkVariations = () => {
    // var flag=false;

    // for(let i=0;i<this.state.productVariation.length;i++){

    //   var size=Object.keys(this.state.selectVariation).length;
    //    if(this.state.productVariation[i].attributes.length==size)
    //    {

    //     for(let j=0;j<this.state.productVariation[i].attributes.length;j++){

    //            flag=false;
    //            var key=this.state.productVariation[i].attributes[j];
    //            var keyname=key.name;
    //            if(this.state.selectVariation.hasOwnProperty(keyname))
    //            {

    //               console.log('keyname',this.state.selectVariation[keyname])
    //              if(this.state.selectVariation[keyname]==key.option){

    //               flag=true;
    //                price=this.state.productVariation[i].price;
    //                 var id=this.state.productVariation[i].id;
    //                console.log('length',price);
    //                this.setState({
    //                  renderprice:price,
    //                  variation_id:id
    //                })
    //               break;
    //              }
    //            }
    //     }
    //    }

    if (this.state.productVariation && this.state.productVariation.length > 0) {
      this.state.productVariation.map((val, ind) => {
        let check = false;

        val.attributes.map((value, index) => {
          if (value.option === this.state.variationList[value.name]) {
            check = true;
          }

          // if (value.option !== this.state.variationList[value.name]) {
          //     check = false
          //     this.setState({ variationFlag: false })

          //     return;

          // }
          if (check === true && val.attributes.length == index + 1) {
            this.setState({
              variationFlag: true,
              variationProduct: val,
            });
          }
        });
      });
    }
  };
  // console.log('flag',flag);

  _renderItem = ({item, index}) => {
    console.log('item', item);
    return (
      <GradientBg
        colors={[
          gradientColorSecond_Background,
          gradientColorThird_Background,
          gradientColorFourth_Background,
          gradientColorFifth_Background,
          gradientColorSixth_Background,
        ]}
        style={{
          width: '100%',
          height: vh * 25,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: item.src}}
          style={{width: '40%', height: vh * 20}}
          resizeMode="cover"
        />
      </GradientBg>
    );
  };

  handleVariations = (option, name) => {
    requestAnimationFrame(() => {
      let key_list = Object.keys(this.state.variationList);

      if (key_list) {
        if (option === this.state.variationList[name]) {
          delete this.state.variationList[name];
          this.setState(
            (p) => ({
              variationList: {
                ...p.variationList,
              },
              check: true,
            }),
            this.checkVariations,
          );
          // setTimeout(() => this.checkVariations(), 400)
        } else {
          this.setState(
            (p) => ({
              variationList: {
                ...p.variationList,
                [name]: option,
              },
              check: false,
            }),
            this.checkVariations,
          );
        }
      } else {
        this.setState({
          variationList: [...this.state.variationList, {[name]: option}],
          check: false,
        });
      }
    });
  };

  _onVariationDropDown = (_options, name) => {
    if (this.DropDownRef) {
      this.DropDownRef.show(
        'title',
        _options,
        'Select a variation',
        (data) => this.handleVariations(data.title, name),
        null,
        null,
      );
    }
  };

  renderVariations = () => {
    if (this.state.item && this.state.item.attributes) {
      return this.state.item.attributes.map((value, index) => {
        if (value.variation) {
          let _options;

          if (value.options) {
            _options = value.options.map((_opt, index) => {
              return {
                title: _opt,
                index,
              };
            });
          }

          return (
            <View style={[styles.row, {elevation: 10, marginTop: vh * 3}]}>
              {value.options.length === 0 ? null : (
                <>
                  <TextSemi style={{fontSize: vh * 2}}>{value.name}</TextSemi>
                  <TouchableOpacity
                    onPress={() =>
                      this._onVariationDropDown(_options, value.name)
                    }>
                    <TextRegular style={{fontSize: vh * 2}}>
                      {this.state.variationList[value.name] ??
                        'Select variation'}
                    </TextRegular>
                  </TouchableOpacity>
                </>
              )}

              {/* <FilterDropdown placeholder="Select" items={_options} /> */}
            </View>
          );
        }
      });
    }
  };
  _renderFilterItem = ({item, index}) => {
    console.log('state', this.state.opencat);
    return (
      <FilterItems
        name={item.name}
        options={item.options[0]?.price ?? '' ? 0 : item.options[0]?.price}
        remove={(name, options) => {
          let index = this.state.addonDetails.findIndex((x) => x.name == name);
          var temp = this.state.addonDetails;

          temp.splice(index, 1);

          this.setState(
            {
              addonDetails: temp,
            },
            () => console.log('st', this.state.addonDetails),
          );
        }}
        onClick={(name, options) => {
          this.setState({
            addonDetails: [
              {
                ...this.state.addonDetails,
                add_on_name: name,
                add_on_price: options,
              },
            ],
          });
        }}
      />
    );
  };
  renderprice = (price) => {
    let addprice = this.state.addonDetails;

    for (let i = 0; i < addprice.length; i++) {
      console.log('detparice', addprice);
      let p = addprice[i].add_on_price;
      // this.setState({
      //   p1: parseInt(price)
      // }, () => {
      //   this.setState({
      //     p1: this.state.p1 + parseInt(p)
      //   })
      // })
      p1 = parseFloat(price);
      if (p == '') {
        p1 += 0;
      } else {
        p1 += parseFloat(p);
      }

      // price=data.price
    }

    console.log('price', p1);
  };

  render() {
    let data = null;
    let id = '';

    console.log('det', this.state.variationList);
    if (this.state.variationFlag) {
      data = this.state.variationProduct;
      id = this.state.variationProduct.id;
    } else {
      data = this.state.item;
      let priceprod;
    }
    if (this.state.addonDetails) {
      this.renderprice(data?.price);
    }
    console.log('initial', this.state.variationProduct);

    return (
      <View style={{flex: 1}}>
        {this.state.item !== null ? (
          <View style={{flex: 1}}>
            <Feedback
              ref={(e) => (this.feedback = e)}
              onSuccess={(review, name, email, star) => {
                //this.success.show()
                console.log('s', star);

                this.props.addReview(
                  this.state.item.id,
                  review,
                  name,
                  email,
                  star,
                  (pass) => {
                    if (pass.length !== null) {
                      this.review.show();
                      id = pass.id;
                    }
                  },
                );
              }}
            />
            <Alert
              ref={(e) => (this.success = e)}
              text="Product Added to Cart"
              onSuccess={() => {
                //this.props.navigation.goBack();
              }}
            />

            <Alert
              ref={(e) => (this.review = e)}
              text="Your review was recorded"
              onSuccess={() => {
                //this.props.navigation.goBack();
                let id = this.props.route.params.itemid;

                this.getdetails();
              }}
            />
            <Carousel
              ref={(c) => {
                this._carousel = c;
              }}
              data={this.state.item.images}
              containerCustomStyle={{}}
              renderItem={this._renderItem}
              sliderWidth={vw * 100}
              itemWidth={vw * 100}
              inactiveSlideOpacity={1}
              inactiveSlideScale={1}
              onSnapToItem={(index) => this.setState({activeSlide: index})}
              style={{}}
            />
            <TouchableHOC
              onPress={() => this.props.navigation.goBack()}
              style={{position: 'absolute', top: vh * 4}}>
              <Image
                source={icons.arrowHeader}
                style={{width: vw * 6.5, height: vh * 6, marginLeft: 5.5 * vw}}
                resizeMode="contain"
              />
            </TouchableHOC>
            <View style={styles.card}>
              <ScrollView
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.flag}
                    tintColor={loaderColor}
                    colors={[loaderColor]}
                    onRefresh={this.getdetails}
                  />
                }>
                <Pagination
                  dotsLength={this.state.item.images.length}
                  activeDotIndex={this.state.activeSlide}
                  containerStyle={{}}
                  dotStyle={styles.dot}
                  inactiveDotStyle={styles.inactiveDot}
                  dotContainerStyle={{marginHorizontal: vw * 0.5}}
                  inactiveDotOpacity={1}
                  inactiveDotScale={1}
                />
                <TextMedium style={styles.pname}>
                  {this.state.item.name}
                </TextMedium>
                <TextRegular style={styles.catName}>
                  {this.state.item.categories[0].name}
                </TextRegular>
                {this.state.item.short_description == '' ? (
                  <View style={styles.featureCont}>
                    {features.map((item, index) => (
                      <View style={styles.featureRow}>
                        <View style={styles.listpoint} />
                        <TextRegular style={styles.featureTxt}>
                          {item.text}
                        </TextRegular>
                      </View>
                    ))}
                  </View>
                ) : (
                  <View style={styles.featureCont}>
                    <View style={styles.featureRow}>
                      <HTML
                        html={this.state.item.short_description}
                        imagesMaxWidth={vw * 84}
                        baseFontStyle={{fontFamily: 'Barlow-Regular'}}
                        containerStyle={{
                          justifyContent: 'center',
                          width: vw * 84,
                        }}
                      />
                    </View>
                  </View>
                )}
                <View style={styles.row}>
                  {this.state.addonDetails &&
                  this.state.addonDetails.length > 0 ? (
                    <CircularBook style={styles.price}>
                      ${parseFloat(p1).toFixed(2)}
                    </CircularBook>
                  ) : (
                    <CircularBook style={styles.price}>
                      ${data.price}
                    </CircularBook>
                  )}

                  <Quantity
                    ref={(ref) => (this.quantity = ref)}
                    id={this.state.item.id}
                  />
                </View>

                {this.renderVariations()}

                {toppings !== null && (
                  <FlatList
                    data={toppings.value}
                    keyExtractor={(item, index) => String(index)}
                    // contentContainerStyle={styles.flatlist}
                    renderItem={this._renderFilterItem}
                  />
                )}
                <ImageButton
                  title="Add To Cart"
                  onPress={() => {
                    if (this.quantity == undefined) {
                      this.setState({
                        initial_quantity: 1,
                      });
                    }

                    if (data.price > 0) {
                      if (this.state.productVariation.length > 0) {
                        if (this.state.variationList.length == 0) {
                          Toast.show('Please select variations');
                        } else {
                          this.props.AddtoCart(
                            this.state.item.id,
                            this.state.item.name,
                            data.price,
                            this.quantity.state.initial_quantity,
                            this.state.item.images[0].src,
                            id,
                            this.state.addonDetails,
                          );
                          this.success.show();
                        }
                      } else {
                        this.props.AddtoCart(
                          this.state.item.id,
                          this.state.item.name,
                          data.price,
                          this.quantity.state.initial_quantity,
                          this.state.item.images[0].src,
                          id,
                          this.state.addonDetails,
                        );
                      }
                    } else {
                      Toast.show('Cannnot be added to cart');
                    }
                  }}
                  btnContainer={styles.btn}
                />

                <TextMedium
                  style={{
                    color: default_text_color,
                    fontSize: vh * 2.4,
                    marginTop: vh * 3,
                    marginBottom: vh * 1.5,
                  }}>
                  Description
                </TextMedium>
                {this.state.item.description !== '' ? (
                  <View style={{alignItems: 'center'}}>
                    <HTML
                      html={this.state.item.description}
                      imagesMaxWidth={vw * 84}
                      baseFontStyle={{fontFamily: 'Barlow-Regular'}}
                      containerStyle={{
                        justifyContent: 'center',
                        width: vw * 84,
                      }}
                    />
                  </View>
                ) : (
                  <TextRegular
                    style={{
                      color: default_text_color,
                      fontSize: vh * 2,
                      marginBottom: vh * 4,
                    }}>
                    No description found
                  </TextRegular>
                )}
                <View style={styles.row}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.item.rating_count}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                    fullStar={icons.star}
                    emptyStar={icons.emptyStar}
                    starSize={vh * 2.2}
                    buttonStyle={{marginRight: vw * 1.8}}
                  />
                  <Button
                    onPress={() => this.feedback.show()}
                    title="Add a Review"
                    btnContainer={{
                      width: '40%',
                      height: vh * 5.5,
                      backgroundColor: secondaryColor,
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: vh * 2,
                  }}>
                  <TextMedium
                    style={{
                      color: default_text_color,
                      fontSize: vh * 2.4,
                      marginTop: vh * 3,
                    }}>
                    RELATED PRODUCTS
                  </TextMedium>
                  <Button
                    title="View More"
                    onPress={() =>
                      this.props.navigation.navigate('ProductsStack', {
                        screen: 'Products',
                        params: {
                          categoryName: 'PRODUCTS',
                          categoryId: null,
                        },
                      })
                    }
                    btnContainer={{
                      backgroundColor: primaryColor,
                      width: '30%',
                      height: vh * 3.5,
                      alignSelf: 'flex-end',
                    }}
                  />
                </View>

                {this.state.relatedItems !== null ? (
                  <View>
                    <FlatList
                      data={this.state.relatedItems}
                      horizontal={true}
                      style={{flex: 1, width: 100 * vw}}
                      contentContainerStyle={{paddingBottom: vh * 2}}
                      showsHorizontalScrollIndicator={false}
                      refreshing={true}
                      renderItem={({item, index}) => {
                        return (
                          <ProductItem
                            item={item}
                            onPress={() =>
                              this.props.navigation.push('ProductDetail', {
                                itemid: item.id,
                              })
                            }
                            navigation={this.props.navigation}
                          />
                        );
                      }}
                    />
                  </View>
                ) : null}
              </ScrollView>
              <DropDown ref={(_ref) => (this.DropDownRef = _ref)} />
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
const mapStates = (state) => {
  console.log('state', state);
  return {
    RelatedItems: state.product.relatedItems,
    loading: state.category.loading,
  };
};
export default connect(mapStates, {
  relatedProductsFetch,
  getVariations,
  getListVariations,
  AddtoCart,
  addReview,
  getReview,
})(ProductDetail);
