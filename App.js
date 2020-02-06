import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import AccountScreen from './src/screens/AccountScreen';
import SignInScreen from './src/screens/SignInScreen'; // no borrar
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import registerVisitor from './src/screens/registerVisitor';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen'; // no borrar

import { Provider as AuthProvider } from './src/context/AuthContext';

import { setNavigator } from './src/navigationRef';


// this part is the main navigator where if the user is logged is send to the menu, if not to the signin screen
const switchNavigator = createSwitchNavigator({
    //  ResolveAuth: ResolveAuthScreen,
    //  loginFlow: createStackNavigator({
    //    Signin: SignInScreen,
    //  }),
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
          visitorRegister: registerVisitor,
          TrackDetail: TrackDetailScreen,
          }),
          navigationOptions: {
            drawerLabel: "Registrar visitante"
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
    <AuthProvider>
      <App ref={(navigator) => { setNavigator(navigator) }}/>
    </AuthProvider>
  )
}
