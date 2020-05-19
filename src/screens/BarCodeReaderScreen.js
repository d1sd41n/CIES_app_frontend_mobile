import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, Alert  } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NavigationEvents } from 'react-navigation';


import { Context as ExtraUtilContext} from '../context/ExtraUtilContext';


export default function BarCodeReader({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const {state, saveQrCodeHash, setTypeScan, deleteQrCodeHash}  = useContext(ExtraUtilContext);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`EL codigo: ${data} se ha escaneado!`);
    saveQrCodeHash(data);
    if (state.typeScan == 1)
      navigation.navigate('itemRegister');
    else if(state.typeScan == 2)
      navigation.navigate('scanner1');
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Escanear Codigo Qr",
      "Pulse en Ok para escanear",
      [
        { text: "OK", onPress: () => setScanned(false)}
      ],
      { cancelable: false }
    );

  if (hasPermission === null) {
    return <Text>Solicitando permiso para usar la camara</Text>;
  }
  if (hasPermission === false) {
    return <Text>no hay acceso o permisos para usar la camara</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <NavigationEvents 
          onWillBlur={setTypeScan}
          onWillFocus={deleteQrCodeHash}/>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
      />

      {scanned ?
        <Button title={'Toca para escanear otra vez'} onPress={() => setScanned(false)}/>
      :<Text style={styles.text}>Apunta con la camara al codigo QR</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'white',
    textAlign: 'center',
  },
  button: {
    marginTop: 20
  },
});