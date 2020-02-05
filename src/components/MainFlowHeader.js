import React, {useContext} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const MainFlowHeader = ({navigation}) => {
    return (
        <View style={{flex: 1, flexDirection: 'row', marginLeft: 16}}>
            <TouchableOpacity onPress={()=>navigation.openDrawer()}>
            <Ionicons name='ios-menu' size={30} />
            </TouchableOpacity>
        </View>
    );
  }
  

  const styles = StyleSheet.create({
    container: {
    },
    text: {
        fontSize: 48
    },
  });
  
  export default MainFlowHeader;