import React from 'react';
import {View, ImageBackground, Image, Text,TouchableOpacity,Linking} from 'react-native';
import {backgrounds, assets, icons} from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import ImageButton from '../../Components/ImageButton';
import MainInput from '../../Components/MainInput';
import CircleBtn from '../../Components/CircleBtn';
import Alert from '../../Popups/Alert';
import Toast from 'react-native-toast';
import TextMedium from '../../Components/TextMedium';
import TextRegular from '../../Components/TextRegular';
import GradientBg from '../../Components/GradientBg';
import { contactUs } from '../../redux/actions';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  default_text_color
} from '../../../config.json';


class AboutUs extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name:this.props.profile!==null? this.props.profile?.firstname + " " + this.props.profile?.lastname : '',
      email:this.props.profile!==null? this.props.profile?.email : '',
      phone:this.props.profile!==null? this.props.profile?.phone : '',
      message:''
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
  render() {
    return (
      <GradientBg
        style={{flex: 1, paddingHorizontal: vw * 5, paddingTop: vh * 4}}>

          <KeyboardAwareScrollView>
        <Alert
          text="Your message has been sent"
          ref={(e) => (this.success = e)}
          onSuccess={() => {}}
        />
        <TextRegular
          style={{
            color: default_text_color,
            fontSize: vh * 2.2,
            marginBottom: vh * 2.5,
          }}>
          Submit your details to admin
        </TextRegular>
        <MainInput placeholder="Name" style={styles.input}
                    value={this.state.name}
                    // onSubmitEditing={() => { 
                      
                    //   this.email_txt.focus()
                    
                    // }}
                    onChangeText={(newName)=> {this.setState({name:newName})}} />
        <MainInput
        
        placeholder="Email" style={styles.input}
        ref={(input) => { this.email_txt = input; }}
                     value={this.state.email}
                     keyboardType="email-address"
                     //onSubmitEditing={() => { this.phone_txt.focus(); }}
                     onChangeText={(newEmail)=> {this.setState({email:newEmail})}}
                     
                     />
        <MainInput 
        
        placeholder="Phone #" style={styles.input}
                      
                    value={this.state.phone}
                    keyboardType="number-pad"
                    //onSubmitEditing={() => { this.message_text.focus(); }}
                    ref={(input) => { this.phone_txt = input; }}
                    onChangeText={(newphone)=> {this.setState({phone:newphone})}} 
                    
                    />
        <MainInput
          placeholder="Type your message here"
          style={styles.txtArea}
          multiline={true}
          value={this.state.message}
          ref={(input) => { this.message_text = input; }}
          onChangeText={(newMessage)=> {this.setState({message:newMessage})}}
        />
        <ImageButton title="Send" onPress={() => 
          
          {
            if(this.state.name==''){

             
                Toast.show('name is required')
              
             }

             else if(this.state.email==''){
             
                Toast.show('email is required')
              

             }

             else if(this.state.phone==''){
             
                Toast.show('phone no is required')
              

             }

             else if(this.state.message==''){
             
                Toast.show('message is required')
              
             }

             else if(!this.validate(this.state.email)){
               
              Toast.show('Invalid email')
          

           }

            else{
              this.props.contactUs(this.state.name, this.state.email, this.state.message, this.state.phone,success => {
    
                if (success == "Your request has been submitted!") {
      
                  this.success.show();
                  this.setState({

                    name:'',
                    email:'',
                    phone:'',
                    message:''
                  })
                }
                else{
                  
                    Toast.show('message not sent')
                  
      
                }
              });
                   
            }      
        
        }} />
      
        <TextMedium style={styles.contactTxt}>Contact Detail</TextMedium>
        <View style={styles.contactRow}>
          <Image
            source={icons.phone}
            style={styles.contacticon}
            resizeMode="contain"
          />
          <TextRegular style={styles.contact}>+1 209-636-4695</TextRegular>
        </View>
       
        <View style={styles.contactRow}
        >
          <Image
            source={icons.mail}
            style={styles.contacticon}
            resizeMode="contain"
          />
          <TextRegular style={styles.contact}>info@ bubbleleaf.net</TextRegular>
        </View>
       <View style={styles.contactRow}>
          <Image
            source={icons.location}
            style={styles.contacticon}
            resizeMode="contain"
          />
          <TextRegular style={styles.contact}>
          526 w benjamin holt dr suite A (12,984.18 km)
95207 Stockton, CA, US
          </TextRegular>
        </View>
       
        </KeyboardAwareScrollView>
      </GradientBg>
    );
  }
}
const mapStates = state => {

  console.log('state', state)
  return {

    users: state.user.users,
    cartItems: state.cart.cartItems,
    profile: state.user.profile,
  };
}

export default connect(mapStates, { contactUs })(AboutUs);
