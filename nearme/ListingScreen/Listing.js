

import React, { Component } from 'react';
import {
    View, Text, Image, StyleSheet, FlatList, ScrollView, TouchableOpacity, Alert, Keyboard, NetInfo, AppState,
    TouchableHighlight, ActivityIndicator, BackHandler, Animated, TextInput, Dimensions, ToastAndroid, Platform
} from 'react-native';
import Button from 'react-native-button';
import Stars from 'react-native-stars';
import { NavigationActions } from 'react-navigation';
import ListingScreen from './Listing'
import getDirections from 'react-native-google-maps-directions';
import Spinner from 'react-native-loading-spinner-overlay';

import { getAllPlaces, googleApiKey } from '../../ServerApi/Server.js'

let screenWidth = Dimensions.get('window').width;

export default class Listing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchName: this.props.navigation.state.params.placeSearch,
            lat_lng: this.props.navigation.state.params.LatLng,
            allPlacesGoogle: [],
            photoRef: [],
            placeId: null,
            visible: true,
            text: "Loading...",
            ratingVisblity: false,
            yPositionAni: new Animated.Value(0),
            opecity: new Animated.Value(0),
            serachText: null,
            status: false,
        }
        //Handle Backpress here
        BackHandler.addEventListener('hardwareBackPress', function () {
            AppState.removeEventListener('change', this.handleConnectionChange);
            props.navigation.navigate("MyApp");
            return true;
        });

    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);
        NetInfo.isConnected.fetch().done(
            (isConnected) => {
                this.setState({ status: isConnected });

                this.getAllNearByPlaces();
            }
        );
    }
    handleConnectionChange = (isConnected) => {
        this.setState({ status: isConnected });
    }
    //Get List of Nearby Places
    getAllNearByPlaces() {

        if (this.state.status) {
            const urlParams = {
                searchText: this.state.searchName,
                lat_lng: this.state.lat_lng,
            };
            getAllPlaces(urlParams).then((result) => {
                console.log("Status from server", result.status)
                if (result.status == "OK") {
                    this.setState({
                        allPlacesGoogle: result.results,
                        visible: !this.state.visible,
                        navigationBarVisiblity: true,
                    });
                } else if (result.status == "ZERO_RESULTS") {
                    this.setState({
                        visible: !this.state.visible,
                        text: "No Result Found"
                    });
                    this.alertMsg('No Result Found');
                } else {
                    this.setState({
                        visible: !this.state.visible,
                        text: "Exceed API Daily Limits"
                    });
                    this.alertMsg('Exceed API Daily Limits');
                }
            });

        } else {
            Alert.alert('', 'No Network Connection');
            this.setState({
                navigationBarVisiblity: true,
                visible: !this.state.visible,
            })
        }
    }

    alertMsg(message) {
        Alert.alert(
            'Message',
            message,
            [
                { text: 'Ok', onPress: () => this.props.navigation.navigate("MyApp") }
            ], {
                cancelable: false
            }
        );
    }
    //Go to next page
    navigateToScreen(name) {
        console.log("InSideNvigate");
        console.log("CurrentLat", this.state.lat_lng);

        if (this.state.lat_lng != null) {
            const navigateAction = NavigationActions.navigate({
                routeName: name,
                params: { placeSearch: this.state.serachText, LatLng: this.state.lat_lng }
            });
            this.props.navigation.dispatch(navigateAction);
        } else {
            if (Platform.OS === 'ios') {
                Alert.alert('', 'Your Loacation not found.');
            } else {
                ToastAndroid.show('Your Loacation not found.', ToastAndroid.SHORT);
            }
        }
    }
    //Open GogleMap App to get Direction 
    handleGetDirections = (lat1, lng1) => {
        const data = {

            destination: {
                latitude: lat1,
                longitude: lng1
            },
            params: [
                {
                    key: "travelmode",
                    value: "driving"        // may be "walking", "bicycling" or "transit" as well
                },
                {
                    key: "dir_action",
                    value: "navigate"       // this instantly initializes navigation using the given travel mode 
                }
            ]
        }

        getDirections(data)
    }


    //Sercbox open
    _onSearchPressed() {

        Animated.parallel([
            Animated.timing(this.state.yPositionAni, {
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
    crossSearchButtonClick() {
        Keyboard.dismiss();
        Animated.parallel([
            Animated.timing(this.state.yPositionAni, {
                toValue: -168,
                duration: 500
            }),
            Animated.timing(this.state.opecity, {
                toValue: 1,
                duration: 500
            })
        ]).start();
    }
    //After SerachGo Click 
    searchGoClick() {
        Keyboard.dismiss();
        if (this.state.status) {
            if (this.state.serachText != null) {
                this.navigateToScreen('Listing');
            } else {
                if (Platform.OS === 'ios') {
                    Alert.alert("Please Enter Text First.");
                } else {
                    ToastAndroid.show('Please Enter Text First.', ToastAndroid.SHORT);
                }
            }
        } else {

            Alert.alert('Message',
                'No Network Connection.',
                [
                    { text: 'Try Again', onPress: () => this.searchGoClick() }
                ],
            );
        }

    }



    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        let animationStylee = {
            transform: [{ translateY: this.state.yPositionAni }]
        }
        return (

            <View style={{ flex: 1, flexDirection: 'column', }}>

                <Spinner visible={this.state.visible} textContent={this.state.text}
                    textStyle={{ color: '#03004e' }}
                    cancelable={false} />

                {this.state.navigationBarVisiblity ? <View style={{
                    backgroundColor: '#3B227B', height: 50, alignItems: 'center',
                    justifyContent: 'space-between', flexDirection: 'row',
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ width: 50, justifyContent: 'center', marginLeft: 12 }}
                            onPress={() => this.navigateToScreen('MyApp')}>
                            <Image source={require('../../asset/back-icon.png')}
                                style={{ height: 18, width: 18, padding: 10, }}
                            ></Image>

                        </TouchableOpacity>
                        <Text
                            style={{ color: 'white', fontSize: 20, marginLeft: 0, fontWeight: 'bold' }}>Listing</Text>
                    </View>
                    <TouchableOpacity style={{ marginRight: 10, }} onPress={this._onSearchPressed.bind(this)}>
                        <View style={{ marginRight: 10, }}>
                            <Image source={require('../../asset/serach-icon.png')}
                                style={{ height: 20, width: 20, padding: 10, }}></Image>
                        </View>
                    </TouchableOpacity>

                    {/* SearchBox Implement */}
                    <Animated.View style={[styles.searchBarStyle, animationStylee]}>
                        <View style={{ flexDirection: 'row', width: screenWidth, justifyContent: 'center' }}>
                            <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 7 }}
                                onPress={this.crossSearchButtonClick.bind(this)}>
                                <Image source={require('../../asset/delete.png')}
                                    style={{ height: 15, width: 15, margin: 10, }} />

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
                                onChangeText={(text) => this.setState({ serachText: text })}
                            />
                            <TouchableOpacity style={{ position: 'absolute', right: 5, justifyContent: 'center' }}
                                onPress={this.searchGoClick.bind(this)}>
                                <Image source={require('../../asset/search_box.png')}
                                    style={{ height: 15, width: 15, margin: 10, }} />

                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View> : null}
                {/* Showing My Current Location tab */}
                {/* <View style={{
                    padding: 5,
                    flexDirection: 'row', marginBottom: 1,
                    justifyContent: 'space-between',
                    backgroundColor: '#F6F6F6'
                }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Image
                            source={require('../../asset/location-icon.png')}
                            style={{ width: 28, height: 28, margin: 2, marginLeft: 10, }}></Image>
                        <Text style={{
                            fontSize: 18, color: '#A3A3A3', marginTop: 7, marginLeft: 5,
                        }}>My Current Location</Text>
                    </View>
                    <Image source={require('../../asset/filter-icon.png')}
                        style={{ width: 28, height: 28, margin: 2, marginRight: 10, }}></Image>
                </View> */}
                {/* <View style={{ height: 1, backgroundColor: '#90a4ae' }}></View> */}
                <FlatList
                    data={this.state.allPlacesGoogle}
                    renderItem={({ item, index }) => {
                        // console.log('FlatListRenderMEthod')
                        var value = item.photos;
                        let photRefrence;

                        try {
                            var articles = item.photos.map((item, index) => {
                                this.photRefrence = item.photo_reference;
                            });
                        } catch (error) {
                            //console.log("ErrorMsg", error.message);
                        }



                        return (
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                marginTop: 3,
                            }}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    backgroundColor: 'white'
                                }}>
                                    <Image
                                        source={{ uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + this.photRefrence + '&key=' + googleApiKey }}
                                        style={{ width: 120, height: 120, margin: 5 }}></Image>

                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        height: 135,
                                        marginLeft: 5,
                                    }}>
                                        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>

                                        <View style={{ flexDirection: 'row', marginLeft: 2 }}>
                                            <Text style={styles.rating}>{item.rating}</Text>

                                            <Stars
                                                value={item.rating}
                                                spacing={4}
                                                starSize={16}
                                                count={5}
                                                disabled={true}
                                                fullStar={require('../../asset/star.png')}
                                                emptyStar={require('../../asset/empty_star.png')}
                                                halfStarphotos={require('../../asset/half_star.png')} style={{ marginTop: 8, }} />
                                        </View>


                                        <Text style={styles.address} numberOfLines={2}>{item.vicinity}</Text>

                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            height: 100,
                                            marginTop: 7,
                                            justifyContent: 'center',
                                        }}>
                                            <Button
                                                onPress={this.btnClick}
                                                style={{
                                                    fontSize: 14,
                                                    borderRadius: 3,
                                                    borderWidth: 2,
                                                    borderColor: '#00bfa5',
                                                    padding: 5,
                                                }}
                                                onPress={() => navigate('DetialScreen', { placeID: item.place_id, placeSearch: this.state.searchName, LatLng: this.state.lat_lng })}>
                                                View Details</Button>
                                             <Button style={{
                                                fontSize: 14,
                                                borderRadius: 3,
                                                borderWidth: 2,
                                                borderColor: '#4a148c',
                                                padding: 5,
                                                marginLeft: 10,
                                            }} onPress={() => this.handleGetDirections(item.geometry.location.lat, item.geometry.location.lng)}>Get Direction</Button>
                                                
                                        </View>
                                    </View>


                                </View>
                                <View style={{
                                    height: 0.5,
                                    backgroundColor: '#ffebee'
                                }}></View>

                            </View>
                        );
                    }
                    }
                    keyExtractor={(item, index) => item.name}

                ></FlatList>

            </View>
        );
    }
};
const styles = StyleSheet.create({

    name: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    address: {
        fontSize: 15,

    },
    rating: {
        fontSize: 14,
        marginRight: 5,
        color: 'black',
        marginBottom: 5,
    },
    myStarStyle: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    myEmptyStarStyle: {
        color: 'white',
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
        width: screenWidth
    }

});
// export default function renderIf(condition, content) {
//     if (condition) {
//         return content;
//     } else {
//         return null;
//     }
// }

