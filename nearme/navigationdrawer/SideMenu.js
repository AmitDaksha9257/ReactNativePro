/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './SideMenu.style.js';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, Image, TouchableWithoutFeedback, StatusBar, Share, Alert } from 'react-native';

class SideMenu extends Component {

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  // Share App to Others
  appShareFunc() {
    Share.share({
      message: 'Please Download Near-me app from play store',
      title: 'Near-me App',
      url: 'http://google.com'
    })
      .then((result) => {
        console.log("Result", result);
      }).catch(err => console.log(err))

  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#03004e' />

        {/* <View style={{ backgroundColor: '#29124f', height: 100, flexDirection: 'row', alignItems: 'center' }} >
          <Image style={{ height: 50, width: 50, marginLeft: 15 }}
            source={require('../../asset/user.png')} ></Image>
          <Text style={{ fontSize: 16, marginLeft: 15, color: 'white' }}>User Account</Text>
        </View>

        <TouchableWithoutFeedback >
          <View style={{ height: 50, flexDirection: 'row', alignItems: 'center' }} >
            <Image style={{ height: 25, width: 25, marginLeft: 15 }}
              source={require('../../asset/add-business-icon.png')}></Image>
            <Text style={{ fontSize: 14, marginLeft: 10, color: 'white', fontStyle: 'normal' }}>Add Your Business</Text>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{ backgroundColor: '#4a2c77', height: 1, marginLeft: 15 }}
        ></View>

        <TouchableWithoutFeedback >
          <View style={{ height: 50, flexDirection: 'row', alignItems: 'center' }} >
            <Image style={{ height: 25, width: 25, marginLeft: 15 }}
              source={require('../../asset/app-setting-icon.png')}></Image>
            <Text style={{ fontSize: 14, marginLeft: 10, color: 'white', fontStyle: 'normal' }}>Setting</Text>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{ backgroundColor: '#4a2c77', height: 1, marginLeft: 15 }}>
        </View>
 */}

        {/* Home Page */}
        <TouchableWithoutFeedback onPress={this.navigateToScreen('Home')}>
          <View style={{ height: 50, flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ height: 25, width: 25, marginLeft: 15 }}
              source={require('../../asset/home.png')}></Image>
            <Text style={{ fontSize: 14, marginLeft: 10, color: 'white', fontStyle: 'normal' }}>Home</Text>
          </View>
        </TouchableWithoutFeedback >
        {/* Help Page */}
        <TouchableWithoutFeedback onPress={this.navigateToScreen('Help')}>
        <View style={{ height: 50, flexDirection: 'row', alignItems: 'center' }}>
          <Image style={{ height: 25, width: 25, marginLeft: 15 }}
            source={require('../../asset/help-icon.png')}></Image>
          <Text style={{ fontSize: 14, marginLeft: 10, color: 'white', fontStyle: 'normal' }}>Help</Text>
        </View>
        </TouchableWithoutFeedback>
        <View style={{ backgroundColor: '#4a2c77', height: 1, marginLeft: 15 }}>
        </View>
        {/* FeedBack Page */}
        <TouchableWithoutFeedback onPress={this.navigateToScreen('Feedback')}>
          <View style={{ height: 50, flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ height: 25, width: 25, marginLeft: 15 }}
              source={require('../../asset/feedback-icon.png')}></Image>
            <Text style={{ fontSize: 14, marginLeft: 10, color: 'white', fontStyle: 'normal' }}>Send Feedback</Text>
          </View>
        </TouchableWithoutFeedback >


        <View
          style={{ backgroundColor: '#4a2c77', height: 1, marginLeft: 15 }}
        ></View>
        {/* About Us */}
        <TouchableWithoutFeedback  onPress={this.navigateToScreen('AboutUs')}>
          <View style={{ height: 50, flexDirection: 'row', alignItems: 'center' }} >
            <Image style={{ height: 25, width: 25, marginLeft: 15 }}
              source={require('../../asset/about-us.png')}></Image>
            <Text style={{ fontSize: 14, marginLeft: 10, color: 'white', fontStyle: 'normal' }}>About Us</Text>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{ backgroundColor: '#4a2c77', height: 1, marginLeft: 15 }}>
        </View>
        {/* Share App */}
        <TouchableWithoutFeedback onPress={this.appShareFunc}>
          <View style={{ height: 50, flexDirection: 'row', alignItems: 'center' }} >
            <Image style={{ height: 25, width: 25, marginLeft: 15 }}
              source={require('../../asset/share-app.png')}></Image>
            <Text style={{ fontSize: 14, marginLeft: 10, color: 'white', fontStyle: 'normal' }}>Share</Text>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{ backgroundColor: '#4a2c77', height: 1, marginLeft: 15 }}>
        </View>


        {/*         
        <TouchableWithoutFeedback onPress={this.navigateToScreen('Login')} >
          <View style={{ height: 50, flexDirection: 'row', alignItems: 'center' }} >
            <Image style={{ height: 25, width: 25, marginLeft: 15 }}
              source={require('../../asset/user.png')}></Image>
            <Text style={{ fontSize: 14, marginLeft: 10, color: 'white', fontStyle: 'normal' }}>Login</Text>
          </View>
        </TouchableWithoutFeedback >
        <View style={{ backgroundColor: '#4a2c77', height: 1, marginLeft: 15 }}></View> */}


        {/* <ScrollView style={{backgroundColor:'green'}}>
          <View onPress={this.navigateToScreen('Signup')}>
            <Text style={styles.sectionHeadingStyle}>
              Section 1
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Login')}>
              Page1
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Section 2
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Signup')}>
                Page2
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page3')}>
                Page3
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>This is my fixed footer</Text>
        </View> */}
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
