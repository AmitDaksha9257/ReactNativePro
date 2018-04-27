
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';

const googleApiKey='AIzaSyBq2vZw0vfoiTSm2DypMQ6-odWpsJYLCEc'
const apiLoginUser='http://182.74.91.253/F-J/in_house/api/login';
const apiSignUpUser='http://182.74.91.253/F-J/in_house/api/signup';
const apiFeedbackUser='http://182.74.91.253/F-J/in_house/api/sendFeedback';
const apiGoogleFindPlaces='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='

//LoginUser
async function loginUser(params) {
    try{
        let response=await fetch(apiLoginUser,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(params)
        });
        let responseJson=await response.json();
        console.log("responsePrint",responseJson);
        return responseJson;
    }catch(error){
        console.error(`Error is : ${error}`);
    }
    
}

//Sign Up User
async function signupUser(params){
    try{
        let response=await fetch(apiSignUpUser,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(params)
        });
        let responseJson=await response.json();
        console.log("SignUpResponsePrint",responseJson);
        return responseJson;
    }catch(error){
        console.error(`Error is : ${error}`);
    }
}

//Send Feedback Function 
async function feedbackUser(params){
    try{
        let response=await fetch(apiFeedbackUser,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(params)
        });
        let responseJson=await response.json();
        console.log("FeedbackFormResponse",responseJson);
        return responseJson;
    }catch(error){
        console.log(`Error is : ${error}`);
    }
    
}

//Get All Placeses
async function getAllPlaces(params){
    console.log('Parameters',JSON.stringify(params));
    console.log('Parameters',params);
    console.log('ParametersTEXT',params.searchText);
    console.log('Parameterslat_lng',params.lat_lng);

    const response = await fetch(apiGoogleFindPlaces + params.lat_lng+ "&rankby=distance&keyword=" + params.searchText + "&key="+googleApiKey);
     const json = await response.json();
     return json;
}

export {loginUser};
export{signupUser};
export{feedbackUser};
export{getAllPlaces};


//*************Common Function ***************//
//Navigate to Next Screen
function navigateToScreen(name,props) {
    console.log("InSideNvigate");
    console.log("InSideNvigate",name);
    
    const navigateAction = NavigationActions.navigate({
        routeName: name,
    });
    props.navigation.dispatch(navigateAction);
}

export {navigateToScreen};