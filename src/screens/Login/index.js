import React from 'react';
import {View, ImageBackground, Image} from 'react-native';
import {backgrounds, assets, icons} from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import Toast from 'react-native-toast';
import vw from '../../Units/vw';
import TextRegular from '../../Components/TextRegular';
import MainInput from '../../Components/MainInput';
import CircleBtn from '../../Components/CircleBtn';
import Alert from '../../Popups/Alert';
import TextMedium from '../../Components/TextMedium';
import {connect} from 'react-redux';
import BirthdayPopup from '../BirthdayPopup';
import {LoginUser, clearbiometric} from '../../redux/actions';
import TouchableHOC from '../../Components/TouchableHOC';
import ReactNativeBiometrics from 'react-native-biometrics';

class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }
  prompt = () => {
    ReactNativeBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
      .then((resultObject) => {
        const {success} = resultObject;
        console.log('rr', resultObject);
        if (success) {
          this.props.LoginUser(
            this.props.biometric.email,
            this.props.biometric.password,
            (pass) => {
              if (pass.status == 'ok') {
                setTimeout(() => {
                  this.setState({
                    email: '',
                    password: '',
                  });
                  Toast.show('You have successfully logged in');
                  this.props.navigation.navigate('Home');
                }, 300);
              } else if (pass.status == 'error') {
                Toast.show(pass.error);
              }
            },
          );
          console.log('successful biometrics provided');
        } else {
          console.log('user cancelled biometric prompt');
        }
      })
      .catch(() => {
        console.log('biometrics failed');
      });
  };
  render() {
    return (
      <ImageBackground style={styles.bg} source={backgrounds.BG}>
        <Alert
          ref={(e) => (this.success = e)}
          text="Password Updated Successfully!"
        />
        <BirthdayPopup ref={(r) => (this.birthday = r)} />
        <View style={styles.container}>
          <TextMedium style={styles.SignUp}>LOG IN</TextMedium>
          <TextRegular style={styles.detail}>Login your Account</TextRegular>

          <MainInput
            placeholder="Email Address"
            keyboardType="email-address"
            onChangeText={(newemail) =>
              this.setState({
                email: newemail,
              })
            }
            value={this.state.email}
            style={styles.field}
          />
          <MainInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(newpassword) =>
              this.setState({
                password: newpassword,
              })
            }
            value={this.state.password}
            style={[styles.field, {marginBottom: vh * 1}]}
          />
          <TextRegular
            onPress={() => this.props.navigation.navigate('PasswordRecovery')}
            style={styles.forgot}>
            Forgot Password?
          </TextRegular>

          <CircleBtn
            onPress={() => {
              if (this.state.email == '') {
                Toast.show('email required');
              } else if (this.state.password == '') {
                Toast.show('password required');
              } else {
                this.props.LoginUser(
                  this.state.email,
                  this.state.password,
                  (pass) => {
                    if (pass.status == 'ok') {
                      if (this.props.biometric) {
                        console.log('bb', this.props.biometric);

                        console.log(
                          'email',
                          this.state.email,
                          this.state.password,
                        );
                        if (
                          this.props.biometric.email !== this.state.email &&
                          this.props.biometric.password !== this.state.password
                        ) {
                          console.log('check equal');
                          this.props.clearbiometric();
                        }
                      }

                      setTimeout(() => {
                        this.setState({
                          email: '',
                          password: '',
                        });
                        Toast.show('You have successfully logged in');
                        this.props.navigation.navigate('Home');
                      }, 100);
                    } else if (pass.status == 'error') {
                      Toast.show(pass.error);
                    }
                  },
                );
              }
              // this.birthday.show()
            }}
          />
          <View style={styles.row}>
            <TextRegular style={styles.haveAccount}>New Here </TextRegular>
            <TextRegular
              onPress={() => this.props.navigation.navigate('SignUp')}
              style={styles.signin}>
              {' '}
              Sign Up
            </TextRegular>
          </View>
        </View>
        {this.props.biometric && (
          <View style={{alignItems: 'center'}}>
            <TouchableHOC
              style={{
                alignItems: 'center',
                marginTop: 4 * vh,
                width: 20 * vw,
                justifyContent: 'center',
              }}
              onPress={() => this.prompt()}>
              <Image source={icons.fingerprint} style={styles.print} />
            </TouchableHOC>
          </View>
        )}
      </ImageBackground>
    );
  }
}
const mapStates = (state) => {
  console.log('s', state);
  return {
    user: state.user.users,
    biometric: state.user.biometric,
  };
};
export default connect(mapStates, {LoginUser, clearbiometric})(LogIn);
