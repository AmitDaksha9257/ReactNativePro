import { DrawerNavigator, DrawerItems } from 'react-navigation'
import Login from '../login/Login.js'
import Signup from '../signup/Signup.js'
import SideMenu from './SideMenu.js';
import Home from '../HomeScreen/Home.js'

export const MyApp = DrawerNavigator({
  
  Home: {
    screen: Home
  },
  
 
}, {
   
    
    initialRouteName: 'Home',
    contentComponent: SideMenu,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToogleRoute: 'DrawerToggle'
  })
