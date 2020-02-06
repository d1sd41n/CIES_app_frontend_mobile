import React, {useState, useContext} from 'react';
import { StyleSheet, TouchableOpacity, View} from 'react-native';
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
  const [cedula, setCedula] = useState('');
  const [names, setNames] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  console.log(state);
  // postData()

  return (
    <View >
      <Spacer>
      <Text h3>Registrar visitante</Text>
      </Spacer>
      <Input 
          keyboardType={'numeric'}
          inputStyle={styles.input}
          placeholder='Cedula'
          onChangeText={(newCedula) => setCedula(newCedula)}
          autoCapitalize="none"
          autoCorrect={false}
          />
      <Input
          inputStyle={styles.input}
          placeholder='Nombres'
          onChangeText={(newNames) => setNames(newNames)}
          autoCapitalize="none"
          autoCorrect={false}
          />
        <Input 
          inputStyle={styles.input}
          placeholder='Apellidos'
          onChangeText={(newLastName) => setLastName(newLastName)}
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
      <Button title="Registrar Visitante" onPress={() => navigation.navigate("TrackDetail")}></Button>
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