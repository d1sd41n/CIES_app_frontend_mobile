import React, {useState, useContext} from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator, AsyncStorage, FlatList} from 'react-native';
import { Text, Input, Button} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import Spacer from '../components/Spacer';
import { Context as GetDataContext} from '../context/GetDataContext';


const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];


  function Item({ title }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }

const objectRecord = ({navigation}) => {

    const fetchTypeItemData = async () => {
        const company_id = await AsyncStorage.getItem('company_id');
        const seat_id = await AsyncStorage.getItem('seat_id');
        let url = '/core/companies/' + company_id + '/visitors/';
        getData(url);
      };
    
    //   useEffect(() => {
    //     fetchTypeItemData();
    //   }, []);

  return (
    <View>
        <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  subtitleText: {
      color: "gray"
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