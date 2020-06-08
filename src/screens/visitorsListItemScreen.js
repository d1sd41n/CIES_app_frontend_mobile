import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, AsyncStorage,
        ActivityIndicator, Alert, TouchableHighlight} from 'react-native';

import { Context as ExtraUtilContext} from '../context/ExtraUtilContext';
import { Context as GetDataContext} from '../context/GetDataContext';
import { ListItem, SearchBar, Button, Text,  } from "react-native-elements";
import { NavigationEvents } from 'react-navigation';


const VisitorsList = ({navigation}) => {
  const UtilContext = useContext(ExtraUtilContext);
  const {state, getData, clearErrorMessage } = useContext(GetDataContext);
  const [search, setSearch] = useState('');
  


  const fetchVisitors = async () => {
    Alert.alert(
      'Buscar Visitante', "Haga la busqueda usando apellido, cedula o nombre, luego pulse sobre el visitante para ver sus objetos"
    )
    const company_id = await AsyncStorage.getItem('company_id');
    let url = '/core/companies/' + company_id + '/visitors/';
    getData(url);
  };

  const searchVisitor = async () => {
    const company_id = await AsyncStorage.getItem('company_id');
    let url = '/core/companies/' + company_id + '/visitors/?search='+search;
    getData(url);
  };

  const findItems =  ({item}) => {
    // here we save the user data to send to the visitoritemsScrem
    UtilContext.saveVisitorData(item);
    navigation.navigate('visitorItems')
  };

  // useEffect(() => {
  //   Alert.alert(
  //        'Buscar Visitante', "Haga la busqueda usando apellido, cedula o nombre, luego pulse sobre el visitante para ver sus objetos"
  //     )
  // }, []);

  return (
    <View style={styles.container}>
      <NavigationEvents 
          onWillBlur={clearErrorMessage}
          onWillFocus={fetchVisitors}/>
      <SearchBar placeholder="Buscar..."
        lightTheme editable={true}
        value={search}
        onChangeText={(text) => {
          setSearch(text);
        }}
        />
      <Button
          buttonStyle={{backgroundColor: 'black'}}
          title="Buscar visitante"
          onPress={searchVisitor}
        />
      {state.getDataSuccess  && state.data? 
        <FlatList
          data={state.data}
          keyExtractor={item => item.dni}
          renderItem={({item}) => {
            return (
              <TouchableHighlight
                onPress={() =>findItems({item})}
                >
                <View style={{backgroundColor: 'white'}}>
                  <ListItem
                          roundAvatar
                          title={`${item.first_name} ${item.last_name}`}
                          subtitle={`${item.dni}`}
                        />
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
  container: {
   flex: 1,
  },
  textRadio: {
    fontSize: 20,
    marginBottom: 10
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  loading: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    color: "blue",
  },
  errorMessage: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    color: 'red'
  },
})


// VisitorsList.navigationOptions = ({navigation}) => {
//   return {
//   headerTitle: 

//     <View style={{flex: 1, flexDirection: 'row', marginLeft: 16}}>
//       <TouchableOpacity style={styles.button} onPress={()=>navigation.openDrawer()}>
//         <Ionicons name='ios-menu' size={30} />
//       </TouchableOpacity>
//   </View>
//   }
// };


export default VisitorsList;