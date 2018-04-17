

import React, { Component } from 'react';
import { View,Dimensions,Image } from 'react-native';


let screenWidth=Dimensions.get('window').width;
let screenHeight=Dimensions.get('window').height;



export default class Splash extends Component {
    render(){
        return(
            <View style={{flex:1}}>
                <Image source={require('../../asset/spalsh.jpg')}
                style={{height:screenHeight,width:screenWidth,}}></Image>
            </View>
        );
    }
}