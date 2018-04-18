/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, AppRegistry,
  ScrollView, Image, TextInput, Button, TouchableOpacity, StatusBar, Alert
} from 'react-native';
import { styles } from './Logincss.js'
import { Left, Container, content, Header, Body, Icon, Content } from 'native-base'
import { loginUser } from '../../ServerApi/Server'
import { navigateToScreen } from '../../ServerApi/Server'

//import FBSDK, { LoginManager, AccessToken ,LoginButton} from 'react-native-fbsdk';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} = FBSDK;

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      _Email: null,
      _Password: null,
    };
  }
  funLoginUser() {
    if (this.state._Email == null) {
      Alert.alert("Please Enter Email");
      return
    } else if (this.state._Password == null) {
      Alert.alert("Please Enter Password");
      return;
    }

    const userInfo = {
      email: this.state._Email,
      password: this.state._Password,
    };
    //Call Function from server page
    loginUser(userInfo).then((result) => {
      console.log("LoginResponse", result);

      if (result.status == 1) {
        //Go to Home Screen
        navigateToScreen('MyApp', this.props);
      } else if (result.status == 0) {
        Alert.alert(result.message);
      }

    });
  }
  //Facebook Login Function
  // fbLoginFunc() {
  //   console.log("InsideFbAuthenticate");
  //   LoginManager.logInWithReadPermissions(['public_profile']).then(function (result) {
  //     if (result.isCancelled) {
  //       console.log('Login was Cancelled');
  //     } else {
  //       console.log('Login was a success' + result.grantedPermissions.toString());
  //       //console.log('Login was a success'+JSON.stringify(result));
  //       //console.log('FaceBookLoginResponse',result)
  //       //this.getAccessTokenUser().bind(this);

  //     }
  //   }, function (error) {
  //     console.log('An error occured: ' + error);
  //   })
  // }
  // getAccessTokenUser() {
  //   Alert.alert("HLEl");
  //   AccessToken.getCurrentAccessToken((token) => {
  //     console.log("AccessTOken: ", token);
  //   })
  // }

  //Create response callback.
  _responseInfoCallback = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      alert('Result Name: ' + result.name);
      console.log("FullResult: ",JSON.stringify(result));
    }
  }
  render() {
    return (

      <ScrollView >
        <View style={styles.container} >
          <StatusBar backgroundColor='#03004e' />
          <Image
            style={styles.ImageLogo}
            source={require('../../asset/user.png')}
          ></Image>
          <TextInput
            style={styles.editTextPro}
            placeholder="Email Id"
            underlineColorAndroid="transparent"
            keyboardType="email-address"
            onChangeText={(text) => this.setState({ _Email: text })}
          ></TextInput>

          <TextInput
            style={styles.editTextPro}
            placeholder="Password"
            underlineColorAndroid="transparent"
            keyboardType="default"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ _Password: text })}
          ></TextInput>

          <TouchableOpacity style={{ marginTop: 20 }} onPress={this.funLoginUser.bind(this)} >
            <View style={styles.buttonView}>
              <Text style={{ color: 'white' }} >LOGIN</Text></View>
          </TouchableOpacity>

          {/* <TouchableOpacity style={{ marginTop: 10 }} >
            <View style={styles.socialLoginBtnView}>
              <Image source={require('../../asset/facebook.png')}
                style={styles.socialLoginBtnImage}></Image>
              <Text style={styles.socialLoginBtnText}>
                Facebook login
                </Text>
            </View>
          </TouchableOpacity>
           */}
          <View style={styles.socialLoginBtnView}>
            {/* <LoginButton
          publishPermissions={["publish_actions"]}
          
          onLoginFinished={
            (error, result) => {
              if (error) {
                //alert("login has error: " + result.error);
              } else if (result.isCancelled) {
               // alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    //alert(data.accessToken.toString())
                    console.log("AccessToken",data.accessToken);
                  }
                )
              }
            }
          } */}
            <LoginButton
              publishPermissions={["publish_actions"]}
              onLoginFinished={
                (error, result) => {
                  if (error) {
                    alert("Login failed with error: " + result.error);

                  } else if (result.isCancelled) {
                    alert("Login was cancelled");
                  } else {
                    AccessToken.getCurrentAccessToken().then(
                      (data) => {
                        const infoRequest = new GraphRequest(
                          '/me?fields=email,name,friends,picture',
                          null,
                          this._responseInfoCallback
                        );
                        // Start the graph request.
                        new GraphRequestManager().addRequest(infoRequest).start();
                      }
                    )
                  }
                }
              }
              onLogoutFinished={() => alert("User logged out")} />

          </View>

          <TouchableOpacity style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate("Signup")} >
            <View style={styles.buttonView}>
              <Text style={{ color: 'white' }}>SIGN UP</Text></View>
          </TouchableOpacity>


        </View>
      </ScrollView>
    );
  }
}


