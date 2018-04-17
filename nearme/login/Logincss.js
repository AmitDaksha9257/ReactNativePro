import {
  Platform,
  StyleSheet,
  Text,
  View, AppRegistry, Dimensions, PixelRatio
} from 'react-native';

var { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B227B',
    padding: 25,
    height: height

  },

  ImageLogo: {
    height: 100,
    width: 100,
    marginTop: 30,
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 50,
    borderColor: '#F44336',
  },

  buttonView: {
    borderRadius: 12,
    backgroundColor: 'gray',
    alignItems: 'center', height: 40,
    justifyContent: 'center', borderWidth: 1,
  },

  editTextPro: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 40,
    marginTop: 15
  },

  socialLoginBtnView: {
    flexDirection: 'row',
    backgroundColor: '#0565c9',
    height: 40,
    borderRadius: 12,
    marginTop: 20
  },
  socialLoginBtnImage: {
    height: 25,
    width: 25,
    alignSelf: 'center',
    marginLeft: 15
  },

  socialLoginBtnText:
    {
      flex: 1,
      alignSelf: 'center',
      color: 'white',
      textAlign: 'center',
      marginRight: 25
    },

  ImageContainer: {
    borderRadius: 10,
    width: 250,
    height: 250,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDDC39',

  },


});
