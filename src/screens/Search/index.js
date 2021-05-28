import React from 'react'
import { View, TouchableOpacity, Image, Text, TextInput,FlatList,RefreshControl, Keyboard } from 'react-native'
import { backgrounds, assets } from '../../assets/images'
import styles from './styles'
import vw from '../../Units/vw'
import ProductItem from '../../Components/ProductItem';
import { connect } from 'react-redux';
import { searchProducts } from '../../redux/actions'; 
import Toast from 'react-native-toast';
import {
    loaderColor
} from '../../../config.json';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            search: '',
            array: null,
            flag:false
        }
    }
    message=()=>{

        Toast.show('no search found')
    }
    componentDidMount() {
       
       
       
      }

      _keyboardDidHide = () => {
        if (this.inputRef !== null) {
    
          this.inputRef.blur()
    
        }
    
      };
    
    renderProducts = () => {

        Keyboard.addListener("keyboardDidHide", this._keyboardDidHide());
        console.log('here')
       
       if(this.state.search!==''){

        this.setState({
            flag:true
       })
        this.props.searchProducts(this.state.search, success => {
               
            if(success.length>0){
            
            this.setState({
                array: success,
                flag:false
            })
        }
        else{
            this.setState({
                flag:false,
                search:''
            },this.message)
        }
        })

       }

       else{
              
        Toast.show('Please enter something')

       }
       
    }

    _renderItem = ({ item, index }) => {
        return (
            <ProductItem
                item={item}

                onPress={() => this.props.navigation.navigate('ProductDetail', {


                    itemid: item.id,

                })}
            />
        );
    };

    render() {
        return (
            <View style={{ flex: 1, paddingHorizontal: vw * 5 }}>
                <View style={styles.searchbar}>
                    <TextInput placeholder="Search Products" 
                    returnKeyType={"search"}
                    placeholderTextColor="#CCCCCC"
                    onSubmitEditing={()=> {
                          this.renderProducts()
                    }}
                    style={styles.input}
                    ref={_ref => {
                        this.inputRef = _ref;
        
                      }}
                               value={this.state.search}
                                onChangeText={(newsearch)=> {
                                         this.setState({
                                              search:newsearch
                                         })
                                }} />

                    <TouchableOpacity onPress={() => {
                        //this.inputRef.focus();
                        this.renderProducts()
                        // BackHandler.addEventListener("hardwareBackPress", inputRef.blur());

                    }}>

                        <Image source={assets.search} style={styles.search} resizeMode="contain" />
                    </TouchableOpacity>

                </View>

                {

                    this.state.array !== null > 0 ? <FlatList
                        data={this.state.array}
                        style={[styles.flatlist]}
                        
                        renderItem={this._renderItem}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={this.state.flag}
                               onRefresh={this.renderProducts}
                              tintColor={loaderColor}
               colors={[loaderColor]}
                             />
                          }
                    />
                        : null}
            </View>
        )
    }
}
const mapStates = state => {

    console.log('state', state)
    return {

        products: state.product.products,
        loading: state.category.loading,
        coupons: state.coupons.listcoupons

    };
}

export default connect(mapStates, { searchProducts })(Search);