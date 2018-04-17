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

import FBSDK,{LoginManager}from'react-native-fbsdk';
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
  fbLoginFunc(){
    console.log("InsideFbAuthenticate");
      LoginManager.logInWithReadPermissions(['public_profile']).then(function(result){
        if(result.isCancelled){
          console.log('Login was Cancelled');
        }else{
          console.log('Login was a success'+result.grantedPermissions.toString());
          console.log('FaceBookLoginResponse',result)
        }
      },function(error){
        console.log('An error occured: '+error);
      })
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

          <TouchableOpacity style={{ marginTop: 10 }} onPress={this.fbLoginFunc.bind(this)}>
            <View style={styles.socialLoginBtnView}>
              <Image source={require('../../asset/facebook.png')}
                style={styles.socialLoginBtnImage}></Image>
              <Text style={styles.socialLoginBtnText}>
                Facebook login
                </Text>
            </View>
          </TouchableOpacity>

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


