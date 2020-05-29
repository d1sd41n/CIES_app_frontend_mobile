import React, {useState, useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, AsyncStorage, ActivityIndicator, Alert} from 'react-native';
import { Text, Input, FormLabel, FormInput,} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
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
      <View >
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
        Nombre:
      </Text>
      <Input 
          
          inputStyle={styles.input}
          placeholder='Color'
          value="Hola"
          onChangeText={(newColor) => setColor(newColor)}
          autoCapitalize="none"
          autoCorrect={false}
          disabled={true}
          />
      <Text style={styles.label}>
        Nombre:
      </Text>
      <Input 
          
          inputStyle={styles.input}
          placeholder='Color'
          value="Hola"
          onChangeText={(newColor) => setColor(newColor)}
          autoCapitalize="none"
          autoCorrect={false}
          disabled={true}
          />
      <Spacer />

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
      </View>
    );
}

const styles = StyleSheet.create({
  subtitleText: {
      color: "gray"
  },
  label: {
    marginTop: 10,
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
  },
  buttonItems:  {
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: 'black'
   }
});

export default ItemRegister;