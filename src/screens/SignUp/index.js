import React from 'react';
import {View, ImageBackground, Image} from 'react-native';
import {backgrounds, assets, icons} from '../../assets/images';
import styles from './styles';
import Toast from 'react-native-toast';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import TextRegular from '../../Components/TextRegular';
import MainInput from '../../Components/MainInput';
import CircleBtn from '../../Components/CircleBtn';
import Alert from '../../Popups/Alert';
import moment from 'moment'
import { connect } from 'react-redux';
import TextMedium from '../../Components/TextMedium';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CreateUser } from '../../redux/actions';
import DatePicker from '../../Popups/DatePickerModal'
import TouchableHOC from '../../Components/TouchableHOC';

class SignUp extends React.Component {


  
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      lastname: '',
      phone: '',
      Address:'',
      email: '',
      dob:'Select Date of Birth',
      password: '',
      confirmPassword: '',
     
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
  setDate=(fromdate)=>{
    console.log('dd',moment(fromdate).format('MM-DD-YYYY'));
    this.setState({
      dob:moment(fromdate).format('MM-DD-YYYY')
    })
}
  render() {
    return (
    
      <ImageBackground style={styles.bg} source={backgrounds.BG}>
         <DatePicker ref={(r)=> this.opendate=r}
               onSuccess={this.setDate}/>
        <Alert
          ref={(e) => (this.success = e)}
          text={'Account Created\nSuccessfully!'}
          onCross={() => this.props.navigation.navigate('Login')}
        />

<KeyboardAwareScrollView>
        <View style={styles.container}>
          <TextMedium style={styles.SignUp}>SIGN UP</TextMedium>
          <TextRegular style={styles.detail}>Sign up your Account</TextRegular>
          <MainInput placeholder="First Name" 
           value={this.state.username}
          style={styles.field}
          inputStyle={{ fontSize: vh * 2.5 }}
                        onChangeText={(newusername) => this.setState({

                          username: newusername
                        })} />
          <MainInput placeholder="Last Name" 
           value={this.state.lastname}
          style={styles.field} 
                    onChangeText={(lastname) => this.setState({

                      lastname: lastname
                    })}/>
          <MainInput placeholder="Phone no." 
           value={this.state.phone}
          style={styles.field}
          keyboardType="number-pad"
                     onChangeText={(phone) => this.setState({

                      phone: phone
  
                    })} />

<MainInput placeholder="Enter Address" 
           value={this.state.Address}
           style={styles.txtArea}
          multiline={true}
          numberOfLines={10}
          fieldStyle={{height:20*vh,textAlignVertical: 'top'}}
          onChangeText={(newAddress) => {
            this.setState({ Address: newAddress });
          }}/>
           <TouchableHOC style={styles.box}
                        onPress={()=> this.opendate.show()}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 4 * vw }}
                            >
                                <TextMedium style={[styles.from,{color:this.state.dob=='Select Date of Birth'? '#CCCCCC':'#CCCCCC' }]}>{this.state.dob}</TextMedium>
                                <Image source={icons.calendar}
                                    style={styles.calendar} />
                            </View>

                        </TouchableHOC>
          <MainInput placeholder="Email Address" 
          value={this.state.email}
          keyboardType="email-address"
          style={styles.field}
                         onChangeText={(newemail) => this.setState({

                          email: newemail
                        })} />
          <MainInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.field}
            value={this.state.password}
            onChangeText={(newpassword) => this.setState({

              password: newpassword
            })}
          />
          <MainInput
            placeholder="Re-enter Password"
            secureTextEntry={true}
            style={styles.field}
            value={this.state.confirmPassword}
            onChangeText={(newconfirmpassword) => this.setState({

              confirmPassword: newconfirmpassword
            })}
          />
          <CircleBtn onPress={() => 
            
            {
               if(this.state.username==''){

               
                  Toast.show('Firstname required')
                 
               }

               else if(this.state.lastname==''){
               
                  Toast.show('lastname is required')
                

               }
               else if(this.state.Address==''){
               
                Toast.show('Address is required')
              

             }
               else if(this.state.phone==''){
              
                  Toast.show('phone no is required')
                

               }
               else if(this.state.dob=='Select Date of Birth'){
              
                Toast.show('Date of Birth is required')
              

             }
               else if(this.state.email==''){
               
                  Toast.show('email is required')
                 

               }

               else if(this.state.password=='' || this.state.confirmPassword==''){
                
                  Toast.show('password is required')
                 

               }

               else if(this.state.password !==this.state.confirmPassword){

               
                  Toast.show('password not matched')
                
               }

               else if(!this.validate(this.state.email)){
               
                  Toast.show('Invalid email')
              

               }
               else if(this.state.phone.length<10){

                Toast.show('Number should contain atleast 10 characters')
               }

               else{
                this.props.CreateUser(this.state.username, this.state.lastname, this.state.email,
                  this.state.phone, this.state.password,this.state.Address,this.state.dob,pass => {

                    if (pass.status == 1) {
                      setTimeout(() => {
                        this.success.show();
                    
                                    }, 100)
                     
                      
                       
                    }
                    else{
                      setTimeout(() => {
                        Toast.show(pass.message)
                    
                                    }, 100)
                     
                      
                     
                    }

                    
                  }
                )

               }
             
            
            } 
          }/>
          <View style={styles.row}>
            <TextRegular style={styles.haveAccount}>
              Already have an account?{' '}
            </TextRegular>
            <TextRegular
              onPress={() => this.props.navigation.navigate('Login')}
              style={styles.signin}>
              Sign In
            </TextRegular>
          </View>
        </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
     
    );
  }
}
const mapStates = state => {

  console.log('s', state)
  return {


    user: state.user.users

  };
}
export default connect(mapStates, { CreateUser })(SignUp);
