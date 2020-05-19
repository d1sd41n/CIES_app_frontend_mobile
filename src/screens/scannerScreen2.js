import React, {useContext, useState} from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator, AsyncStorage, Alert} from 'react-native';
import { Text, Input, Button, } from 'react-native-elements';
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
      <Text h3 style={styles.titleText}>Objeto Escaneado y registrado</Text>
      <Text style={styles.subtitleText}>Datos sobre el objeto:</Text>
      <Text h3 style={styles.titleText}>Objeto Escaneado y registrado</Text>
      </Spacer>
      <View style={styles.listElem}>
                  <Text style={styles.name}>{state.owner_first_name} {state.owner_last_name}</Text>
                  <Text>Cedula: {state.owner_dni}</Text>
                  <Text>Marca: {state.brand}</Text>
                  <Text>Color: {state.color}</Text>
                  {/* {item.go_in  ? 
                    <Text style={styles.entra}>Accion: Entra</Text>
                  : <Text style={styles.sale}>Accion: Sale</Text>}
                  <Text style={styles.date}>{dateParser(item.date)}</Text> */}
                </View>
      <Button
        title="Registrar"
        onPress={async () =>{
          console.log("nada")
        }}
        >
      </Button>
      {state.errorMessage ? <GetErrorMessages data={state.errorMessage} />: null}
      {state.postSuccess ? <Text style={styles.postSuccess}>El visitante ha sido registrado con exito</Text>: null}

      </View>
  );
}

const styles = StyleSheet.create({
  subtitleText: {
    color: "gray",
  },
  titleText: {
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
   listElem: {
    backgroundColor: 'white',
    marginTop: 10,
    marginLeft: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'darkgray',
    marginRight: 20,
    paddingBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
},
  date: {
      color: "gray"
  },
  entra: {
    color: "purple"
  },
  sale: {
    color: "blue"
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
    marginTop: 20,
    color: "blue",
    textAlign: 'center'
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