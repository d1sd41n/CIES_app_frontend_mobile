import React, {useContext, useState} from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator, AsyncStorage, Alert} from 'react-native';
import { Text, Button, } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';

import Spacer from '../components/Spacer';
import { Context } from '../context/PostRequestContext';
import GetErrorMessages from "../variables/dataFieldNames";

const registerVisitor = ({navigation}) => {
  const {state, postData, clearErrorMessage } = useContext(Context);

  var radio_props = [
    {label: 'Entra', value: 1 },
    {label: 'Sale', value: 2 }
  ];

  const  onWillBlur = () => {
    clearErrorMessage()
  }

  return (
    <View>
      <NavigationEvents 
          onWillBlur={onWillBlur}/>
      <Spacer>
      <Text h3 style={styles.titleText}>Buscar Objeto</Text>
      <Text style={styles.subtitleText}>Selecciona la opcion de busqueda presionando un boton</Text>
      </Spacer>
      <Button
            buttonStyle={styles.buttonItems}
            title="Buscar por visitante"
            onPress={() =>{
              navigation.navigate('visitorListItem');
            }}
          />
        <Spacer/>
        <Button
            buttonStyle={styles.buttonItems}
            title="Escanear codigo Qr"
            onPress={() =>{
              clearErrorMessage()
              deleteQr()
            }}
          />
      </View>
  );
}

const styles = StyleSheet.create({
  subtitleText: {
    color: "gray",
  },
   buttonItems:  {
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: 'black'
   },
});

registerVisitor.navigationOptions = ({navigation}) => {
  return {
  headerTitle: 

    <View style={{flex: 1, flexDirection: 'row', marginLeft: 16}}>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.openDrawer()}>
        <Ionicons name='ios-menu' size={30} />
      </TouchableOpacity>
  </View>
  }
};

export default registerVisitor;