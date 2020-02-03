import React, {useContext} from 'react';
import { StyleSheet, Text, TouchableOpacity, Button, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// import { FlatList } from 'react-native-gesture-handler';

const registerVisitor = ({navigation}) => {
  return (
    <>
      <Text style={styles.text}>registerVisitor</Text>
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

registerVisitor.navigationOptions = ({navigation}) => {
  return {
  headerTitle: 

    <View style={{flex: 1, flexDirection: 'row', marginLeft: 16}}>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.openDrawer()}>
        <Ionicons name='ios-menu' size={30} />
      </TouchableOpacity>
  </View>
  }
};

export default registerVisitor;