import React, {useContext} from 'react';
import { StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';


// import { FlatList } from 'react-native-gesture-handler';

const TrackListScreen = ({navigation}) => {
  return (
    <>
      <Text style={styles.text}>account screen</Text>
      
    </>
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


export default TrackListScreen;