

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, ScrollView, Image, TextInput, TouchableOpacity, Alert,
    NativeModules, ImageStore
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
//import RNImageToBase64 from 'react-native-image-to-base64';
import { styles } from '../login/Logincss.js';
import { signupUser } from '../../ServerApi/Server';
import { navigateToScreen } from '../../ServerApi/Server';

export default class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: null,
            userEmail: null,
            mobileNo: null,
            password: null,
            confirmPassword: null,
            ImageSource: null,
            base64Image: null,

        }
    }
    //Slecting image from gallery or take photo func
    selectPhotoTapped() {

        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                NativeModule
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                console.log("ImageSource: ", source);


                ImageStore.getBase64ForTag(
                    response.uri, (base64ImageData) => {
                        console.log("ImageBase64", base64ImageData);

                        let source1 = "data:image/png;base64," + base64ImageData;
                        // this.setState({
                        //     ImageSource:source1
                        // });
                    }, (error) => {
                        throw Error("Failed to find photo at specified uri");
                    });


                this.setState({
                    ImageSource: source

                });


            }
        });
    }


    //User Signup function 
    signupValidation() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        console.log("insideFunSignUp")
        if (this.state.userName == null) {
            console.log("insideFunSignUp+1");
            this.funcAlert("Enter Name");
            return;
        } else if (this.state.userEmail == null) {
            this.funcAlert("Enter Email");
            return;
        } else if (reg.test(this.state.userEmail) == false) {
            this.funcAlert("Email is not correct");
            return;
        } else if (this.state.mobileNo == null) {
            this.funcAlert("Enter Mobile NO");
            return;
        } else if (this.state.mobileNo.length != 10) {
            this.funcAlert("Invalid Phone No.")
            return;

        } else if (this.state.password == null) {
            this.funcAlert("Enter Password");
            return;
        } else if (this.state.confirmPassword != this.state.password) {
            this.funcAlert("Password not match.");
            return;
        }
        //Calling func after validatio ture
        this.funcUserSignUp();
    }

    funcAlert(msg) {
        Alert.alert(msg);
    }

    funcUserSignUp() {
        const signupInfo = {
            name: this.state.userName,
            email: this.state.userEmail,
            phone_number: this.state.mobileNo,
            password: this.state.password,
            image: 'randoMImageBase64Conversion',
        }
        signupUser(signupInfo).then((result) => {
            console.log("ResponseFromApi", result);
            if (result.status == 1) {
                //Go to Home Screen
                navigateToScreen('MyApp', this.props);
            } else if (result.status == 0) {
                Alert.alert(result.message);
            }
        });
    }

    render() {
        return (
            <ScrollView >
                <View style={styles.container} >
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                       {this.state.ImageSource === null ? <Image
                            style={styles.ImageLogo}
                            source={require('../../asset/user.png')}
                        ></Image> :
                            <Image style={styles.ImageLogo} source={this.state.ImageSource} />
                        }


                    </TouchableOpacity>
                    <TextInput
                        style={styles.editTextPro}
                        placeholder="Name"
                        underlineColorAndroid="transparent"
                        autoFocus={true}
                        returnKeyType={'next'}
                        onChangeText={(text) => this.setState({ userName: text })}
                    ></TextInput>

                    <TextInput
                        style={styles.editTextPro}
                        placeholder="Email"
                        underlineColorAndroid="transparent"
                        keyboardType="email-address"
                        returnKeyType={'next'}
                        onChangeText={(text) => this.setState({ userEmail: text })}
                    ></TextInput>

                    <TextInput
                        style={styles.editTextPro}
                        placeholder="Mobile number"
                        underlineColorAndroid="transparent"

                        keyboardType={'phone-pad'}
                        onChangeText={(text) => this.setState({ mobileNo: text })}
                    ></TextInput>

                    <TextInput
                        style={styles.editTextPro}
                        placeholder="Password"
                        underlineColorAndroid="transparent"
                        keyboardType="default"
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password: text })}
                    ></TextInput>

                    <TextInput
                        style={styles.editTextPro}
                        placeholder="Confirm Password"
                        underlineColorAndroid="transparent"
                        keyboardType="default"

                        onChangeText={(text) => this.setState({ confirmPassword: text })}
                        secureTextEntry={true}
                    ></TextInput>

                    <TouchableOpacity onPress={this.signupValidation.bind(this)} style={{ marginTop: 30 }} >
                        <View style={styles.buttonView}>
                            <Text style={{ color: 'white' }}>
                                Sign up</Text></View>
                    </TouchableOpacity>


                </View>
            </ScrollView>
        );
    }
}

