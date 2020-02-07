import React, {useState, useContext} from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import { Text, Input, Button} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

// import { FlatList } from 'react-native-gesture-handler';
import Spacer from '../components/Spacer';

// import { Context } from '../context/PostDataContext';
import { Context } from '../context/PostRequestContext';

const registerVisitor = ({navigation}) => {
  // const {state, postData, clearErrorMessage } = useContext(Context);
  // const {state, clearErrorMessage } = useContext(Context);
  const {state, postData, clearErrorMessage } = useContext(Context);
  const [dni, setDni] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  console.log(state);
  // postData({ww:2,f:44}, {ddd: 87})

  return (
    <View >
      <Spacer>
      <Text h3>Registrar visitante</Text>
      </Spacer>
      <Input 
          keyboardType={'numeric'}
          inputStyle={styles.input}
          placeholder='Cedula'
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
      {state.loading ? <ActivityIndicator size="large" color="#0000ff" />: null}
      <Button
        title="Registrar Visitante"
        onPress={() => postData({dni, first_name, last_name, email, phone}, 
                                url='/core/companies/1/visitors/')}
        >
        </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200,
  },
  text: {
      fontSize: 48
  },
  errorMessage: {
    fontSize: 16,
    color: 'red'
  },
  input: {
    marginTop: 10,
    marginHorizontal: 3
  }
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