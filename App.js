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
  View, Image
} from 'react-native';

import { Container, content, Header, Body, Icon, Content, } from 'native-base'

// for navigation
// npm install 'native-base'

// npm install --save react-navigation@1.0.0-beta.11
// npm install react-native-button --save
// react-native start --port=8088

//npm install --save react-native-google-maps-directions
//npm install react-native-stars --save
//npm install react-native-loading-spinner-overlay
//npm install react-native-image-picker@latest --save
//npm install react-native-image-base64
// npm install native-base --save
//npm i react-native-splash-screen --save



import { MyApp } from './nearme/navigationdrawer/MyApp.js'
import Splash from './nearme/SplashScreen/Splash.js'
import  Home  from './nearme/HomeScreen/Home.js'
import  { StackNavigator } from 'react-navigation'
import  DetialScreen  from './nearme/ListDetailScreen/DetailScreen.js'
import  Listing  from './nearme/ListingScreen/Listing.js'
import Login from './nearme/login/Login.js';
import Signup from './nearme/signup/Signup.js';
import Feedback from './nearme/FeedbackScreen/Feedback.js';

import SplashScreen from 'react-native-splash-screen';

const AppNavigtor = StackNavigator({

  MyApp: { screen: MyApp },
  Listing:{screen:Listing},
  DetialScreen:{screen:DetialScreen},
  Signup: { screen: Signup },
  Login: { screen: Login },
  Feedback:{screen: Feedback},
},
  {
    headerMode: 'none'
  },

)

export default class App extends Component {
 
  render() {
    return (
      <AppNavigtor />
     
    );
  }
}
//KeysotePassword :- NearBy
//First and Last name :- NearBy
//What is the name of your organizational unit? :-NearBy
//What is the name of your organization? :- NearBy
//What is the name of your City or Locality?:-Mohali
//What is the name of your State or Province? :- Punjab
//What is the two-letter country code for this unit?:-91
//Enter key password for <my-key-alias>(RETURN if same as keystore password): NearBy