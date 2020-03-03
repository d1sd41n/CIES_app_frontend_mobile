import React, { useContext, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Context as ExtraUtilContext} from '../context/ExtraUtilContext';
import { Context as GetDataContext} from '../context/GetDataContext';


const VisitorsList = () => {
  const GetContext = useContext(GetDataContext);


  const fetchTypeItemData = async () => {
    const company_id = await AsyncStorage.getItem('company_id');
    let url = '/core/companies/' + company_id + '/visitors/';
    // GetContext.getData(url, 'typeitem');
  };

  useEffect(() => {
    fetchTypeItemData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => {
          return (
            <>
            <Text style={styles.item}>{item.key}</Text>
            </>
            )
          }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export default VisitorsList;