import React, {useState, useContext} from 'react';
import { StyleSheet, ActivityIndicator, View} from 'react-native';
import { Text, Input, Button} from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

import Spacer from '../components/Spacer';

import { Context as AuthContext } from '../context/AuthContext';


// import { FlatList } from 'react-native-gesture-handler';

const SignInScreen = ({navigation}) => {
  const {state, signin, clearErrorMessage } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  // console.log("state", state)

  return (
    <View style={styles.container}>
      <NavigationEvents 
        onWillBlur={clearErrorMessage}/>
      <Spacer>
      <Text h3>SignInScreen screeneeee fro tracker</Text>
      </Spacer>
      <Input 
          label="username" 
          onChangeText={(newUsername) => setUsername(newUsername)}
          autoCapitalize="none"
          autoCorrect={false}
          />
      <Spacer />
      <Input 
          secureTextEntry
          label="Password" 
          onChangeText={(newPassword) => setPassword(newPassword)}
          autoCapitalize="none"
          autoCorrect={false}
          />
        {state.errorMessage ? <Text  style={styles.errorMessage}>{state.errorMessage}</Text>: null}
      <Spacer>
      <Button 
          title="Sign Up"
          onPress={() => signin({username, password})}
      >

          </Button>
          <ActivityIndicator size="large" color="#0000ff" />
      </Spacer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200,
  },
  text: {
      fontSize: 48
  },
  errorMessage: {
    fontSize: 16,
    color: 'red'
  }
});

SignInScreen.navigationOptions = () => {
  return {
    header: null
}
};


export default SignInScreen;