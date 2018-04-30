

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';
import Stars from 'react-native-stars';
import Spinner from 'react-native-loading-spinner-overlay';
import getDirections from 'react-native-google-maps-directions';
import { getPlacesDetails,googleApiKey } from '../../ServerApi/Server.js'
export default class DetailScreen extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            placeId: this.props.navigation.state.params.placeID,
            placeSearch: this.props.navigation.state.params.placeSearch,
            lat_lng: this.props.navigation.state.params.LatLng,
            PlaceDetails: [],
            PlaceReviews: [],
            visible: true,
            text: "Loading...",
            destinationLat: null,
            destinationLng: null,

        })
    }

    componentDidMount() {

        this.getSearchPlaceDetails();
        console.log("APIKEY_GOOGLE",googleApiKey)
    }
//Open googl map to get direction 
    getSearchPlaceDetails() {
        getPlacesDetails(this.state.placeId).then((result) => {

            if (result.status != "OK") {
                this.setState({
                    PlaceDetails: result.result,
                    PlaceReviews: result.result.reviews,
                    visible: this.state.visible,
                    text: "Exceed API Daily Limits"

                });
            } else {
                this.setState({
                    PlaceDetails: result.result,
                    PlaceReviews: result.result.reviews,
                    visible: !this.state.visible,
                    destinationLat: result.result.geometry.location.lat,
                    destinationLng: result.result.geometry.location.lng,

                });
            }

        })
    }

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


    render() {
        let photRefrence;
        let openingHourStatus;
        let PlaceTypeText;
        try {
            //Get Photo-Refrence
            let photo_refrence = this.state.PlaceDetails.photos.map((item, index) => {
                if (index == 0) {
                    this.photRefrence = item.photo_reference;
                    Console.log("Image_url", item.photo_reference)
                }
            })
            //Open Hours
            if (this.state.PlaceDetails.opening_hours.open_now == true) {
                this.openingHourStatus = "Open Now";
            } else {
                this.openingHourStatus = "Close Now"
            }
            //Getting Place Type
            let place_type = this.state.PlaceDetails.types.map((item, index) => {
            })

            // //Getting Place Reviews
            // let place_reviews=this.state.PlaceDetails.reviews.map((item,index)=>{
            //     console.log("Height",item.height);
            // })
        } catch (error) {
            console.log("ErrorMsg", error.message);
        }

        return (
            <ScrollView>
                <View style={{ flex: 1, flexDirection: 'column', }}>
                    <Spinner visible={this.state.visible} textContent={this.state.text}
                        textStyle={{ color: '#FFF' }}
                        cancelable={true} />
                    <View style={{
                        backgroundColor: '#3B227B', height: 50, alignItems: 'center',
                        justifyContent: 'space-between', flexDirection: 'row'
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Listing', { placeSearch: this.state.placeSearch, LatLng: this.state.lat_lng })}>
                                <Image source={require('../../asset/back-icon.png')}
                                    style={{ height: 18, width: 18, marginLeft: 12, margin: 10, }}
                                ></Image>
                            </TouchableOpacity>
                            <Text
                                style={{ color: 'white', fontSize: 20, marginLeft: 15, fontWeight: 'bold' }}>
                                Detail</Text>
                        </View>
                        <View style={{ marginRight: 10, }}>
                            {/* <Image source={require('../../asset/serach-icon.png')}
                                style={{ height: 20, width: 20 }}></Image> */}
                        </View>
                    </View>

                    <Image
                        source={{ uri: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + this.photRefrence + "&key="+googleApiKey }}
                        style={{ height: 220, }}></Image>

                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        padding: 10
                    }}>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ flex: 1, flexDirection: 'column', }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, }}>{this.state.PlaceDetails.name}</Text>

                                {/* <Text style={{ fontSize: 17, color: '#78909c' }}>Resturant</Text> */}
                            </View>
                            <Button style={{
                                fontSize: 15,
                                borderRadius: 7,
                                borderWidth: 2,
                                borderColor: '#00695c',
                                padding: 8,
                                marginTop: 8,
                                marginLeft: 8,
                                color: '#00695c',
                            }} onPress={() => this.handleGetDirections()}>
                                Get Direction
                        </Button>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 5,
                        }}>
                            <Text style={{
                                fontSize: 14,
                                marginRight: 5,
                                color: 'black',
                                marginBottom: 5,
                            }}>{this.state.PlaceDetails.rating}</Text>

                            <Stars
                                value={this.state.PlaceDetails.rating}
                                spacing={4}
                                starSize={16}
                                count={5}
                                disabled={true}
                                backingColor='#e8eded'
                                fullStar={require('../../asset/star.png')}
                                emptyStar={require('../../asset/empty_star.png')}
                                halfStar={require('../../asset/half_star.png')} style={{
                                    marginTop: 8,
                                    backgroundColor: "black  "
                                }} />
                        </View>


                        {/* <Text style={{
                            fontSize: 16, color: '#78909c',
                            marginTop: 5,                                  
                        }}>Rusticalliy decorated dining room with ethnic art and painted walls
                    Serving classic Pastun dishes.</Text> */}

                        <View style={{ flexDirection: 'column', marginTop: 5, }}>
                            <View style={{ flex: 1, flexDirection: 'row', marginRight: 15 }}>
                                <Text style={{ fontSize: 16, color: 'black' }}> Address: </Text>
                                <Text style={{
                                    fontSize: 16, color: '#455a64',
                                    marginRight: 45,
                                }}>{this.state.PlaceDetails.formatted_address}</Text>

                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16, color: 'black' }}>     Hours: </Text>
                                <Text style={{ fontSize: 16, color: '#455a64', }}>{this.openingHourStatus}</Text>

                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16, color: 'black' }}>    Phone: </Text>
                                <Text style={{ fontSize: 16, color: '#455a64', }}>{this.state.PlaceDetails.formatted_phone_number}</Text>

                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16, color: 'black' }}>     Order: </Text>
                                <Text style={{ fontSize: 16, color: 'blue', }}>{this.state.PlaceDetails.website}</Text>

                            </View>
                        </View>
                        <Text style={{ fontSize: 20, color: 'black', marginTop: 10 }}>Review Summary</Text>

                        {/* Flat List For Reviews of Pople */}

                        <FlatList
                            data={this.state.PlaceReviews}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ flexDirection: 'row', marginTop: 8, marginRight: 10 }}>
                                        <Image
                                            source={{ uri: item.profile_photo_url }}
                                            style={{ height: 60, width: 60, marginRight: 10, marginTop: 5 }}></Image>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={{ fontSize: 17, color: 'black' }}>{item.author_name}</Text>
                                            <Text style={{
                                                fontSize: 16, color: '#455a64',
                                                marginRight: 60,
                                                textAlign: 'left'
                                            }}>{item.text}</Text>
                                        </View>
                                    </View>
                                );
                            }
                            }
                            keyExtractor={(item, index) => item.author_name}
                        ></FlatList>

                    </View>
                </View>
            </ScrollView>

        );
    }
};