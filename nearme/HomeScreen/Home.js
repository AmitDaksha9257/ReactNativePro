

import React, { Component } from 'react';
import {
    View, Text, Image, StyleSheet,
    TextInput, Dimensions, ScrollView,
    TouchableHighlight, Platform, TouchableOpacity, Alert, PermissionsAndroid, StatusBar,
    ToastAndroid, BackHandler, Animated
} from 'react-native';
import Button from 'react-native-button';
import { learnColour } from '../../asset/left-menu.png';
import { NavigationActions } from 'react-navigation';

import SplashScreen from 'react-native-splash-screen';

let screenWidth = Dimensions.get('window').width;

export default class Home extends Component {
    //Navigate to Next Screen
    navigateToScreen(name) {
        console.log("InSideNvigate");
        console.log("CurrentLat", this.state.lat_lng);

        if (this.state.lat_lng != null) {


            const navigateAction = NavigationActions.navigate({
                routeName: name,
                params: { placeSearch: this.state.typedText, LatLng: this.state.lat_lng }
            });
            this.props.navigation.dispatch(navigateAction);
        } else {
            ToastAndroid.show('Your Loacation not found.', ToastAndroid.SHORT);
        }
    }

    //Detect Back press 
    backPress() {
        BackHandler.addEventListener('hardwareBackPress', this.navigateToScreen('Home'));
    }
    constructor(props) {
        super(props);
        this.state = {
            typedText: '',
            latitude: null,
            longitude: null,
            error: null,
            inputText: '',
            lat_lng: null,
            yPosition: new Animated.Value(0),
            opecity: new Animated.Value(0),
        };
        this._onSearchPressed = this._onSearchPressed.bind(this);
        this.crossButtonClick = this.crossButtonClick.bind(this);
        //Handle BackPress
        BackHandler.addEventListener('hardwareBackPress', function () {
            // Alert.alert("Bacl");
            // props.navigation.navigate("Login");
            return true;
        });

    }

    componentDidMount() {
        //HideSplas Screen After Launchig Home screen
        SplashScreen.hide();

        //Ask For Permission When Open App
        this.getLocationPermissions();
    }

    // Check Location Permission
    async getLocationPermissions() {
        console.log("getLocationPermission" + "iddidd");
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
                Alert.alert("LocationErroris" + err)
            }
        }
    }

    // To get Current Location
    getCurrentLoc() {
        console.log("getCurrentLoc", "Inside");

        navigator.geolocation.getCurrentPosition((position) => {
            console.log("Current_Position", "wookeey");
            console.log("Current_Position", position);
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
                lat_lng: position.coords.latitude + "," + position.coords.longitude,
            });
        }, (error) => this.setState({ error: error.message }),
            console.log("ERRRORRR"),
            { enableHighAccuracy: true, timeout: 100000, maximumAge: 0 }, );
    }

    //Check Input Text for empty or not
    CheckTextInputIsEmptyOrNot() {
        console.log("CurrentLat", this.state.lat_lng);
        if (this.state.typedText != '') {

            this.navigateToScreen('Listing');
        } else {
            ToastAndroid.show('Please enter text first', ToastAndroid.SHORT);
            // Alert.alert('', 'Please enter text');

        }

    }
    //Sercbox open
    _onSearchPressed() {
        Animated.parallel([
            Animated.timing(this.state.yPosition, {
                toValue: 68,
                duration: 500
            }),
            Animated.timing(this.state.opecity, {
                toValue: 1,
                duration: 500
            })
        ]).start();
    }
    //Searchbox close
    crossButtonClick() {
        Animated.parallel([
            Animated.timing(this.state.yPosition, {
                toValue: -168,
                duration: 500
            }),
            Animated.timing(this.state.opecity, {
                toValue: 1,
                duration: 500
            })
        ]).start();
    }
    
    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        //Animation Style
        let animationStylee = {
            transform: [{ translateY: this.state.yPosition }]
        }
        return (
            <ScrollView>
                <View style={styles.container}>

                    <StatusBar backgroundColor='#03004e' />

                    <View style={{ backgroundColor: '#3B227B', height: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <TouchableOpacity style={{ width: 60,height:50,justifyContent:'center' }} onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                                <Image source={require('../../asset/left-menu.png')}
                                    style={{ height: 20, width: 20, marginLeft: 12, padding: 10, }}
                                ></Image>
                            </TouchableOpacity>
                            <Text
                                style={{ color: 'white', fontSize: 20, marginLeft: 0, fontWeight: 'bold' }}>Home
                            </Text>
                        </View>
                        <TouchableOpacity style={{ marginRight: 10, }} onPress={this._onSearchPressed}>
                            <View style={{ marginRight: 10, }}>
                                <Image source={require('../../asset/serach-icon.png')}
                                    style={{ height: 20, width: 20 }}></Image>
                            </View>
                        </TouchableOpacity>
                        {/* SearchBox Implement */}
                        <Animated.View style={[styles.searchBarStyle, animationStylee]}>
                        <View style={{flexDirection:'row',width:screenWidth,justifyContent:'center'}}>
                           <TouchableOpacity style={{justifyContent:'center',marginLeft:7 }}
                                onPress={this.crossButtonClick}>
                                <Image source={require('../../asset/delete.png')}
                                    style={{ height: 15, width: 15,margin: 10, }}
                                    onPress={this.crossButtonClick} />

                            </TouchableOpacity>
                            <TextInput placeholder="Search."
                                underlineColorAndroid="transparent"
                                style={{
                                    height: 40,
                                    flex: 1,
                                    width: screenWidth,
                                    padding: 10,
                                    fontSize: 15,
                                    color: 'black',
                                }}
                            />
                            <TouchableOpacity style={{position: 'absolute',right:5 ,justifyContent:'center' }}
                                onPress={this.crossButtonClick.bind(this)}>
                                <Image source={require('../../asset/search_box.png')}
                                    style={{ height: 15, width: 15, margin: 10, }}
                                    onPress={this.crossButtonClick.bind(this)} />

                            </TouchableOpacity>
                            </View>
                        </Animated.View>
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
    searchBarStyle: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#00bfa5',
        bottom: 70,
        width:screenWidth,
    }

});