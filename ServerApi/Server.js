
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';

const apiLoginUser='http://182.74.91.253/F-J/in_house/api/login';
const apiSignUpUser='http://182.74.91.253/F-J/in_house/api/signup';

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
    console.log("InsideSignUpServer");
    console.log("SignUpUserJson",JSON.stringify(params));
    console.log("SignUpUser",params);
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


export {loginUser};
export{signupUser};

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