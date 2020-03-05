import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Context as ExtraUtilContext} from '../context/ExtraUtilContext';
import { Context as GetDataContext} from '../context/GetDataContext';
import { ListItem, SearchBar } from "react-native-elements";
// http://www.coderzheaven.com/2019/12/28/flatlist-filtering-in-flatlist-spread-operators-in-react-native/


const VisitorsList = () => {
  const GetContext = useContext(GetDataContext);
  const {state, getData } = useContext(GetDataContext);
  // const [search, setUpdateSearch] = useState('');

  console.log("sssss", state)


  const fetchTypeItemData = async () => {
    const company_id = await AsyncStorage.getItem('company_id');
    let url = '/core/companies/' + company_id + '/visitors/';
    getData(url);
  };

  useEffect(() => {
    fetchTypeItemData();
  }, []);

  const renderHeader = () => {
    return <SearchBar placeholder="Search Here..."
        lightTheme editable={true}
        // value={search}
        // onChangeText={this.updateSearch} 
        />; 
}; 

  return (
    <View style={styles.container}>
      {state.getDataSuccess  ? 
        <FlatList
        ListHeaderComponent={renderHeader}
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
    flexDirection: 'column',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export default VisitorsList;