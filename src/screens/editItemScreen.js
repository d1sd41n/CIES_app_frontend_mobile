import React, { useContext, useEffect } from 'react';
import { FlatList, StyleSheet, View, AsyncStorage,
        ActivityIndicator, Alert, TouchableHighlight } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

import Spacer from '../components/Spacer';
import { Context as ExtraUtilContext} from '../context/ExtraUtilContext';
import { Context as GetDataContext} from '../context/GetDataContext';
import { ListItem, SearchBar, Button, Text,  } from "react-native-elements";
import { NavigationEvents } from 'react-navigation';


const VisitorsList = ({navigation}) => {
  const UtilContext = useContext(ExtraUtilContext);
  const {state, getData, clearErrorMessage } = useContext(GetDataContext);
  console.log(UtilContext)

  const  onWillBlur = () => {
    clearErrorMessage()
  }

  const seeItem =  ({item}) => {
    UtilContext.saveData(item);
    console.log(item)
    // navigation.navigate('visitorItems')
  };

  return (
    <View style={styles.container}>
      <NavigationEvents 
          onWillBlur={onWillBlur}
          // onWillFocus={fetchItems}
          />
      <Spacer>
      <Text h3 style={styles.titleText}>
        Editar Objeto
      </Text>
      <Text style={styles.subtitleText}>
        Por ahora solo se pueden cambiar los estados perdido/encontrado</Text>
      </Spacer>
      {/* {state.getDataSuccess  && state.data? 
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
      : null} */}
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


export default VisitorsList;