import React, {useContext} from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Button } from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import { Context as AuthContext } from '../context/AuthContext';
import MainFlowHeader  from '../components/MainFlowHeader';


const AccountScreen = ({navigation}) => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Text style={styles.text}>AccountScreesewrfn</Text>
      <MainFlowHeader />
      <Button title='Sign Out' onPress={signout} />
    </ SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  text: {
      fontSize: 48
  },
});

AccountScreen.navigationOptions = ({navigation}) => {
  return {
  headerTitle: 
  <MainFlowHeader name="sssss"/>
  //   <View style={{flex: 1, flexDirection: 'row', marginLeft: 16}}>
  //     <TouchableOpacity style={styles.button} onPress={()=>navigation.openDrawer()}>
  //       <Ionicons name='ios-menu' size={30} />
  //     </TouchableOpacity>
  // </View>
  }
};



export default AccountScreen;