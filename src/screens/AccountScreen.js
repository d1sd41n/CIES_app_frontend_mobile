import React, {useContext} from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Button } from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';

import { Context as AuthContext } from '../context/AuthContext';
import MainFlowHeader  from '../components/MainFlowHeader';


const AccountScreen = () => {
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
  <MainFlowHeader navigation={navigation}/>
  }
};



export default AccountScreen;