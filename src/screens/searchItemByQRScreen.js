import React, {useContext} from 'react';
import { StyleSheet, View, ActivityIndicator,
         AsyncStorage, Alert, TouchableHighlight} from 'react-native';
import { Text, Input, Button, ListItem} from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';

import Spacer from '../components/Spacer';
import { Context } from '../context/GetDataContext';
import GetErrorMessages from "../variables/dataFieldNames";
import { Context as ExtraUtilContext} from '../context/ExtraUtilContext';
import { Context as PutPatchDataContext} from '../context/PutPatchDataContext';

const registerVisitor = ({navigation}) => {
  const {state, clearErrorMessage, getData } = useContext(Context);
  const PutPatchContext = useContext(PutPatchDataContext);

  console.log(state)


  const UtilContext = useContext(ExtraUtilContext);
  let qrHash = UtilContext.state.qrCodeHash;
  let deleteQr = UtilContext.deleteQrCodeHash;

  const  onWillBlur = () => {
    clearErrorMessage()
    deleteQr()
  }

  const seeItem =  () => {
    // PutPatchContext.saveData(item);
    // navigation.navigate('editItem');
    console.log("333333333333333333")
  };

  const searchItem = async () => {
    if(!isUUID(qrHash)){
      Alert.alert(
        'Atencion', 'Porfavor escanee un codigo qr valido'
     )
    }
    else{
      let company_id = await AsyncStorage.getItem('company_id');
      let url = "/items/companies/" + company_id + "/items/?search_code=" + qrHash;
      console.log(url)
      getData(url);
    }
  };


  const  isUUID = ( uuid ) => {
    let s = "" + uuid;

    s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    if (s === null) {
      return false;
    }
    return true;
  }

  return (
    <View>
      <NavigationEvents 
          onWillBlur={onWillBlur}/>
      <Spacer>
      <Text h3>Buscar objeto usando codigo QR</Text>
      <Text style={styles.subtitleText}>Escanea el codigo Qr del objeto</Text>
      </Spacer>
      <Spacer />
      {state.loading ?
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Registrando el transito de este item</Text>
        </>
      : null}
      <Button
          buttonStyle={styles.buttonItems}
          title="Escanear Codigo Qr"
          onPress={() =>{
            UtilContext.setTypeScan(3);
            navigation.navigate('BarCode');
          }}
        />
      <Spacer />
      <Input 
          inputStyle={styles.input}
          placeholder='Codigo Qr'
          disabled={true}
          autoCapitalize="none"
          value={qrHash}
          autoCorrect={false}
          />
        <Spacer />
      {state.getDataSuccess ?
        <TouchableHighlight
        onPress={() =>seeItem()}
        >
          <View style={{backgroundColor: 'white'}}>
          <Spacer>
            <Text style={styles.subtitleText}>Objeto encontrado:</Text>
            <ListItem
                    roundAvatar
                    title={`${state.data[0].type_item}`}
                    subtitle={`Marca: ${state.data[0].brand}`}
                    rightIcon={<EvilIcons name="pencil" size={30} color="black" />}
                  />
          </Spacer>
          </View>
        </TouchableHighlight>
      : null}
      <Button
        title="Buscar Objeto"
        onPress={searchItem}
        >
      </Button>
      {state.errorMessage ? <GetErrorMessages data={state.errorMessage} />: null}
      </View>
  );
}

const styles = StyleSheet.create({
  subtitleText: {
      color: "gray"
  },
  textRadio: {
    fontSize: 20,
    marginBottom: 10
},
  errorMessage: {
    fontSize: 16,
    color: 'red'
  },
  input: {
    marginTop: 10,
    marginHorizontal: 3
  },
  loadingText: {
    color: "blue",
    textAlign: 'center'
  },
  postSuccess: {
    color: "green",
    fontSize: 25,
  },
  buttonItems:  {
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: 'black'
   },
   listElem: {
    backgroundColor: 'white',
    marginTop: 10,
    marginLeft: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'darkgray',
    marginRight: 20,
    paddingBottom: 10,
  },
  listElemText: {
    fontSize: 18,
  },
  entra: {
    fontSize: 18,
    color: "purple"
  },
  sale: {
    fontSize: 18,
    color: "blue"
  },
  lost: {
    color: "red",
    fontSize: 22,
  },
});

export default registerVisitor;