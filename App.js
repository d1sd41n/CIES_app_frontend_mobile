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
import VisitorsListScreen from './src/screens/VisitorsListScreen';
import RecordsScreen from './src/screens/recordsScreen';
import scannerScreen from './src/screens/scannerScreen';
import searchItemScreem from './src/screens/searchItemScreem';
import visitorsListScreenItems from './src/screens/visitorsListItemScreen';
import visitorItemsScreen from './src/screens/visitorItemsScreem';
import editItemScreen from './src/screens/editItemScreen';
import searchItemByQRScreen from './src/screens/searchItemByQRScreen';


import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as PostRequestProvider } from './src/context/PostRequestContext';
import { Provider as ExtraUtilContext } from './src/context/ExtraUtilContext';
import { Provider as GetDataProvider } from './src/context/GetDataContext';
import { Provider as PutPatchDataProvider } from './src/context/PutPatchDataContext';

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
        searchItems: {
          screen: createStackNavigator({
            searchItem: searchItemScreem,
            visitorListItem: visitorsListScreenItems,
            visitorItems: visitorItemsScreen,
            editItem: editItemScreen,
            searchByQr: searchItemByQRScreen,
            }),
            navigationOptions: {
              drawerLabel: "Buscar objeto"
            }
        },
        scanner: {
          screen: createStackNavigator({
            scanner1: scannerScreen,
            }),
            navigationOptions: {
              drawerLabel: "Escanear entrada o salida"
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
            VisitorList: VisitorsListScreen,
            }),
            navigationOptions: {
              drawerLabel: "Registrar Objeto"
            }
        },
        seeRecords: {
          screen: createStackNavigator({
            recordScreen: RecordsScreen,
            }),
            navigationOptions: {
              drawerLabel: "Ver historial"
            }
        },
        // searchItemBuVisitor: {
        //   screen: createStackNavigator({
        //     visitorListItem: visitorsListScreenItems,
        //     visitorItems: visitorItemsScreen,
        //     }),
        //     navigationOptions: {
        //       drawerLabel: "Buscar objeto por Visitante"
        //     }
        // },
      },{
        initialRouteName: 'visitorRegister',
      }
    ),
});


const App = createAppContainer(switchNavigator);


export default() => {
  return(
    <PutPatchDataProvider>
      <GetDataProvider>
        <ExtraUtilContext>
          <PostRequestProvider>
            <AuthProvider>
              <App ref={(navigator) => { setNavigator(navigator) }}/>
            </AuthProvider>
          </PostRequestProvider>
        </ExtraUtilContext>
      </GetDataProvider>
    </PutPatchDataProvider>
  )
}
