import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import AccountScreen from './src/screens/AccountScreen';
import SignInScreen from './src/screens/SignInScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import registerVisitorScreen from './src/screens/registerVisitorScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import RegisterItemScreen from './src/screens/RegisterItemScreen';
import BarCodeReaderScreen from './src/screens/BarCodeReaderScreen';

import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as PostRequestProvider } from './src/context/PostRequestContext';

import { setNavigator } from './src/navigationRef';


// this part is the main navigator where if the user is logged is send to the menu, if not to the signin screen
const switchNavigator = createSwitchNavigator({
     ResolveAuth: ResolveAuthScreen,
     loginFlow: createStackNavigator({
       Signin: SignInScreen,
     }),
    mainFlow: createDrawerNavigator({
      userScreen: {
        screen: createStackNavigator({
          accountScreen: AccountScreen,
          }),
          navigationOptions: {
            drawerLabel: "Mi perfil"
          }
        },
        visitorRegister: {
          screen: createStackNavigator({
            visitorRegister: registerVisitorScreen,
            TrackDetail: TrackDetailScreen,
            }),
            navigationOptions: {
              drawerLabel: "Registrar visitante"
            }
        },
        itemRegister: {
          screen: createStackNavigator({
            itemRegister: RegisterItemScreen,
            BarCode: BarCodeReaderScreen,
            }),
            navigationOptions: {
              drawerLabel: "Registrar Objeto"
            }
        },
      },{
        initialRouteName: 'visitorRegister',
      }
    ),
});


const App = createAppContainer(switchNavigator);


export default() => {
  return(
    <PostRequestProvider>
      <AuthProvider>
        <App ref={(navigator) => { setNavigator(navigator) }}/>
      </AuthProvider>
    </PostRequestProvider>
  )
}
