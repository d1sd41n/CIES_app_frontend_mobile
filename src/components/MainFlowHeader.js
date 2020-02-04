import React, {useContext} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const MainFlowHeader = (props) => {
    console.log(3333)
    console.log(props)
    console.log(3333)
    console.log("wsgdefdsfdgsfsgfdsfdsfg")
    return (
        // <Text style={styles.text}>AccountScreesewrfn</Text>
        <View style={{flex: 1, flexDirection: 'row', marginLeft: 16}}>
            {/* <TouchableOpacity style={styles.button} onPress={()=>navigation.openDrawer()}>
            <Ionicons name='ios-menu' size={30} />
            </TouchableOpacity> */}
            <Text>AccountScreesewrfn</Text>
        </View>
    );
  }
  

//   const styles = StyleSheet.create({
//     container: {
//     },
//     text: {
//         fontSize: 48
//     },
//   });
  
  export default MainFlowHeader;