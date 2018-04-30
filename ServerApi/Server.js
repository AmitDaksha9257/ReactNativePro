
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';

const googleApiKey = 'AIzaSyBq2vZw0vfoiTSm2DypMQ6-odWpsJYLCEc'
const apiLoginUser = 'http://182.74.91.253/F-J/in_house/api/login';
const apiSignUpUser = 'http://182.74.91.253/F-J/in_house/api/signup';
const apiFeedbackUser = 'http://182.74.91.253/F-J/in_house/api/sendFeedback';
const apiGoogleFindPlaces = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
const apiGooglePlaceDetails='https://maps.googleapis.com/maps/api/place/details/json?placeid='
//LoginUser
async function loginUser(params) {
    try {
        let response = await fetch(apiLoginUser, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        let responseJson = await response.json();
        console.log("responsePrint", responseJson);
        return responseJson;
    } catch (error) {
        console.error(`Error is : ${error}`);
    }

}

//Sign Up User
async function signupUser(params) {
    try {
        let response = await fetch(apiSignUpUser, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        let responseJson = await response.json();
        console.log("SignUpResponsePrint", responseJson);
        return responseJson;
    } catch (error) {
        console.error(`Error is : ${error}`);
    }
}

//Send Feedback Function 
async function feedbackUser(params) {
    try {
        let response = await fetch(apiFeedbackUser, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        let responseJson = await response.json();
        console.log("FeedbackFormResponse", responseJson);
        return responseJson;
    } catch (error) {
        console.log(`Error is : ${error}`);
    }

}

//Get All Placeses
async function getAllPlaces(params) {
    const response = await fetch(apiGoogleFindPlaces + params.lat_lng + "&rankby=distance&keyword=" + params.searchText + "&key=" + googleApiKey);
    const json = await response.json();
    return json;
}

//Getting Places Details
async function getPlacesDetails(params){
    const response = await fetch(apiGooglePlaceDetails + params+ "&key="+googleApiKey);
    const json = await response.json();
    return json;
}

export { loginUser };
export { signupUser };
export { feedbackUser };
export { getAllPlaces };
export {getPlacesDetails};
export {googleApiKey};

//*************Common Function ***************//
//Navigate to Next Screen
function navigateToScreen(name, props) {
    console.log("InSideNvigate");
    console.log("InSideNvigate", name);

    const navigateAction = NavigationActions.navigate({
        routeName: name,
    });
    props.navigation.dispatch(navigateAction);
}

export { navigateToScreen };