import React, {useContext, useState} from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator, AsyncStorage, Alert} from 'react-native';
import { Text, Input, Button, } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';
import RadioForm from 'react-native-simple-radio-button';

import Spacer from '../components/Spacer';
import { Context } from '../context/PostRequestContext';
import GetErrorMessages from "../variables/dataFieldNames";
import { Context as ExtraUtilContext} from '../context/ExtraUtilContext';

const registerVisitor = ({navigation}) => {
  const {state, postData, clearErrorMessage } = useContext(Context);
  const [go_in, setGo_in] = useState('');


  const UtilContext = useContext(ExtraUtilContext);
  let qrHash = UtilContext.state.qrCodeHash;
  let deleteQr = UtilContext.deleteQrCodeHash;

  var radio_props = [
    {label: 'Entra', value: 1 },
    {label: 'Sale', value: 2 }
  ];

  const  onWillBlur = () => {
    clearErrorMessage()
    deleteQr()
  }


  const  isUUID = ( uuid ) => {
    let s = "" + uuid;

    s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    if (s === null) {
      return false;
    }
    return true;
  }

  if (state.postSuccess) {
    let name = state.data["owner_first_name"] + " " + state.data["owner_last_name"]
    let dni = state.data["owner_dni"]
    let brand = state.data["brand"]
    let color = state.data["color"]
    let go_in = state.data["go_in"]
    let lost = state.data["lost"]
    let type = state.data["type"]

    return (
      <View style={styles.listElem}>
        <NavigationEvents 
          onWillBlur={onWillBlur}/>
        <Spacer>
        <Text style={styles.postSuccess}>Registro guardado con exito</Text>
        </Spacer>
        <Text style={styles.subtitleText}>Datos sobre el objeto:</Text>
        <Spacer />
        <Text style={styles.listElemText}>Nombre propietario: {name}</Text>
        <Text style={styles.listElemText}>Cedula: {dni}</Text>
        <Text style={styles.listElemText}>Tipo: {type}</Text>
        <Text style={styles.listElemText}>Marca de objeto: {brand}</Text>
        <Text style={styles.listElemText}>Color de objeto: {color}</Text>
        {go_in  ? 
          <Text style={styles.entra}>Accion: Entra</Text>
        : <Text style={styles.sale}>Accion: Sale</Text>}
        {lost  ? 
          <Text style={styles.lost}>Atencion, este item se encuentra reportado como objeto perdido</Text>
        : null}
        <Spacer />
        <Button
            buttonStyle={styles.buttonItems}
            title="Escanear Otro Item"
            onPress={() =>{
              clearErrorMessage()
              deleteQr()
            }}
          />
      </View>
    )
  }
  return (
    <View>
      <NavigationEvents 
          onWillBlur={onWillBlur}/>
      <Spacer>
      <Text h3>Escanear</Text>
      <Text style={styles.subtitleText}>Escanea el codigo Qr del objeto</Text>
      </Spacer>
      <View style={styles.radioButton}>
      <Text  style={styles.textRadio}>Accion</Text>
      <RadioForm
          radio_props={radio_props}
          initial={-1}
          labelHorizontal={true}
          formHorizontal={false}
          onPress={(value) => {setGo_in(value)}}
        />
      </View>
      <Spacer />
      {state.loading ?
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Registrando el transito de este item</Text>
        </>
        : null}
      <Button
          buttonStyle={styles.buttonItems}
          title="Escanear Codigo Qr"
          onPress={() =>{
            UtilContext.setTypeScan(2);
            navigation.navigate('BarCode');
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
        title="Registrar"
        onPress={async () =>{
          let action = false;
          let user_id = await AsyncStorage.getItem('user_id');
          let company_id = await AsyncStorage.getItem('company_id');
          let seat_id = await AsyncStorage.getItem('seat_id');
          if(!isUUID(qrHash)){
            Alert.alert(
              'Atencion', 'Porfavor escanee un codigo qr valido'
           )
          }
          else if(go_in != 1 && go_in != 2){
            Alert.alert(
              'Atencion', 'Porfavor seleccione una accion'
           )
          }
          else{
            if(go_in == 1){
              action = true;
            }
          postData({"go_in": action, "code": qrHash, "seat": seat_id, "worker": user_id},
                    url='/items/companies/' + company_id + '/seats/' + seat_id + '/check/',
                    returnRes=true)
          }
                  }}
        >
      </Button>
      {state.errorMessage ? <GetErrorMessages data={state.errorMessage} />: null}
      </View>
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
    fontSize: 25,
  },
  buttonItems:  {
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: 'black'
   },
   listElem: {
    backgroundColor: 'white',
    marginTop: 10,
    marginLeft: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'darkgray',
    marginRight: 20,
    paddingBottom: 10,
  },
  listElemText: {
    fontSize: 18,
  },
  entra: {
    fontSize: 18,
    color: "purple"
  },
  sale: {
    fontSize: 18,
    color: "blue"
  },
  lost: {
    color: "red",
    fontSize: 22,
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