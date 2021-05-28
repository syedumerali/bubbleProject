import React from 'react';
import {View, ImageBackground, Image, Text,RefreshControl} from 'react-native';
import {backgrounds, assets} from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import TextRegular from '../../Components/TextRegular';
import PlayBold from '../../Components/PlayBold';
import MainInput from '../../Components/MainInput';
import CircleBtn from '../../Components/CircleBtn';
import Alert from '../../Popups/Alert';
import TextMedium from '../../Components/TextMedium';
import GradientBg from '../../Components/GradientBg';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { aboutUs } from '../../redux/actions';
import { ScrollView } from 'react-native-gesture-handler';
import {
  loaderColor,
  default_section_Color
} from '../../../config.json';

class AboutUs extends React.Component {
 

  constructor(props) {

    super(props);

    this.state = {
      flag :true,
      banner: [],
      activeSlide: 0,
      content: null
    }

  }
  
  componentDidMount() {
    // SplashScreen.hide();
    // Keyboard.addListener("keyboardDidHide", this._keyboardDidHide());
    this.loadProducts()
   
    
  }
  loadProducts=()=> {
         
    this.state = {
      flag :true,
      
    }

        this.props.aboutUs(success=>{

          if(success!==null){
           
            
            this.setState({

              flag:false,
              banner:[success.pages.about_us],
              content:success.pages.about_us
             })

          }
        })   
      
      
 
  }

 
  _renderItem = ({item, index}) => {
    return (
      <ImageBackground
        source={{uri:item.image}}
        style={styles.banner}
        resizeMode="cover"
        imageStyle={{borderRadius: vw * 3}}>
        {/* <PlayBold style={styles.bannerTxt}>
          She is Strength & Dignity Without Fear of the Future
        </PlayBold> */}
      </ImageBackground>
    );
  };
  render() {

    console.log('ba', this.state);
    return (

      <ScrollView   contentContainerStyle={{flex:1, backgroundColor: default_section_Color}}
      refreshControl={
             <RefreshControl refreshing={this.state.flag} 
             tintColor={loaderColor}
            style={{backgroundColor: '#ffff'}}
               colors={[loaderColor]}
                            onRefresh={this.loadProducts}/>
          }>
      <GradientBg
        style={{flex: 1, paddingHorizontal: vw * 5}}
        colors={[
          '#FFFFFF',
          '#FFFFFF',
          '#82FBFF',
          '#99FBF9',
          '#99FBF9',
          '#D0FBED',
          '#F2FBE5',
          '#FFFCE3',
          '#FDFBE0',
          '#F9F9D7',
          '#F3F6C8',
          '#F3F6C8',
          '#F3F6C8',
          '#DEEB98',
          '#CFE377',
          // '#BDDA4F',
          '#A9D023',
        ]}>
        <View
          style={{
            height: vh * 33,
            alignItems: 'center',
          }}>


          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            data={this.state.banner}
            containerCustomStyle={{}}
            renderItem={this._renderItem}
            sliderWidth={vw * 100}
            itemWidth={vw * 100}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            onSnapToItem={(index) => this.setState({activeSlide: index})}
            // initialScrollIndex={this.state.activeSlide}
          />
          <Pagination
            dotsLength={this.state.banner.length}
            activeDotIndex={this.state.activeSlide}
            containerStyle={{}}
            dotStyle={styles.dot}
            inactiveDotStyle={styles.inactiveDot}
            dotContainerStyle={{marginRight: vw * 0}}
            inactiveDotOpacity={1}
            activeOpacity={1}
            inactiveDotScale={1}
          />
        </View>
        
        {
     
     
      this.state.content!==null?<View>
        
        
        <TextMedium style={styles.heading}>{this.state.content.title}</TextMedium>
        <TextRegular style={styles.p1}>
         {this.state.content.content}
        </TextRegular>
        {/* <TextRegular style={styles.p2}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been{' '}
        </TextRegular> */}
  
        </View>

:null  }
      </GradientBg>
      </ScrollView>
    );
  }
}

const mapStates = state => {

  console.log('state', state)
  return {

    products: state.product.products,
    loading: state.category.loading,
    coupons: state.coupons.listcoupons,
    about: state.product.aboutus

  };
}
export default connect(mapStates, { aboutUs })(AboutUs);
