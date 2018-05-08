import React, { Component } from 'react';
import { Text, View,TouchableOpacity,Image,ScrollView,StyleSheet,StatusBar,FlatList,BackHandler } from 'react-native';
        
const list=[
    {
        id:'1. ',
        text:'Type the place or category you are looking for like hotels, restaurants, corporates, banks, ATM etc.',
    },
    {
        id:'2. ',
        text:'Press Enter or click Search.',
    },
    {
        id:'3. ',
        text:'To get direction to place click on "Get Direction" button'
    },
    {
        id:'4. ',
        text:'To get detail of place click on "View Details" butto'
    },
    {
        id:'5. ',
        text:'You can search another place by clicking on Search Icon'
    },
]
export default class Help extends Component {
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
                    <TouchableOpacity style={{ width: 60,height:50,justifyContent:'center' }} 
                    onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                        <Image source={require('../../asset/left-menu.png')}
                            style={{ height: 20, width: 20, marginLeft: 12, padding: 10 }}
                        ></Image>
                    </TouchableOpacity>
                    <Text
                        style={{ color: 'white', fontSize: 20, marginLeft: 0, fontWeight: 'bold' }}>Help</Text>
                </View>
                <View style={{flexDirection:'column',marginLeft:10,marginRight:10}}>
                    <Text style={{fontSfontWeight:'bold',fontSize:22,color:'black',marginTop:10,}}>How it works:    </Text>
                    <View style={{ backgroundColor: '#7f7e82', height: 1,marginTop:10, }}></View>
       
                 
                <Text style={{ fontSize:15,color:'black',justifyContent:'center',marginTop:10, }}
                >Nearby app is the ideal companion!!!</Text>

                <Text style={{ fontWeight:'bold',fontSize:16,color:'black',marginTop:10, }}
                >How to find places nearby you.</Text>

                <View style={{ backgroundColor: '#7f7e82', height: 1,marginTop:5, }}></View>

                <FlatList
                data={list}
                renderItem={({item,index})=>{
                    console.log("DataHElp",JSON.stringify(item));
                        return(
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:15,color:'black',marginTop:10,fontWeight:'bold'}}>{item.id}</Text>
                                <Text style={{fontSize:15,color:'black',marginTop:10,}}>{item.text}</Text>
                            </View>
                        )
                }}></FlatList>
               
                </View>

                <Text style={{fontSize:16,color:'black',marginTop:15,marginLeft:5,
                }}>Use Nearby app to interact with what’s around you!!</Text>

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