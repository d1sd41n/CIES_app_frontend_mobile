import React, { useContext, } from 'react';
import { FlatList, StyleSheet, View, AsyncStorage,
        ActivityIndicator, TouchableHighlight } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

import Spacer from '../components/Spacer';
import { Context as ExtraUtilContext} from '../context/ExtraUtilContext';
import { Context as GetDataContext} from '../context/GetDataContext';
import { Context as PutPatchDataContext} from '../context/PutPatchDataContext';
import { ListItem, Text, } from "react-native-elements";
import { NavigationEvents } from 'react-navigation';


const VisitorItemList = ({navigation}) => {
  const UtilContext = useContext(ExtraUtilContext);
  const PutPatchContext = useContext(PutPatchDataContext);
  const {state, getData, clearErrorMessage } = useContext(GetDataContext);

  const fetchItems = async () => {
    let visitor_dni= UtilContext.state.visitorData.dni;
    const company_id = await AsyncStorage.getItem('company_id');
    let url = '/items/companies/' + company_id + '/items/?search=' + visitor_dni;
    getData(url);
  };

  const  onWillBlur = () => {
    clearErrorMessage()
    // UtilContext.delVisitorData()
  }

  const seeItem =  ({item}) => {
    PutPatchContext.saveData(item);
    navigation.navigate('editItem')
  };

  return (
    <View style={styles.container}>
      <NavigationEvents 
          onWillBlur={onWillBlur}
          onWillFocus={fetchItems}
      />
      <Spacer>
      <Text h3 style={styles.titleText}>
        {" " + UtilContext.state.visitorData.first_name} 
        {" " + UtilContext.state.visitorData.last_name} 
      </Text>
      <Text style={styles.subtitleText}>
        Aqui se muestran los Objetos que pertenecen al visitante
      </Text>
      </Spacer>
      {state.getDataSuccess  && state.data? 
        <FlatList
          data={state.data}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableHighlight
                onPress={() =>seeItem({item})}
                >
                <View style={{backgroundColor: 'white'}}>
                  <ListItem
                          roundAvatar
                          title={`${item.type_item}`}
                          subtitle={`Marca: ${item.brand}`}
                          rightIcon={<EvilIcons name="pencil" size={30} color="black" />}
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
            <Text style={styles.errorMessage}>No se encontraron objetos de este visitante</Text>
          </>
      : null}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  titleText: {
    fontSize: 15,
  },
  subtitleText: {
    color: "gray",
    
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


export default VisitorItemList;
