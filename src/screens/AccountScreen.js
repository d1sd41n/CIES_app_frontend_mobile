import React, {useContext} from 'react';
import { StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import { Button } from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';

import { Context as AuthContext } from '../context/AuthContext';


const AccountScreen = ({navigation}) => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Text style={styles.text}>AccountScreen</Text>
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

// TrackListScreen.navigationOptions = () => {
//   return {
//   title: 'Tracks'
// }
// };


export default AccountScreen;