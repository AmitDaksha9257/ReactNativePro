import {
    Platform,
    StyleSheet,
    Text,
    View, AppRegistry, Dimensions
  } from 'react-native';
  
  var { height } = Dimensions.get('window');
  
  export const topBar = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'green',
      padding: 25,
      height: height
  
    },
  
    
  });
  