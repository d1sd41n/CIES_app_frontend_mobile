import React, {useContext, useState} from 'react';
import { StyleSheet, View, TouchableOpacity, AsyncStorage} from 'react-native';
import { Text, Input, Button,} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';

import { Context as AuthContext } from '../context/AuthContext';
import Spacer from '../components/Spacer';


const AccountScreen = () => {
  const [name, setName] = useState("");
  const [last_name, setLas_name] = useState("");
  const [company, setCompany] = useState("");
  const [seat, setSeat] = useState("");

  const { signout } = useContext(AuthContext);

  const  onWillFocus = async() => {
    let name = await AsyncStorage.getItem('name');
    let last_name = await AsyncStorage.getItem('last_name');
    let company = await AsyncStorage.getItem('company_name');
    let seat = await AsyncStorage.getItem('seat_name');

    setName(name);
    setLas_name(last_name);
    setCompany(company);
    setSeat(seat);
  }

  return (
    <View>
      <NavigationEvents 
          onWillFocus={onWillFocus}
          />
      <Spacer>
      <Text h3>Perfil</Text>
      <Text style={styles.subtitleText}>Datos del usuario</Text>
      </Spacer>
      <Text style={styles.label}>
        Nombre:
      </Text>
      <Input 
          
          inputStyle={styles.input}
          placeholder=''
          value={name + " " + last_name}
          autoCapitalize="none"
          autoCorrect={false}
          disabled={true}
          />
      <Text style={styles.label}>
        Compañia:
      </Text>
      <Input 
          
          inputStyle={styles.input}
          placeholder=''
          value={company}
          autoCapitalize="none"
          autoCorrect={false}
          disabled={true}
          />
      <Text style={styles.label}>
        Sede:
      </Text>
      <Input 
          
          inputStyle={styles.input}
          placeholder=''
          value={seat}
          autoCapitalize="none"
          autoCorrect={false}
          disabled={true}
          />
      <Spacer/>
      <Button title='Cerrar seccion' onPress={signout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  subtitleText: {
    color: "gray"
  },
  label: {
    marginTop: 5,
    color: "black",
    marginHorizontal: 16
  },
});

AccountScreen.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 
  
      <View style={{flex: 1, flexDirection: 'row', marginLeft: 16}}>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.openDrawer()}>
          <Ionicons name='ios-menu' size={30} />
        </TouchableOpacity>
    </View>
    }
};



export default AccountScreen;