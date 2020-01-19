import React, {useContext} from 'react';
import { StyleSheet, Text, TouchableOpacity, Button} from 'react-native';


// import { FlatList } from 'react-native-gesture-handler';

const SignUpScreen = ({navigation}) => {
  return (
    <>
      <Text style={styles.text}>SignUpScreen</Text>
      
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


export default SignUpScreen;