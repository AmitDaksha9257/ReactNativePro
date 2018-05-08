import { DrawerNavigator, DrawerItems } from 'react-navigation'
import Login from '../login/Login.js'
import Signup from '../signup/Signup.js'
import SideMenu from './SideMenu.js';
import Home from '../HomeScreen/Home.js'
import Feedback from '../FeedbackScreen/Feedback.js'
import AboutUs from '../AboutUsScreen/AboutUs.js';
import Help from '../HelpScreen/Help.js';
export const MyApp = DrawerNavigator({
  
  Home: {screen: Home},
  Feedback: {screen: Feedback},  
  AboutUs:{screen:AboutUs},
  Help:{screen:Help},
}, {
    initialRouteName: 'Home',
    contentComponent: SideMenu,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToogleRoute: 'DrawerToggle'
  })
