import { DrawerNavigator, DrawerItems } from 'react-navigation'
import Login from '../login/Login.js'
import Signup from '../signup/Signup.js'
import SideMenu from './SideMenu.js';
import Home from '../HomeScreen/Home.js'
import Feedback from '../FeedbackScreen/Feedback.js'
export const MyApp = DrawerNavigator({
  
  Home: {screen: Home},
  Feedback: {screen: Feedback},  
 
}, {
    initialRouteName: 'Home',
    contentComponent: SideMenu,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToogleRoute: 'DrawerToggle'
  })
