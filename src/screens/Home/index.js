import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { backgrounds, assets, samplePictures, icons } from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import TextRegular from '../../Components/TextRegular';
import TextMedium from '../../Components/TextMedium';
import { connect } from 'react-redux';
import BirthdayPopup from '../BirthdayPopup';
import {
  productsFetch,
  aboutUs,
  addPayment,
  Getprofile,
  SaveUser,
  showBirthday,
  removeKey,
} from '../../redux/actions';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import TouchableHOC from '../../Components/TouchableHOC';
import GradientBg from '../../Components/GradientBg';
import moment from 'moment';
import {
  sub_section_secondaryColor,
  loaderColor,
  default_section_Color,
  default_placeholderColor,
  gradientColorFirst_Background,
  gradientColorSecond_Background,
  gradientColorThird_Background,
  gradientColorFourth_Background,
  gradientColorFifth_Background,
  gradientColorSixth_Background,
  gradientColorSeventh_Background,
  gradientColorEighth_Background,
  gradientColorNinth_Background,
  gradientColorTenth_Background,
  gradientColorEleventh_Background,
  gradientColorTwelve_Background,
  gradientThirteenth_Background,
  gradientFourteenth_Background,
  gradientFifteenth_Background,
} from '../../../config.json';
GradientBg;

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flag: true,
      banner: [],
      currentdate: moment(new Date()).format('MM-DD-YYYY'),
      activeSlide: 1,
    };
  }
  getprofile = () => {
    this.props.SaveUser(this.props.users.userId, (pass) => {
      this.setState({
        flag: false,
      });

      if (pass) {
        console.log('cd', this.state.currentdate, this.props.birthdaykey);
        if (
          pass.dateofbirth == this.state.currentdate &&
          this.props.birthdaykey == 0
        ) {
          console.log('true');
          this.props.showBirthday();
          this.birthday.show();
        } else if (
          pass.dateofbirth !== this.state.currentdate &&
          this.props.birthdaykey == 1
        ) {
          this.props.removeKey();
        }
      }
      // if(pass!==null){

      //   this.setState({

      //     profile: pass,
      //     flag:false,
      //     firstname:pass.first_name,
      //     lastName: pass.last_name,
      //     phoneNumber:pass.billing.phone
      //   })
      // }
    });
  };

  loadProducts = () => {
    this.props.addPayment((succes) => {
      if (succes.length > 0) {
        this.props.aboutUs((pass) => {
          if (pass !== null) {
            this.setState({
              flag: false,
              banner: Object.values(pass.banner),
            });

            this.props.productsFetch((succes) => {
              // console.log('s',)
              if (succes.length > 0) {
                this.setState({
                  item: succes,
                });
              }
            });
          }
        });
      }
    });
  };

  clearProducts = () => {
    this.props.navigation.setParams({ categoryId: null });
  };
  componentDidMount() {
    // Keyboard.addListener("keyboardDidHide", this._keyboardDidHide());

    this.props.navigation.addListener('focus', () => {
      if (this.props.userID) {
        // this.setState({
        //   currentdate:moment(this.state.currentdate).format('MM-DD-YYYY')
        // },()=> this.getprofile())

        this.getprofile();
      }
    });

    if (this.props.about == null) {
      this.loadProducts();
    } else {
      this.setState({
        flag: false,
      });
    }

    this.props.navigation.addListener('blur', this.clearProducts);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus');
  }

  _renderItem = ({ item, index }) => {
    // console.log('item', item.button)
    return (
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.banner}
        resizeMode="cover"
        imageStyle={{ borderRadius: vw * 3 }}>
        {/* <PlayBold style={styles.bannerTxt}>
          She is Strength & Dignity Without Fear of the Future
        </PlayBold> */}
      </ImageBackground>
    );
  };
  render() {
    // console.log('ba', this.props.about);
    return (
      <View style={{ flex: 1, backgroundColor: default_section_Color }}>
        <BirthdayPopup ref={(r) => (this.birthday = r)} />
        <SafeAreaView style={{ backgroundColor: default_section_Color }}>
          <View style={styles.headerContainer}>
            <View style={styles.headerInner}>
              <TouchableHOC onPress={() => this.props.navigation.openDrawer()}>
                <Image
                  source={assets.menu}
                  style={styles.menu}
                  resizeMode="contain"
                />
              </TouchableHOC>
              <TouchableHOC
                style={styles.searchbar}
                onPress={() => this.props.navigation.navigate('Search')}>
                <TextInput
                  placeholder="Search Products"
                  placeholderTextColor={default_placeholderColor}
                  style={styles.input}
                />
                <Image
                  source={assets.search}
                  style={styles.search}
                  resizeMode="contain"
                />
              </TouchableHOC>
            </View>
          </View>
        </SafeAreaView>

        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.flag}
              tintColor={loaderColor}
              colors={[loaderColor]}
              onRefresh={this.loadProducts}
            />
          }>
          <GradientBg
            style={{ flex: 1 }}
            colors={[
              gradientColorFirst_Background,
              gradientColorFirst_Background,
              gradientColorFirst_Background,
              gradientColorSecond_Background,
              gradientColorSecond_Background,
              gradientColorThird_Background,
              gradientColorFourth_Background,
              gradientColorFifth_Background,
              gradientColorSixth_Background,
              gradientColorSeventh_Background,
              gradientColorEighth_Background,
              gradientColorNinth_Background,
              gradientColorTenth_Background,
              gradientColorEleventh_Background,
              gradientColorTwelve_Background,
              gradientThirteenth_Background,
              gradientFourteenth_Background,
              gradientFifteenth_Background,
            ]}>
            {this.props.about !== null ? (
              <View style={{ height: vh * 33 }}>
                <Carousel
                  ref={(c) => {
                    this._carousel = c;
                  }}
                  data={Object.values(this.props.about.banner)}
                  containerCustomStyle={{ marginTop: vh * 2 }}
                  renderItem={this._renderItem}
                  sliderWidth={vw * 100}
                  itemWidth={vw * 100}
                  inactiveSlideOpacity={1}
                  inactiveSlideScale={1}
                  onSnapToItem={(index) => this.setState({ activeSlide: index })}
                // initialScrollIndex={this.state.activeSlide}
                />
                <Pagination
                  dotsLength={Object.values(this.props.about.banner).length}
                  activeDotIndex={this.state.activeSlide}
                  containerStyle={{}}
                  dotStyle={styles.dot}
                  inactiveDotStyle={styles.inactiveDot}
                  dotContainerStyle={{ marginRight: vw * 0 }}
                  inactiveDotOpacity={1}
                  activeOpacity={1}
                  inactiveDotScale={1}
                />
              </View>
            ) : null}

            {this.props.products !== null ? (
              <View style={styles.categories}>
                <View style={styles.catHeader}>
                  <TextRegular style={styles.categoriesTxt}>
                    CATEGORIES
                  </TextRegular>
                  <TouchableHOC
                    onPress={() =>
                      this.props.navigation.navigate('Categories')
                    }>
                    <TextMedium style={styles.viewAll}>View All</TextMedium>
                  </TouchableHOC>
                </View>
                <View style={styles.catRow}>
                  <TouchableHOC
                    style={styles.cat1}
                    onPress={() =>
                      this.props.navigation.navigate('ProductsStack', {
                        screen: 'Products',
                        params: {
                          categoryId: this.props.products[0].id,
                          categoryName: this.props.products[0].name,
                        },
                      })
                    }>
                    <TextMedium style={styles.catTxt1}>
                      {this.props.products[0].name}
                    </TextMedium>
                    <Image
                      source={
                        this.props.products[0].image == null
                          ? samplePictures.placeholder
                          : { uri: this.props.products[0].image.src }
                      }
                      style={styles.carImg1}
                      resizeMode="contain"
                    />
                  </TouchableHOC>
                  {/* <TouchableHOC
                style={styles.catRow2}
                onPress={() => this.props.navigation.navigate('Products')}>
                <TextMedium style={styles.catTxt1}>SMOOTHIES</TextMedium>
                <Image
                  source={samplePictures.cat2}
                  style={styles.catImg2}
                  resizeMode="stretch"
                />
              </TouchableHOC> */}
                  <TouchableHOC
                    onPress={() =>
                      this.props.navigation.navigate('ProductsStack', {
                        screen: 'Products',
                        params: {
                          categoryId: this.props.products[1].id,
                          categoryName: this.props.products[1].name,
                        },
                      })
                    }>
                    <ImageBackground
                      source={
                        this.props.products[1].image == null
                          ? samplePictures.milkTeas
                          : { uri: this.props.products[1].image.src }
                      }
                      style={{
                        width: vw * 54,
                        height: vh * 17,
                        justifyContent: 'center',
                        paddingLeft: vw * 3,
                        backgroundColor: sub_section_secondaryColor,
                        borderRadius: vw * 2,
                      }}
                      imageStyle={{ width: vw * 54, height: vh * 17 }}
                      resizeMode="stretch">
                      <TextMedium style={styles.catTxt3}>
                        {this.props.products[1].name}
                      </TextMedium>
                    </ImageBackground>
                  </TouchableHOC>
                  {/* <TouchableHOC
                style={styles.catRow3}
                onPress={() => this.props.navigation.navigate('Products')}>
                <TextMedium style={styles.catTxt1}>SMOOTHIES</TextMedium>
                <Image
                  source={samplePictures.cat3}
                  style={{width: '100%', height: vh * 12}}
                  resizeMode="stretch"
                />
              </TouchableHOC> */}
                  <TouchableHOC
                    onPress={() =>
                      this.props.navigation.navigate('ProductsStack', {
                        screen: 'Products',
                        params: {
                          categoryId: this.props.products[2].id,
                          categoryName: this.props.products[2].name,
                        },
                      })
                    }>
                    <ImageBackground
                      source={
                        this.props.products[2].image == null
                          ? samplePictures.smoothies
                          : { uri: this.props.products[2].image.src }
                      }
                      style={{
                        width: vw * 54,
                        height: vh * 17,
                        alignItems: 'center',
                        paddingLeft: vw * 3,
                        backgroundColor: sub_section_secondaryColor,
                        borderRadius: vw * 2,
                      }}
                      resizeMode="stretch">
                      <TextMedium style={[styles.catTxt3, { marginTop: vh * 1 }]}>
                        {this.props.products[2].name}
                      </TextMedium>
                    </ImageBackground>
                  </TouchableHOC>
                  <TouchableHOC
                    onPress={() =>
                      this.props.navigation.navigate('ProductsStack', {
                        screen: 'Products',
                        params: {
                          categoryId: this.props.products[3].id,
                          categoryName: this.props.products[3].name,
                        },
                      })
                    }>
                    <ImageBackground
                      source={
                        this.props.products[3].image == null
                          ? samplePictures.shavedice
                          : { uri: this.props.products[3].image.src }
                      }
                      style={{
                        width: vw * 28,
                        height: vh * 17,
                        justifyContent: 'flex-end',
                        paddingLeft: vw * 3,
                        backgroundColor: sub_section_secondaryColor,
                        borderRadius: vw * 2,
                      }}
                      resizeMode="stretch">
                      <TextMedium
                        style={[styles.catTxt1, { marginBottom: vh * 1 }]}>
                        {this.props.products[3].name}
                      </TextMedium>
                    </ImageBackground>
                  </TouchableHOC>
                  {/* <TouchableHOC
                style={styles.cat1}
                onPress={() => this.props.navigation.navigate('Products')}>
                <Image
                  source={samplePictures.cat4}
                  style={styles.carImg1}
                  resizeMode="contain"
                />
                <TextMedium style={styles.catTxt1}>Shave Ice</TextMedium>
              </TouchableHOC> */}
                </View>
              </View>
            ) : null}
          </GradientBg>
        </ScrollView>
      </View>
    );
  }
}
const mapStates = (state) => {
  console.log('state', state);
  return {
    products: state.product.products,
    loading: state.category.loading,
    users: state.user.users,
    userID: state.user.userid,
    birthdaykey: state.user.key,
    coupons: state.coupons.listcoupons,
    about: state.product.aboutus,
  };
};

export default connect(mapStates, {
  productsFetch,
  aboutUs,
  addPayment,
  Getprofile,
  SaveUser,
  showBirthday,
  removeKey,
})(SignUp);
