import React, {useEffect, useContext, useState} from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator, AsyncStorage, FlatList, TouchableHighlight} from 'react-native';
import { Text, Button} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';

import Spacer from '../components/Spacer';
import { Context as GetDataContext} from '../context/GetDataContext';



const objectRecord = ({navigation}) => {
    const {state, getData, clearErrorMessage } = useContext(GetDataContext);
    var options = { month: 'long', day: 'numeric', };
    const [initialized, setInit] = useState(false);

    const fetchTypeItemData = async () => {
        const company_id = await AsyncStorage.getItem('company_id');
        const seat_id = await AsyncStorage.getItem('seat_id');
        let url = '/items/companies/' + company_id + '/seats/' + seat_id + '/check/';
        getData(url);
      };

      const dateParser =  (rawDate) => {
        let date = new Date(rawDate)
        let formatted_date = date.toLocaleDateString() +
                             " " + date.getHours() +
                             ":" + date.getMinutes()
        return formatted_date;
      };

  return (
    <View style={{ flex: 1 }}>
      <NavigationEvents 
          onWillBlur={clearErrorMessage}
          onWillFocus={fetchTypeItemData}
          />
        <Button
          buttonStyle={{backgroundColor: 'black', marginTop: 10, marginBottom: 10}}
          title="Actualizar Historial"
          onPress={fetchTypeItemData}
        />
        {state.getDataSuccess  ? 
        <FlatList
          // contentContainerStyle={{ paddingBottom: 60}}
          data={state.data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return (
                <View style={styles.listElem}>
                  <Text style={styles.name}>{item.owner_name} {item.owner_last_name}</Text>
                  <Text>Cedula: {item.owner_dni}</Text>
                  <Text>Marca: {item.brand}</Text>
                  <Text>Referencia: {item.reference}</Text>
                  {item.go_in  ? 
                    <Text style={styles.entra}>Accion: Entra</Text>
                  : <Text style={styles.sale}>Accion: Sale</Text>}
                  <Text style={styles.date}>{dateParser(item.date)}</Text>
                </View>
              )
            }}
        />
      : state.loading  ?
          <>
            <Text style={styles.loadingText}>Buscando datos en el servidor</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </>
      : state.error ?
          <>
            <Text style={styles.errorMessage}>No se pudieron descargar los datos, posiblemente no hay internet</Text>
          </>
      : null}
    </View>
  );
}

const styles = StyleSheet.create({
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

objectRecord.navigationOptions = ({navigation}) => {
  return {
  headerTitle: 

    <View style={{flex: 1, flexDirection: 'row', marginLeft: 16}}>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.openDrawer()}>
        <Ionicons name='ios-menu' size={30} />
      </TouchableOpacity>
  </View>
  }
};

export default objectRecord;