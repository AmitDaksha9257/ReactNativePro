import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, AppRegistry, ScrollView,
    Image, TextInput, Button, TouchableOpacity, StatusBar,
    Alert, ToastAndroid
} from 'react-native';

export default class Feedback extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#03004e' />

                <View style={{ backgroundColor: '#3B227B', height: 50, alignItems: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                        <Image source={require('../../asset/left-menu.png')}
                            style={{ height: 20, width: 20, marginLeft: 12, padding: 10 }}
                        ></Image>
                    </TouchableOpacity>
                    <Text
                        style={{ color: 'white', fontSize: 20, marginLeft: 15, fontWeight: 'bold' }}>Feedback</Text>
                </View>
                <View style={{ flexDirection: 'column', margin: 20, }}>
                    <TextInput
                        style={{ padding: 6, borderColor: 'black', borderWidth: 2, borderRadius: 8 }}
                        placeholder="Name"
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({ _Email: text })}
                    ></TextInput>
                    <TextInput
                        style={{ padding: 6, marginTop: 10, borderColor: 'black', borderWidth: 2, borderRadius: 8 }}
                        placeholder="Email"
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({ _Email: text })}
                    ></TextInput>

                    <TextInput
                        style={{ padding: 6, marginTop: 10, borderColor: 'black', borderWidth: 2, borderRadius: 8 }}
                        placeholder="Phone no"
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({ _Email: text })}
                    ></TextInput>

                    <TextInput
                        style={{ padding: 6, marginTop: 10, borderColor: 'black', borderWidth: 2, borderRadius: 8 }}
                        placeholder="Type here..."
                        multiline={true}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({ _Email: text })}
                    ></TextInput>
                    <TouchableOpacity style={{ marginTop: 10 }} >
                        <View style={styles.submitBtn}>
                            <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>
                                Submit
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
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
        justifyContent:'center',
        paddingTop:5,
        backgroundColor:'#3B227B',
        borderWidth: 2, 
        flexDirection:'row' 
      },


});