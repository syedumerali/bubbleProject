import React from 'react';
import { View, ImageBackground, Image, Text, ScrollView, RefreshControl } from 'react-native';
import { backgrounds, assets, icons } from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import Toast from 'react-native-toast';
import vw from '../../Units/vw';
import TextRegular from '../../Components/TextRegular';
import ImageButton from '../../Components/ImageButton';
import MainInput from '../../Components/MainInput';
import ChangePassword from '../../Popups/changePassword';
import Alert from '../../Popups/Alert';
import TextMedium from '../../Components/TextMedium';
import CircularBook from '../../Components/CircularBook';
import TouchableHOC from '../../Components/TouchableHOC';
import ReactNativeBiometrics from 'react-native-biometrics'
import BarlowRegular from '../../Components/TextRegular'
import moment from 'moment'
import { connect } from 'react-redux';
import DatePicker from '../../Popups/DatePickerModal'
import GradientBg from '../../Components/GradientBg';
import { UpdateProfile, UpdatePasswordApi, Getprofile, savebiometric, clearbiometric } from '../../redux/actions';
import {
  loaderColor
} from '../../../config.json';
class ProfileDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastName: '',
      phoneNumber: '',
      profile: null,
      biometric: '',
      dob:'Select Date of Birth',
      flag: true
    }
  }

  componentDidMount() {
    // SplashScreen.hide();
    // Keyboard.addListener("keyboardDidHide", this._keyboardDidHide());

    ReactNativeBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject

        if (available && biometryType === ReactNativeBiometrics.TouchID) {
          this.setState({
            biometric: 'TouchID'
          })
          console.log('TouchID is supported')
        } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
          this.setState({
            biometric: 'FaceID'
          })
          console.log('FaceID is supported')
        } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
          console.log('Biometrics is supported')
          this.setState({
            biometric: 'Biometric'
          })
        } else {
          console.log('Biometrics not supported')
        }
      })
    this.props.navigation.addListener('focus', this.getprofile);


  }

  getprofile = () => {

    this.props.Getprofile(this.props.users.userId, pass => {

      this.setState({
        flag: true
      })
      if (pass !== null) {

        this.setState({

          profile: pass,
          flag: false,
          firstname: pass.firstname,
          lastName: pass.lastname,
          phoneNumber: pass.phone,
          dob:pass.dateofbirth
          

          // Address: pass.billing.address_1
        })
      }
    })

  }
  state = { edit: false };
  renderFields = () => {
    if (this.state.edit) {
      return (
        <>
          <TextRegular style={styles.label}>First Name</TextRegular>
          <MainInput style={styles.input} value={this.state.firstname}
            onChangeText={(newFirstName) => {
              this.setState({

                firstname: newFirstName
              })
            }} />
          <TextRegular style={styles.label}>Last Name</TextRegular>
          <MainInput style={styles.input} value={this.state.lastName}
            onChangeText={(newLastName) => {
              this.setState({
                lastName: newLastName
              })
            }} />
          <TextRegular style={styles.label}>Phone Number</TextRegular>
          <MainInput style={styles.input} value={this.state.phoneNumber}
            keyboardType="number-pad"
            onChangeText={(newphone) => {
              this.setState({
                phoneNumber: newphone
              })
            }} />

<TouchableHOC style={styles.box}
                        onPress={()=> this.opendate.show()}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 4 * vw }}
                            >
                                <BarlowRegular style={[styles.from,{color:this.state.dob=='Select Date of Birth'? '#CCCCCC':'#CCCCCC' }]}>{this.state.dob}</BarlowRegular>
                                <Image source={icons.calendar}
                                    style={styles.calendar} />
                            </View>

                        </TouchableHOC>
          {/* <TextRegular style={styles.label}>Address</TextRegular>
          <MainInput style={styles.input} value={this.state.Address}

            onChangeText={(newAddress) => {
              this.setState({
                Address: newAddress
              })
            }} /> */}

            
          {/* <TextRegular style={styles.label}>Date of Birth</TextRegular>
          <View>
            <BarlowRegular></BarlowRegular>
          </View> */}
          <TextRegular style={styles.label}>Email</TextRegular>
          <TextMedium style={styles.userfield}>
            {this.state.profile.email}
          </TextMedium>
          <TouchableHOC onPress={() => this.changePassword.show()}>
            <CircularBook style={styles.changePassword}>
              Change Password
            </CircularBook>
          </TouchableHOC>
          <ImageButton
            title="UPDATE"
            onPress={() => {
              if (this.state.firstname !== '' && this.state.lastName !== '') {

                this.props.UpdateProfile(this.state.firstname, this.state.lastName, this.state.email,this.state.phoneNumber, this.props.users.userId,this.state.dob, pass => {

                  if (pass !== '') {

                    this.updateprofile.show();
                    this.setState({
                      edit: false,
                      profile: pass
                    })
                  }

                  else {

                    Toast.show('Cannot update profile')

                  }
                });
              }

              else {

                if (this.state.firstname == '') {

                  Toast.show('Firstname required')

                }
                else {

                  Toast.show('lastname required')

                }
              }
            }}
            btnContainer={styles.btn}
          />
          { this.state.biometric !== '' && <View style={{ flexDirection: 'row' }}>
            <Image source={this.props.biometric ? icons.termsactive : icons.termsinactive}
              style={styles.circle} />
            <TextRegular style={styles.biotext}>{this.state.biometric}</TextRegular>
          </View>
          }
        </>
      );
    } else {

      return (
        <>
          <TextRegular style={styles.label}>First Name</TextRegular>
          <TextMedium style={styles.userfield}>{this.state.profile.firstname}</TextMedium>
          <TextRegular style={styles.label}>Last Name</TextRegular>
          <TextMedium style={styles.userfield}>{this.state.profile.lastname}</TextMedium>
          <TextRegular style={styles.label}>Phone Number</TextRegular>
          <TextMedium style={styles.userfield}>{this.state.profile.phone}</TextMedium>
          <TextRegular style={styles.label}>Email</TextRegular>
          <TextMedium style={styles.userfield}>
            {this.state.profile.email}
          </TextMedium>
          <TextRegular style={styles.label}>Date of Birth</TextRegular>
          <TextMedium style={styles.userfield}>
            {this.state.profile.dateofbirth}
          </TextMedium>
          {/* <TextRegular style={styles.label}>Address</TextRegular>
          <TextMedium style={styles.userfield}>
            {this.state.profile.billing.address_1}
          </TextMedium> */}
          <TouchableHOC onPress={() => this.changePassword.show()}>
            <CircularBook style={styles.changePassword}>
              Change Password
            </CircularBook>
          </TouchableHOC>
          <ImageButton
            title="EDIT PROFILE"
            onPress={() => this.setState({ edit: true })}
            btnContainer={styles.btn}
          />
          <View style={{ alignItems: 'center', marginTop: 4 * vh }}>

            {this.state.biometric !== '' && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableHOC onPress={() => this.prompt()}>
                <Image source={this.props.biometric ? icons.termsactive : icons.termsinactive}
                  style={styles.circle}
                />
              </TouchableHOC>

              <TextRegular style={styles.biotext}>{this.state.biometric}</TextRegular>
            </View>
            }
          </View>


        </>
      );
    }
  };
  prompt = () => {
    console.log('check face id');
    ReactNativeBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
      .then((resultObject) => {
        const { success } = resultObject
        console.log('rr', resultObject);
        if (success) {

          if (this.props.biometric) {
            this.props.clearbiometric()
          }
          else {
            let userInfo = {
              email: this.props.users.email,
              password: this.props.users.password
            }
            this.props.savebiometric(userInfo)
          }
          console.log('successful biometrics provided')
        } else {
          console.log('user cancelled biometric prompt')
        }
      })
      .catch(() => {
        console.log('biometrics failed')
      })
  }
  setDate=(fromdate)=>{
    console.log('dd',moment(fromdate).format('MM-DD-YYYY'));
    this.setState({
      dob:moment(fromdate).format('MM-DD-YYYY')
    })
}
  render() {
    return (
      <GradientBg
        style={{ flex: 1, paddingHorizontal: vw * 8, paddingTop: vh * 4 }}>
   <DatePicker ref={(r)=> this.opendate=r}
               onSuccess={this.setDate}/>
        <ScrollView refreshControl={
          <RefreshControl refreshing={this.state.flag}
            tintColor={loaderColor}
            colors={[loaderColor]}
            onRefresh={this.getprofile} />
        }>
          <ChangePassword
            ref={(e) => (this.changePassword = e)}
            onSuccess={(newpassword, confirmpassword) => {

              if (newpassword !== '' && confirmpassword !== '') {

                if (newpassword === confirmpassword) {
                  this.props.UpdatePasswordApi(this.props.users.firstname, this.props.users.email, this.props.users.id, newpassword, pass => {

                    if (pass !== '') {

                      this.changeSuccess.show();
                      this.props.clearbiometric()
                    }

                    else {

                      Toast.show('Cannot update password')


                    }
                  });

                }

                else {

                  Toast.show('Password Not matched')

                }
              }


              else {

                Toast.show('Password required')



              }
              // this.changeSuccess.show();
            }}
          />
          <Alert
            text={'Your password has been\nupdated successfully'}
            onSuccess={() => { }}
            ref={(e) => (this.changeSuccess = e)}
          />
          <Alert
            text={'Your profile has been\nupdated successfully'}
            onSuccess={() => { }}
            redeemSuccess={()=> this.getprofile()}
            ref={(e) => (this.updateprofile = e)}
          />
          {this.state.profile !== null ? this.renderFields()
            : null}

        </ScrollView>

      </GradientBg>
    );
  }
}
const mapStates = state => {

  console.log('state', state)
  return {

    users: state.user.users,
    biometric: state.user.biometric
  };
}
export default connect(mapStates, { UpdateProfile, UpdatePasswordApi, Getprofile, savebiometric, clearbiometric })(ProfileDetails);
