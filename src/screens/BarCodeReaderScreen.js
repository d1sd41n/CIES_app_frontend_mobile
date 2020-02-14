import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


import { Context as QrCodeScannerContext} from '../context/QrCodeScannerContext';


export default function BarCodeReader({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const {state, saveQrCodeHash }  = useContext(QrCodeScannerContext);

  console.log(state)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // console.log("tipo de barra: ");
    // console.log(type);
    // console.log("datos: ");
    // console.log(data);
    saveQrCodeHash(data);
    // navigation.navigate('itemRegister')
  };

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
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
      />

      <Text style={styles.text}>Apunta con la camara al codigo QR</Text>
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'white',
    textAlign: 'center',
  },
});