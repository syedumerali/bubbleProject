import React, { Component } from 'react';
import {
  View,
  Modal,

  Image,
  ImageBackground,
  Platform
} from 'react-native';
import styles from './styles';
import { icons, assets, backgrounds, samplePictures } from '../../assets/images';
import vh from '../../Units/vh'
import vw from '../../Units/vw'
import Button from '../../Components/Button';
import TouchableHOC from '../../Components/TouchableHOC';
import { connect } from 'react-redux';
import TextRegular from '../../Components/TextRegular';
import TextSemi from '../../Components/TextSemi';
import Toast from 'react-native-toast';
import MainInput from '../../Components/MainInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StarRating from 'react-native-star-rating';


class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: this.props.value ? true : false,
      text: '',
      review:'',
      name:this.props.userId==null ? '' 
                                   :this.props.users.firstname,
      email:this.props.userId==null ? '' 
      :this.props.users.email,
      starCount: 0,
      visible: false,
      imagesShown: false
    };
  }

  show = (data) => {
    this.setState((p) => {
      return {
        ...p,
        visible: true,
      };
    });
  };
  hide = () => {
    // console.log("hide");

    this.setState((p) => {
      return {
        ...p,
        visible: false,
      };
    });
  };
  onCross = () => {
    this.hide()
    if (this.props.onCross) {
      this.props.onCross()
    }
  }

  validate = (text) => {
    console.log(text);
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(text) === false) {
     
      
      return false;
    }
    else {
      return true
     
    }
  }
  onSuccess = (review,name,email,star) => {
    this.hide()
    this.props.onSuccess(review,name,email,star);
    
  }
  render() {
    return (
      <Modal
        key={'cbt'}
        visible={this.state.visible}
        transparent={true}
        animationType="fade">
        <View style={styles.modalTouchable}>
          <View style={styles.imageBg} >
            <TouchableHOC style={styles.crossContainer} onPress={this.onCross}>
              <Image source={icons.cross} style={styles.cross} resizeMode="contain" />
            </TouchableHOC>
            <KeyboardAwareScrollView 
              enableOnAndroid={true}
            //  extraHeight={20}
            bounces={false}
             showsVerticalScrollIndicator={false}
              extraScrollHeight={Platform.OS=='ios' ? -5*vh 
                                    : Platform.OS=='android' -25*vh}
              >
            <View style={styles.container}>

          
             <TextSemi style={styles.feedback}>Feedback</TextSemi>
             <TextRegular style={styles.description}>Rate This Product</TextRegular>
             <StarRating
        
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.setState({
          starCount: rating
        })} 
        fullStar={icons.star}
        emptyStar={icons.emptyStar}
        starSize={vh*2.2}
        buttonStyle={{marginRight:vw*1.7}}
        
      />
             <TextRegular style={styles.Message}>Share your experience with this Product</TextRegular>
             <MainInput   multiline={true} style={styles.txtArea}
                       value={this.state.review}
                       fieldStyle={{}}
                       onChangeText={(newreview) => this.setState({

                        review: newreview
                      })}
                      
                      />
             <MainInput style={styles.field} label="Name"
                           value={this.state.name}
                           onChangeText={(newname) => this.setState({

                            name: newname
                          })
                        }
                          
                          />
             <MainInput style={styles.field} label="Email"
             keyboardType="email-address"
             onChangeText={(newemail) => this.setState({

              email: newemail
            })}
                        value={this.state.email}
                         
                         />
             <Button title="Publish" 
             onPress={ () => 
              { 

                if(this.state.name=='')
                {
                  Toast.show('name required')

                }
                else if(this.state.email==''){
                  Toast.show('Email required')

                }

                else if(this.state.review==''){
                  Toast.show('Review required')

                }
                else{
                  if(this.validate(this.state.email)){

                    this.onSuccess(this.state.review,this.state.name,this.state.email,this.state.starCount)
                  }
                  else{
  
                      Toast.show('Invalid Email')
                  }

                }
                     
              }
              } 
             btnContainer={styles.btn}/>
            
            </View>
            </KeyboardAwareScrollView>
          </View>
         
        </View>
      </Modal>
    );
  }
}

const mapStates = state => {

  console.log('state', state)
  return {

      users: state.user.users,
      userId: state.user.userid
  };
}
export default connect(mapStates,{},null,{forwardRef:true})(Feedback);