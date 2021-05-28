import React from 'react';
import { View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { backgrounds, assets } from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import Toast from 'react-native-toast';
import vw from '../../Units/vw';
import TextRegular from '../../Components/TextRegular';
import MainInput from '../../Components/MainInput';
import CircleBtn from '../../Components/CircleBtn';
import Alert from '../../Popups/Alert';
import TouchableHOC from '../../Components/TouchableHOC';
import TextMedium from '../../Components/TextMedium';
import { ForgotPassword, verifyCode, changePassword } from '../../redux/actions';
import { connect } from 'react-redux';

class LogIn extends React.Component {
  state = {
    step: 1,
    email: '',
    code: '',
    password: '',
    setPassword: ''
  };
  btnPress = () => {


    if (this.state.step == 1) {

      if (this.state.email !== '') {
        this.props.ForgotPassword(this.state.email, pass => {
          
          if(pass=='Forget password email sent successfully.'){
            //Toast.show(pass)
            this.setState({ step: this.state.step + 1 });

          }
          if (pass.message!=='Email address does not exist.') {
            Toast.show(pass.message)
            //this.setState({ step: this.state.step + 1 });
          }
       
          else {
           
            Toast.show(pass.message)


          }
        });
      }
      else {


        Toast.show('email required')

      }

    }

    else if (this.state.step == 2) {

      if (this.state.code !== '') {

        this.props.verifyCode(this.state.code, pass => {

          if (pass == 'Code Verified') {

            this.setState({ step: this.state.step + 1 });
          }

          else {

            Toast.show(pass.message)


          }
        });
      }

      else {


        Toast.show('code required')

      }
    }

    else if (this.state.step == 3) {


      if (this.state.password !== '' || this.state.setPassword !== '') {

        if (this.state.password == this.state.setPassword) {



          this.props.changePassword(this.state.code, this.state.password, pass => {

            if (pass == 'Password Changed') {

              this.success.show()

            }

            else {

              Toast.show(pass.message)


            }
          });

        }

        else {


          Toast.show('Password not matched')

        }
      }

      else {


        Toast.show('Password required')

      }
    }


  };
  renderBody = () => {


    switch (this.state.step) {
      case 1:
        return (
          <>
            <TextMedium style={styles.SignUp}>PASSWORD RECOVERY</TextMedium>

            <MainInput
              placeholder="Email Address"
              label="Enter your email address"
              keyboardType="email-address"
              style={styles.field}
              onChangeText={(newemail) => this.setState({ email: newemail })}
              value={this.state.email}
            />
          </>
        );
        break;
      case 2:
        return (
          <>
            <TextMedium style={[styles.SignUp, { marginBottom: 0 }]}>
              PASSWORD RECOVERY
            </TextMedium>
            <TextRegular style={styles.message}>
              A Verification email was sent to your email address:
              {this.state.email}
            </TextRegular>
            <View style={styles.sendAgainRow}>
              <TextRegular style={styles.haveAccount}>
                Didn't receive it yet?{' '}
              </TextRegular>
              <TouchableOpacity onPress={() => {
                this.props.ForgotPassword(this.state.email, pass => {

                  if (pass.message) {

                    Toast.show(pass.message)

                  }
                  else { 

                    Toast.show(pass)

                  }
             
                });
              }}>

                <TextRegular style={styles.sendAgain}> Send it Again</TextRegular>

              </TouchableOpacity>

            </View>
            <MainInput
              placeholder="Enter code"
              onChangeText={(newcode) => this.setState({ code: newcode })}
              value={this.state.code}
              label="Enter Verification Code"
              style={styles.field}
            />
          </>
        );
        break;

      case 3:


        return (
          <>
            <TextMedium style={[styles.SignUp, { marginBottom: vh * 2 }]}>
              PASSWORD RECOVERY
            </TextMedium>

            <MainInput
              placeholder="password"
              secureTextEntry={true}
              label="Enter New Password"
              style={[styles.field]}
              onChangeText={(newpassword) => this.setState({ password: newpassword })}
              value={this.state.password}
            />
            <MainInput
              placeholder="Re-enter Password"
              secureTextEntry={true}
              style={styles.field}
              onChangeText={(newpassword) => this.setState({ setPassword: newpassword })}
              value={this.state.setPassword}
            />
          </>
        );
        break;
    }
  };
  render() {

    console.log('step', this.state.step)
    return (
      <ImageBackground style={styles.bg} source={backgrounds.BG}>
        <Alert
          ref={(e) => (this.success = e)}
          text={'Password Updated\nSuccessfully!'}
          onCross={() => this.props.navigation.navigate('Login')}
        />

        <View style={styles.container}>
          {this.renderBody()}

          <CircleBtn onPress={this.btnPress} />
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              paddingBottom: vh * 8,
            }}>
            <TouchableHOC
              style={styles.row}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Image
                source={assets.arrowBack}
                style={styles.arrow}
                resizeMode="contain"
              />
              <TextRegular style={styles.signin}> Back to login</TextRegular>
            </TouchableHOC>
          </View>
        </View>
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


export default connect(mapStates, { ForgotPassword, verifyCode, changePassword })(LogIn);
