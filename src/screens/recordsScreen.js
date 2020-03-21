import React, {useEffect, useContext} from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator, AsyncStorage, FlatList, TouchableHighlight} from 'react-native';
import { Text, Input, ListItem} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import Spacer from '../components/Spacer';
import { Context as GetDataContext} from '../context/GetDataContext';



const objectRecord = ({navigation}) => {
    const {state, getData } = useContext(GetDataContext);
    var options = { month: 'long', day: 'numeric', };

    console.log(state.data)

    const fetchTypeItemData = async () => {
        const company_id = await AsyncStorage.getItem('company_id');
        const seat_id = await AsyncStorage.getItem('seat_id');
        let url = '/items/companies/' + company_id + '/seats/' + seat_id + '/check/';
        getData(url);
      };
    
      useEffect(() => {
        fetchTypeItemData();
      }, []);


      const dateParser =  (rawDate) => {
        let date = new Date(rawDate)
        let formatted_date = date.toLocaleDateString() +
                             " " + date.getHours() +
                             ":" + date.getMinutes()
        return formatted_date;
      };

  return (
    <View>
        {state.getDataSuccess  ? 
        <FlatList
          data={state.data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return (
              <TouchableHighlight
                onPress={() =>saveVisitor({item})}
                >
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
              </TouchableHighlight>
              )
            }}
        />
      : state.loading  ?
          <>
            <Text style={styles.loading}>Buscando datos en el servidor</Text>
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
    color: "green"
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
    color: "blue",
    textAlign: 'center'
  },
  postSuccess: {
    color: "green",
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