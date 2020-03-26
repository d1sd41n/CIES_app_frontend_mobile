import React, {useContext} from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator, AsyncStorage, Alert} from 'react-native';
import { Text, Input, Button, } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import Spacer from '../components/Spacer';
import { Context } from '../context/PostRequestContext';
import GetErrorMessages from "../variables/dataFieldNames";
import { Context as ExtraUtilContext} from '../context/ExtraUtilContext';

const registerVisitor = ({navigation}) => {
  const {state, postData, clearErrorMessage } = useContext(Context);
  const UtilContext = useContext(ExtraUtilContext);
  let qrHash = UtilContext.state.qrCodeHash;
  let deleteQr = UtilContext.deleteQrCodeHash;

  var radio_props = [
    {label: 'Entra', value: 1 },
    {label: 'Sale', value: 0 }
  ];

  return (
    <KeyboardAwareScrollView extraScrollHeight={100} enableOnAndroid={true} 
          keyboardShouldPersistTaps='handled'>
      <NavigationEvents 
        onWillBlur={clearErrorMessage}/>
      <Spacer>
      <Text h3>Escanear</Text>
      <Text style={styles.subtitleText}>Escanea el codigo Qr del objeto</Text>
      </Spacer>
      <View style={styles.radioButton}>
      <Text  style={styles.textRadio}>Accion</Text>
      <RadioForm
          radio_props={radio_props}
          initial={0}
          labelHorizontal={true}
          formHorizontal={false}
          onPress={(value) => {console.log("sss")}}
        />
      </View>
      <Spacer />
      {state.loading ?
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Registrando visitante</Text>
        </>
        : null}
      <Button
          buttonStyle={styles.buttonItems}
          title="Escanear Codigo Qr"
          onPress={() =>{navigation.navigate('BarCode');
          }}
        />
      <Spacer />
      <Input 
          inputStyle={styles.input}
          placeholder='Codigo Qr'
          disabled={true}
          autoCapitalize="none"
          value={qrHash}
          autoCorrect={false}
          />
        <Spacer />
      <Button
        title="Registrar Visitante"
        onPress={async () =>{
          let company_id = await AsyncStorage.getItem('company_id');
          postData({dni, first_name, last_name, email, phone},
                    url='/core/companies/' + company_id + '/visitors/')
                  }}
        >
      </Button>
      {state.errorMessage ? <GetErrorMessages data={state.errorMessage} />: null}
      {state.postSuccess ? <Text style={styles.postSuccess}>El visitante ha sido registrado con exito</Text>: null}

      </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  subtitleText: {
      color: "gray"
  },
  textRadio: {
    fontSize: 20,
    marginBottom: 10
},
  radioButton: {
    marginLeft: 20,
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