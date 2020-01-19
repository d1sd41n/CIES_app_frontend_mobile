import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AccountScreen from './src/screens/AccountScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';

import { Provider as AuthProvider } from './src/context/AuthContext';

import { setNavigator } from './src/navigationRef';

// this part is the main navigator where if the user is logged is send to the menu, if not to the signin screen
const switchNavigator = createSwitchNavigator({
    ResolveAuth: ResolveAuthScreen,
    loginFlow: createStackNavigator({
      Signin: SignInScreen,
    }),
    mainFlow: createBottomTabNavigator({
      trackListFlow: createStackNavigator({
        TrackList: TrackListScreen,
        TrackDetail: TrackDetailScreen,
      }),
      CreateTrack: TrackCreateScreen,
      AccountScreen: AccountScreen,
    }),
});


const App = createAppContainer(switchNavigator);


export default() => {
  return(
    <AuthProvider>
      <App ref={(navigator) => { setNavigator(navigator) }}/>
    </AuthProvider>
  )
}
