import React, {useState, useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Picker, AsyncStorage} from 'react-native';
import { Text, Input, Button} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';

import Spacer from '../components/Spacer';
import { Context as PostContex} from '../context/PostRequestContext';
import { Context as QrCodeScannerContext} from '../context/QrCodeScannerContext';
import { Context as GetDataContext} from '../context/GetDataContext';
import GetErrorMessages from "../variables/dataFieldNames"

const ItemRegister = ({navigation}) => {
  const {state, postData, clearErrorMessage } = useContext(PostContex);
  const QrContext = useContext(QrCodeScannerContext);
  const GetContext = useContext(GetDataContext);
  let qrHash = QrContext.state.qrCodeHash;

  console.log("GetContext");
  console.log(GetContext);

  useEffect(() => {
    GetContext.getData();
    console.log("wsssssdsdd")
  }, []);

  // https://snack.expo.io/@lfkwtz/react-native-picker-select
  //https://www.npmjs.com/package/react-native-picker-select

  const placeholder = {
    label: 'Select a sport...',
    value: null,
    color: '#9EA0A4',
  };

    return (
    <View >
        <Spacer>
        <Text h3>Registrar Objeto</Text>
        <Text style={styles.subtitleText}>Todos los campos exepto telefono son obligatorios</Text>
        </Spacer>

        <Button
          buttonStyle={{backgroundColor: 'black'}}
          title="Escanear Codigo Qr"
          onPress={() =>{navigation.navigate('BarCode');
          }}
        />

        <Input 
          inputStyle={styles.input}
          placeholder='Codigo Qr'
          disabled={true}
          autoCapitalize="none"
          value={qrHash}
          autoCorrect={false}
          />

          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            placeholder={placeholder}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
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