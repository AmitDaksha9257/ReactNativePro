import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, StyleSheet, StatusBar, FlatList,BackHandler } from 'react-native';

const list = [
    {
        id: '- ',
        text: "Works fast and easy to use search categories",
    },
    {
        id: '- ',
        text: " Find your nearby location's complete details (Address, rating, distance etc.)",
    },
    {
        id: '- ',
        text: "Display search results in a specific way"
    },
    {
        id: '- ',
        text: "Shows directions to reach your nearby places"
    },
    {
        id: '- ',
        text: "Helps you to find multiple categories nearby you"
    },
]

export default class AboutUs extends Component {
    constructor(props) {
        super(props);
        //Back Press
        BackHandler.addEventListener('hardwareBackPress', function () {
            // Alert.alert("Bacl");
             props.navigation.navigate("Home");
            return true;
        });
    }
    render() {
        return (
            <ScrollView >
                <View style={styles.container}>
                    <StatusBar backgroundColor='#03004e' />

                    <View style={{ backgroundColor: '#3B227B', height: 50, alignItems: 'center', flexDirection: 'row' }}>
                        <TouchableOpacity style={{ width: 60, height: 50, justifyContent: 'center' }}
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Image source={require('../../asset/left-menu.png')}
                                style={{ height: 20, width: 20, marginLeft: 12, padding: 10 }}
                            ></Image>
                        </TouchableOpacity>
                        <Text
                            style={{ color: 'white', fontSize: 20, marginLeft: 0, fontWeight: 'bold' }}>About Us</Text>
                    </View>
                    <View style={{ flexDirection: 'column', marginLeft: 10, marginRight: 10 }}>
                        <Text style={{ fontSfontWeight: 'bold', fontSize: 22, color: 'black', marginTop: 10, }}>Fast - Easy - Accurate!!!</Text>
                        <View style={{ backgroundColor: '#7f7e82', height: 1, marginTop: 10, }}></View>

                        <Text style={{
                            fontSize: 15, color: 'black', justifyContent: 'center', marginTop: 10,
                        }}>Nearby is an app helps you to find out nearby places such as (Banks, ATM's, Hospitals, Food Corners, cafes etc.) It shows places near to your location based on your search. It allows you to easily discover the location details in real-time,  A Nearby Search lets you search for places within a specified area. You can refine your search request as per your interest. </Text>

                        <Text style={{ fontSize: 15, color: 'black', justifyContent: 'center', marginTop: 10, fontWeight: 'bold' }}
                        >Following are Distinctive Attributes:</Text>
                        <View style={{ backgroundColor: '#7f7e82', height: 1, marginTop: 10, }}></View>

                        <FlatList
                            data={list}
                            renderItem={({ item, index }) => {
                                console.log("DataHElp", JSON.stringify(item));
                                return (
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 15, color: 'black', marginTop: 10, fontWeight: 'bold' }}>{item.id}</Text>
                                        <Text style={{ fontSize: 15, color: 'black', marginTop: 10, }}>{item.text}</Text>
                                    </View>
                                )
                            }}></FlatList>
                    </View>
                </View>
            </ScrollView >
        );
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,

    },

});