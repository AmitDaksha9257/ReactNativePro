

import React, { Component } from 'react';
import {View, Text,Image,StyleSheet,TextInput,Dimensions,ScrollView,TouchableHighlight,AppState,
    Platform,TouchableOpacity,Alert,PermissionsAndroid,StatusBar,ToastAndroid,BackHandler,NetInfo
    } from 'react-native';
import Button from 'react-native-button';
import { learnColour } from '../../asset/left-menu.png';
import { NavigationActions } from 'react-navigation';

import SplashScreen from 'react-native-splash-screen';

let screenWidth = Dimensions.get('window').width;

export default class Home extends Component {

     //Check Input Text for empty or not
     CheckTextInputIsEmptyOrNot() {
        if(this.state.status){
        if (this.state.typedText != '') {

            this.navigateToScreen('Listing');
        } else {
            if(Platform.OS==='ios'){
                Alert.alert('', 'Please enter text');
            }else{
                ToastAndroid.show('Please enter text first', ToastAndroid.SHORT);
            }
            //Alert.alert('', 'Please enter text');
        }
    }else{
        Alert.alert('Message',
        'No Network Connection.',
        [
            {text:'Try Again',onPress:()=> this.getLocationPermissions() }
        ],
    );
    }
    }
    
    //Navigate to Next Screen
    navigateToScreen(name) {
        if (this.state.lat_lng != null) {


            const navigateAction = NavigationActions.navigate({
                routeName: name,
                params: { placeSearch: this.state.typedText, LatLng: this.state.lat_lng }
            });
            this.props.navigation.dispatch(navigateAction);
        } else {
            if(Platform.OS==='ios'){
                Alert.alert('', 'Your Loacation not found.');
            }else{
                ToastAndroid.show('Your Loacation not found.', ToastAndroid.SHORT);
            }
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
            status:false
        };
        //Handle BackPress
        BackHandler.addEventListener('hardwareBackPress', function () {

            AppState.removeEventListener('change', this.handleConnectionChange);
            return true;
        });

    }

    componentDidMount() {
        SplashScreen.hide();
        NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);

        NetInfo.isConnected.fetch().done(
            (isConnected)=>{
                this.setState({status:isConnected});

                this.getLocationPermissions();
            }
        );

        
    }
    handleConnectionChange=(isConnected)=>{
        this.setState({status:isConnected});
        if(!isConnected){
            Alert.alert('','We Lost Connection.');
        }

    }
    componentWillUnmount() {
        console.log('ListScreenUnMouunt');
        NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange);
      }
    // Check Location Permission
    async getLocationPermissions() {
        console.log("getLocationPermission" ,this.state.status);
        if(this.state.status){
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
    }else{
        Alert.alert('Message',
            'No Network Connection.',
            [
                {text:'Try Again',onPress:()=> this.getLocationPermissions() }
            ],
            {cancelable: false}
        );
    }
    }

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
                            <TouchableOpacity style={{ width: 60, height: 50, justifyContent: 'center' }}
                             onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                                <Image source={require('../../asset/left-menu.png')}
                                    style={{ height: 20, width: 20, marginLeft: 12, padding: 10, }}
                                ></Image>
                            </TouchableOpacity>
                            <Text
                                style={{ color: 'white', fontSize: 20, marginLeft: 0, fontWeight: 'bold' }}>Home
                            </Text>
                        </View>
                        {/* <TouchableOpacity style={{ marginRight: 10, }} onPress={this._onSearchPressed}>
                            <View style={{ marginRight: 10, }}>
                                <Image source={require('../../asset/serach-icon.png')}
                                    style={{ height: 20, width: 20 }}></Image>
                            </View>
                        </TouchableOpacity> */}

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
        width: screenWidth,
    }

});