import React, {useState, useContext} from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator, AsyncStorage, Alert} from 'react-native';
import { Text, Input, Button} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';

import Spacer from '../components/Spacer';
import { Context } from '../context/PostRequestContext';
import GetErrorMessages from "../variables/dataFieldNames"

const registerVisitor = ({navigation}) => {
  const {state, postData, clearErrorMessage } = useContext(Context);
  const [dni, setDni] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <View >
      <NavigationEvents 
        onWillBlur={clearErrorMessage}/>
      <Spacer>
      <Text h3>Registrar visitante</Text>
      <Text style={styles.subtitleText}>Todos los campos exepto telefono son obligatorios</Text>
      </Spacer>
      <Input 
          keyboardType={'numeric'}
          inputStyle={styles.input}
          placeholder='Cedula/dni'
          onChangeText={(newDni) => setDni(newDni)}
          autoCapitalize="none"
          autoCorrect={false}
          />
      <Input
          inputStyle={styles.input}
          placeholder='Nombres'
          onChangeText={(newNames) => setFirst_name(newNames)}
          autoCapitalize="none"
          autoCorrect={false}
          />
        <Input 
          inputStyle={styles.input}
          placeholder='Apellidos'
          onChangeText={(newLastName) => setLast_name(newLastName)}
          autoCapitalize="none"
          autoCorrect={false}
          />
      <Input 
          inputStyle={styles.input}
          placeholder='Email' 
          onChangeText={(newEmail) => setEmail(newEmail)}
          autoCapitalize="none"
          autoCorrect={false}
          />
      <Input 
          keyboardType={'numeric'}
          inputStyle={styles.input}
          placeholder='Telefono' 
          onChangeText={(newPhone) => setPhone(newPhone)}
          autoCapitalize="none"
          autoCorrect={false}
          />
      <Spacer />
      {state.loading ?
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Registrando visitante</Text>
        </>
        : null}
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