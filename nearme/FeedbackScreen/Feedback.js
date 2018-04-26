import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, AppRegistry, ScrollView,
    Image, TextInput, Button, TouchableOpacity, StatusBar,
    Alert, ToastAndroid, ImageStore, ActivityIndicator,BackHandler
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import { feedbackUser } from '../../ServerApi/Server.js';

import Spinner from 'react-native-loading-spinner-overlay';
export default class Feedback extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ImageSource: null,
            ImgBase64: "",
            name: null,
            phoneNo: null,
            email: null,
            message: null,
            loading: false,
        }
        //Back Press
        BackHandler.addEventListener('hardwareBackPress', function () {
            // Alert.alert("Bacl");
             props.navigation.navigate("Home");
            return true;
        });
    }

    //Slecting image from gallery or take photo func
    selectPhoto() {

        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.launchImageLibrary(options, (response) => {
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

                //Convert Image to Base64
                ImageStore.getBase64ForTag(
                    response.uri, (base64ImageData) => {
                        console.log("ImageBase64", base64ImageData);
                        this.setState({
                            ImgBase64: base64ImageData,
                        })
                    }, (error) => {
                        throw Error("Failed to find photo at specified uri");
                    });


                this.setState({
                    ImageSource: source

                });


            }
        });
    }
    //Send Feedback to server
    sendUserFeedback() {
        this.setState({
            loading: true
        })
        const feedbackInfo = {
            name: this.state.name,
            email_id: this.state.email,
            phone: this.state.phoneNo,
            message: this.state.message,
            image: this.state.ImgBase64,
        }
        feedbackUser(feedbackInfo).then((result) => {
            console.log("FeedbackResponse", result);
            if (result.status == 1) {

                //Success
                this.setState({
                    loading: false,
                })

                // Alert.alert("Successfully Submitted");

                Alert.alert(
                    '',
                    'Successfully Submitted',
                    [
                        { text: 'OK', onPress: () => this.props.navigation.navigate("MyApp") },
                    ],
                    { cancelable: false }
                )

            } else if (result.status == 0) {
                //Faild                  
                this.setState({
                    loading: false
                })
                ToastAndroid.show(result.message, ToastAndroid.SHORT);
            }
        });
    }
    //Validation of form
    formValidation() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.name == null) {
            ToastAndroid.show('Please enter name', ToastAndroid.SHORT);
            return;
        } else if (this.state.email == null) {
            ToastAndroid.show('Please enter email', ToastAndroid.SHORT);
            return;
        } else if (reg.test(this.state.email) == false) {
            ToastAndroid.show('Email is not correct', ToastAndroid.SHORT);
            return;
        } else if (this.state.message == null) {
            ToastAndroid.show('Please write your feedback', ToastAndroid.SHORT);
            return;
        }
        //Call feedback api
        this.sendUserFeedback();
    }
    render() {
        return (

            <ScrollView >
                <View style={styles.container}>
                    <StatusBar backgroundColor='#03004e' />
                    <Spinner visible={this.state.loading} textContent='Loading...'
                        textStyle={{ color: '#03004e' }}
                        cancelable={false} />
                    <View style={{ backgroundColor: '#3B227B', height: 50, alignItems: 'center', flexDirection: 'row' }}>
                        <TouchableOpacity style={{ width: 60,height:50,justifyContent:'center' }} 
                        onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Image source={require('../../asset/left-menu.png')}
                                style={{ height: 20, width: 20, marginLeft: 12, padding: 10 }}
                            ></Image>
                        </TouchableOpacity>
                        <Text
                            style={{ color: 'white', fontSize: 20, marginLeft: 0, fontWeight: 'bold' }}>Feedback</Text>
                    </View>
                    <View style={{ flexDirection: 'column', margin: 20, }}>
                        <TextInput
                            style={{ padding: 6, borderColor: 'black', borderWidth: 2, borderRadius: 8 }}
                            placeholder="Name"
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => this.setState({ name: text })}
                        ></TextInput>
                        <TextInput
                            style={{ padding: 6, marginTop: 10, borderColor: 'black', borderWidth: 2, borderRadius: 8 }}
                            placeholder="Email"
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => this.setState({ email: text })}
                        ></TextInput>

                        <TextInput
                            style={{ padding: 6, marginTop: 10, borderColor: 'black', borderWidth: 2, borderRadius: 8 }}
                            placeholder="Phone no"
                            keyboardType={'phone-pad'}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => this.setState({ phoneNo: text })}
                        ></TextInput>

                        <TextInput
                            style={{ padding: 6, marginTop: 10, borderColor: 'black', borderWidth: 2, borderRadius: 8 }}
                            placeholder="Write your feedback..."
                            multiline={true}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => this.setState({ message: text })}
                        ></TextInput>

                        <Text style={{ marginTop: 10, }}>Add screenshot here (Optional)</Text>

                        <TouchableOpacity onPress={this.selectPhoto.bind(this)}>
                            {this.state.ImageSource === null ? <Image
                                style={{ height: 120, width: 120, marginTop: 10, }}
                                source={require('../../asset/add-image.png')}
                            ></Image> : <Image style={{ height: 120, width: 120, marginTop: 10, }}
                                source={this.state.ImageSource}></Image>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 10 }} onPress={this.formValidation.bind(this)}>
                            <View style={styles.submitBtn}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                                    Submit
                            </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView >
        )
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,

    },
    submitBtn: {
        flexDirection: 'row',
        height: 45,
        borderRadius: 12,
        justifyContent: 'center',
        paddingTop: 5,
        backgroundColor: '#3B227B',
        borderWidth: 2,
        flexDirection: 'row'
    },


});