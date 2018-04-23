

import React, { Component } from 'react';
import {
    View, Text, Image, StyleSheet, FlatList, ScrollView, TouchableOpacity, Alert,
    TouchableHighlight, ActivityIndicator, BackHandler
} from 'react-native';
import Button from 'react-native-button';
import Stars from 'react-native-stars';
import { NavigationActions } from 'react-navigation';
import ListingScreen from './Listing'
import getDirections from 'react-native-google-maps-directions';

import Spinner from 'react-native-loading-spinner-overlay';

export default class Listing extends Component {

    //Open GogleMap App whit source and destination 
    handleGetDirections = () => {
        const data = {

            destination: {
                latitude: this.state.destinationLat,
                longitude: this.state.destinationLng
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

    constructor(props) {
        super(props);

        console.log("LifeCycle", "constructor");
        console.log("TextFromScreen", this.props.navigation.state.params.placeSearch);
        this.state = ({
            searchName: this.props.navigation.state.params.placeSearch,
            lat_lng: this.props.navigation.state.params.LatLng,
            allPlacesGoogle: [],
            photoRef: [],
            placeId: null,
            destinationLat: null,
            destinationLng: null,
            visible: true,
            text: "Loading...",
            ratingVisblity: false,
        });
        console.log("DataFromScreen", this.state.searchName);
        console.log("DataFromScreen", this.state.lat_lng);

        //Handle Backpress here
        BackHandler.addEventListener('hardwareBackPress', function () {
            props.navigation.navigate("MyApp");
            return true;
        });

    }



    componentDidMount() {
        console.log("LifeCycle", "componentDidMount");
        if (this.state.searchName != null) {
            console.log("insidSearchName");
            this.fetchData();
        } else {
            Alert.alert("nullData");
        }
        

    }

    fetchData = async () => {
        console.log("FetchData");
        console.log("LatitudeLongitude", this.state.lat_lng);
        try {
            const response = await fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + this.state.lat_lng + "&radius=5000&keyword=" + this.state.searchName + "&key=AIzaSyBq2vZw0vfoiTSm2DypMQ6-odWpsJYLCEc");
            const json = await response.json();
            console.log("API_STATUS", json.status);
            if (json.status == "OK") {
                this.setState({
                    allPlacesGoogle: json.results,
                    visible: !this.state.visible,
                    navigationBarVisiblity: true,
                });

            } else if (json.status == "ZERO_RESULTS") {
                this.setState({
                    visible: !this.state.visible,
                    text: "No Result Found"
                });

                Alert.alert(
                    'Message',
                    'No Result Found',
                    [
                        { text: 'Ok', onPress: () => this.props.navigation.navigate("MyApp") }
                    ]
                );

            } else {
                this.setState({
                    visible: !this.state.visible,
                    text: "Exceed API Daily Limits"
                });

                Alert.alert(
                    'Message',
                    'Exceed API Daily Limits',
                    [
                        { text: 'Ok', onPress: () => this.props.navigation.navigate("MyApp") }
                    ]
                );


            }
        } catch (error) {
            console.error("ErrorAPI ", error);

        }
    }
    fetchImages() {
        //console.log("LocationDestination","ddd"+this.state.allPlacesGoogle.geometry.location.lng);
    }
    render() {
        console.log("LifeCycle", "render");
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        return (

            <View style={{ flex: 1, flexDirection: 'column', }}>

                <Spinner visible={this.state.visible} textContent={this.state.text}
                    textStyle={{ color: '#03004e' }}
                    cancelable={false} />

                {this.state.navigationBarVisiblity ? <View style={{
                    backgroundColor: '#3B227B', height: 50, alignItems: 'center',
                    justifyContent: 'space-between', flexDirection: 'row'
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("MyApp")}>
                            <Image source={require('../../asset/back-icon.png')}
                                style={{ height: 18, width: 18, marginLeft: 12, padding: 0, margin: 10, }}
                            ></Image>

                        </TouchableOpacity>
                        <Text
                            style={{ color: 'white', fontSize: 20, marginLeft: 15, fontWeight: 'bold' }}>Listing</Text>
                    </View>
                    <View style={{ marginRight: 10, }}>
                        {/* <Image source={require('../../asset/serach-icon.png')}
                            style={{ height: 20, width: 20 }}></Image> */}
                    </View>
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
                        var value = item.photos;
                        let photRefrence;
                        try {
                            var articles = item.photos.map((item, index) => {
                                this.photRefrence = item.photo_reference;
                            });

                            //Setting Destinatination lat and lng for google map app
                            this.setState({
                                destinationLat: item.geometry.location.lat,
                                destinationLng: item.geometry.location.lng,
                            })
                            let iteStr = JSON.stringify(item);
                            if (iteStr.includes('rating')) {
                                console.log("insidee");
                                this.setState({
                                    ratingVisblity: true,
                                })
                            } else {
                                console.log("outsidee");
                                this.setState({
                                    ratingVisblity: false,
                                })
                            }
                            //Invisible start rating when no rating available
                            // if(item.find('rating')){
                            //     console.log('RatingAvailable');
                            // }else{
                            //     console.log('Rating Not available');
                            // }
                        } catch (error) {
                            console.log("ErrorMsg", error.message);
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
                                        source={{ uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + this.photRefrence + '&key=AIzaSyBq2vZw0vfoiTSm2DypMQ6-odWpsJYLCEc' }}
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
                                            }} onPress={() => this.handleGetDirections()}>Get Direction</Button>
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
                    keyExtractor={(item, index) => item.rating}
                    keyExtractor={(item, index) => item.vicinity}
                    keyExtractor={(item, index) => item.photos}
                    keyExtractor={(item, index) => this.photRefrence}

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
    }

});
// export default function renderIf(condition, content) {
//     if (condition) {
//         return content;
//     } else {
//         return null;
//     }
// }

