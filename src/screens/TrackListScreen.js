import React, {useContext} from 'react';
import { StyleSheet, Text, TouchableOpacity, Button} from 'react-native';


// import { FlatList } from 'react-native-gesture-handler';

const TrackListScreen = ({navigation}) => {
  return (
    <>
      <Text style={styles.text}>account screen</Text>
      <Button title="Go to acount detail" onPress={() => navigation.navigate("TrackDetail")}></Button>
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