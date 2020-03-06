import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Context as ExtraUtilContext} from '../context/ExtraUtilContext';
import { Context as GetDataContext} from '../context/GetDataContext';
import { ListItem, SearchBar, Button } from "react-native-elements";
// http://www.coderzheaven.com/2019/12/28/flatlist-filtering-in-flatlist-spread-operators-in-react-native/


const VisitorsList = () => {
  const GetContext = useContext(GetDataContext);
  const {state, getData } = useContext(GetDataContext);
  const [search, setSearch] = useState('');

  console.log("sssss", state)


  const fetchTypeItemData = async () => {
    const company_id = await AsyncStorage.getItem('company_id');
    let url = '/core/companies/' + company_id + '/visitors/';
    getData(url);
  };

  useEffect(() => {
    fetchTypeItemData();
  }, []);

  return (
    <View style={styles.container}>
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
          onPress={() =>{
            console.log(search)
          }}
        />
      {state.getDataSuccess  ? 
        <FlatList
          data={state.data}
          keyExtractor={item => item.dni}
          renderItem={({item}) => {
            return (
              <>
              <Text style={styles.item}>{item.first_name}</Text>
              </>
              )
            }}
        />
      : null}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export default VisitorsList;