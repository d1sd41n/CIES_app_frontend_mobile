import React, {useState, useContext} from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator, AsyncStorage, Alert} from 'react-native';
import { Text, Input, Button} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';

import Spacer from '../components/Spacer';
import { Context as PostContex} from '../context/PostRequestContext';
import { Context as QrCodeScannerContext} from '../context/QrCodeScannerContext';
import GetErrorMessages from "../variables/dataFieldNames"

const ItemRegister = ({navigation}) => {
  const {state, postData, clearErrorMessage } = useContext(PostContex);
  const QrContext = useContext(QrCodeScannerContext);

  console.log("QrCodeScannerContext: ")
  console.log(QrContext)

    return (
    <View >
        <Spacer>
        <Text h3>Registrar Objeto</Text>
        <Text style={styles.subtitleText}>Todos los campos exepto telefono son obligatorios</Text>
        </Spacer>

        <Input 
          inputStyle={styles.input}
          label='Codigo Qr'
          placeholder='Codigo Qr'
          disabled={true}
          // onChangeText={(newDni) => setDni(newDni)}
          autoCapitalize="none"
          autoCorrect={false}
          />
        <Button
        title="Escanear Codigo Qr"
        onPress={() =>{navigation.navigate('BarCode');
                  }}
        />

    </View>
    );
}

const styles = StyleSheet.create({
  subtitleText: {
      color: "gray"
  },
  errorMessage: {
    fontSize: 16,
    color: 'red'
  },
  input: {
    marginTop: 10,
    marginHorizontal: 3
  },
  loadingText: {
    color: "blue",
    textAlign: 'center'
  },
  postSuccess: {
    color: "green",
    textAlign: 'center'
  },
});

ItemRegister.navigationOptions = ({navigation}) => {
  return {
  headerTitle: 

    <View style={{flex: 1, flexDirection: 'row', marginLeft: 16}}>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.openDrawer()}>
        <Ionicons name='ios-menu' size={30} />
      </TouchableOpacity>
  </View>
  }
};

export default ItemRegister;