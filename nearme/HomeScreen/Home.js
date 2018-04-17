

import React, { Component } from 'react';
import {
    View, Text, Image, StyleSheet,
    TextInput, Dimensions, ScrollView,
    TouchableHighlight, Platform, TouchableOpacity, Alert,PermissionsAndroid
} from 'react-native';
import Button from 'react-native-button';
import { learnColour } from '../../asset/left-menu.png';
import { NavigationActions } from 'react-navigation';

let screenWidth = Dimensions.get('window').width;

export default class Home extends Component {
    //Navigate to Next Screen
    navigateToScreen(name) {
        console.log("InSideNvigate");
        const navigateAction = NavigationActions.navigate({
            routeName: name,
            params: { placeSearch: this.state.typedText,LatLng: this.state.lat_lng}
        });
        this.props.navigation.dispatch(navigateAction);
    }

    constructor(props) {
        super(props);
        this.state = {
            typedText: '',
            latitude: null,
            longitude: null,
            error: null,
            inputText: '',
            lat_lng:null,
        };
    }

    componentDidMount() {
        this.getLocationPermissions();
    }

    // Check Location Permission
    async getLocationPermissions() {
        console.log("getLocationPermission"+"iddidd");
        const chckLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
            this.getCurrentLoc();
        } else {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        'title': 'InHouse App required Location permission',
                        'message': 'We required Location permission in order to get device location ' +
                            'Please grant us.'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //Alert.alert("You've access for the location");
                    this.getCurrentLoc();
                } else {
                    Alert.alert("You don't have access for the location");
                }
            } catch (err) {
                Alert.alert("LocationErroris"+err)
            }
        }
    }

    // To get Current Location
    getCurrentLoc() {
        console.log("getCurrentLoc","Inside");
        
        navigator.geolocation.getCurrentPosition((position) => {
            console.log("Current_Position", "wookeey");
            console.log("Current_Position", position);
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
                lat_lng:position.coords.latitude+","+position.coords.longitude,
            });
        }, (error) => this.setState({ error: error.message }),
            console.log("ERRRORRR"),
            { enableHighAccuracy: true, timeout: 100000, maximumAge: 0 }, );
    }

    //Check Input Text for empty or not
    CheckTextInputIsEmptyOrNot() {
        if (this.state.typedText != '') {
            this.navigateToScreen('Listing');
        } else {
            Alert.alert('', 'Please enter text');

        }

    }
    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    {/* <Text>{this.state.error}</Text>
                    <Text>{this.state.latitude}</Text> */}
                    <View style={{ backgroundColor: '#3B227B', height: 50, alignItems: 'center', flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Image source={require('../../asset/left-menu.png')}
                                style={{ height: 20, width: 20, marginLeft: 12, padding: 10 }}
                            ></Image>
                        </TouchableOpacity>
                        <Text
                            style={{ color: 'white', fontSize: 20, marginLeft: 15, fontWeight: 'bold' }}>Home</Text>
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 25, marginBottom: 10, }}>
                        <Image source={require('../../asset/logo-img.png')}></Image>
                        <Image source={require('../../asset/logo-text.png')}></Image>
                    </View>
                    <View style={{ backgroundColor: '#00bfa5', height: .75, margin: 10, marginTop: 10, }}></View>
                    <View style={styles.searchPlaces}>
                        <Image style={{
                            width: 28,
                            height: 28,
                            marginTop: 5,
                        }} source={require('../../asset/search-field-icon.png')}></Image>
                        <TextInput
                            placeholder="What you are looking for ?"
                            style={{
                                height: 60, flex: 1,
                                marginRight: 30,
                                padding: 10,
                                marginLeft: 10,
                                fontSize: 20,
                            }}

                            onChangeText={(text) => this.setState({ typedText: text })}
                        />

                    </View>
                    <Button style={{
                        fontSize: 18,
                        color: 'white',
                        backgroundColor: '#00bfa5',
                        padding: 10,
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                    }} onPress={this.CheckTextInputIsEmptyOrNot.bind(this)}>SEARCH</Button>

                </View>
            </ScrollView>
        );
    }
};




const styles = StyleSheet.create({

    container: {
        flex: 1,

    },
    searchPlaces: {
        flex: 2,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30,
    },
    parentContair: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30,
    },
    logo: {
        width: 200,
        height: 150,
        marginTop: 20,
    },
    line: {
        width: screenWidth,
        height: 1.3,
        marginTop: 30,
        backgroundColor: '#00bfa5',
        marginLeft: 30,
        marginRight: 30,
    },

});