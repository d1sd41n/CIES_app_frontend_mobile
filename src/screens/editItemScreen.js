import React, {useState, useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, AsyncStorage, ActivityIndicator, Alert} from 'react-native';
import { Text, Input, Button, FormInput,} from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Context as PutPatchDataContext} from '../context/PutPatchDataContext';

import Spacer from '../components/Spacer';


const ItemRegister = ({navigation}) => {
  const {state, patchData, clearErrorMessage } = useContext(PutPatchDataContext);

  const  onWillBlur = () => {
  }

  console.log(state)
    return (
      <KeyboardAwareScrollView extraScrollHeight={100} enableOnAndroid={true} 
          keyboardShouldPersistTaps='handled'>
        <NavigationEvents 
          onWillBlur={onWillBlur}/>
      <Spacer>
      <Text h3 style={styles.titleText}>
        Editar Objeto
      </Text>
      <Text style={styles.subtitleText}>
        Por ahora solo se pueden cambiar los estados perdido/encontrado</Text>
      </Spacer>
      <Text style={styles.label}>
        Propietario:
      </Text>
      <Input 
          
          inputStyle={styles.input}
          placeholder=''
          value={state.data.owner_name +
                 " " + state.data.owner_last_name +
                 " - " + state.data.owner_dni}
          autoCapitalize="none"
          autoCorrect={false}
          disabled={true}
          />
      <Text style={styles.label}>
        Tipo de objeto:
      </Text>
      <Input 
          
          inputStyle={styles.input}
          placeholder=''
          value={state.data.type_item}
          autoCapitalize="none"
          autoCorrect={false}
          disabled={true}
          />
      <Text style={styles.label}>
        Marca:
      </Text>
      <Input 
          
          inputStyle={styles.input}
          placeholder=''
          value={state.data.brand}
          autoCapitalize="none"
          autoCorrect={false}
          disabled={true}
      />
      <Text style={styles.label}>
        Estado:
      </Text>
      {state.data.lost  ? 
          <Input 
          inputStyle={styles.lostInput}
          placeholder=''
          value="Perdido"
          disabled={true}
          />
      : 
          <Input 
          inputStyle={styles.notLostInput}
          placeholder=''
          value="Encontrado"
          disabled={true}
          />
      }
      <Text style={styles.label}>
        Referencia:
      </Text>
      <Input 
          
          inputStyle={styles.input}
          placeholder=''
          value={state.data.reference}
          autoCapitalize="none"
          autoCorrect={false}
          disabled={true}
      />
      <Text style={styles.label}>
        Color:
      </Text>
      <Input 
          
          inputStyle={styles.input}
          placeholder=''
          value={state.data.color}
          autoCapitalize="none"
          autoCorrect={false}
          disabled={true}
      />
      {state.data.lost  ? 
          <Button
          buttonStyle={styles.buttonLost}
          title="Cambiar estado a Encontrado"
          onPress={() =>{
          }}
        />
      : 
      <Button
      buttonStyle={styles.buttonNotLost}
      title="Cambiar estado a Perdido"
      onPress={() =>{
        
      }}
    />
      }

      {/* {state.loading ?
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Registrando objeto</Text>
          <Spacer />
        </>
        : null}
      {state.errorMessage ? 
        <>
          <GetErrorMessages data={state.errorMessage} />
          <Spacer />
        </>
        : null}
      {state.postSuccess ? 
        <>
          <Text style={styles.postSuccess}>El objeto ha sido registrado con exito</Text>
          <Spacer />
        </>
      : null} */}
      <Spacer />
      </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
  subtitleText: {
      color: "gray"
  },
  label: {
    marginTop: 5,
    color: "black",
    marginHorizontal: 16
  },
  errorMessage: {
    fontSize: 16,
    color: 'red'
  },
  loadingText: {
    color: "blue",
    textAlign: 'center'
  },
  postSuccess: {
    color: "green",
    textAlign: 'center'
  },
  input: {
    marginHorizontal: 16,
    marginBottom: -2,
  },
  lostInput: {
    marginHorizontal: 16,
    marginBottom: -2,
    color: "red"
  },
  notLostInput: {
    marginHorizontal: 16,
    marginBottom: -2,
    color: "green"
  },
  buttonLost:  {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: 'green'
   },
  buttonNotLost:  {
  marginTop: 5,
  marginLeft: 5,
  marginRight: 5,
  borderRadius: 10,
  backgroundColor: 'red'
  }
});

export default ItemRegister;