import React, {useState, useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, AsyncStorage, ActivityIndicator} from 'react-native';
import { Text, Input, Button} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Spacer from '../components/Spacer';
import Picker from '../components/Picker';
import { Context as PostContex} from '../context/PostRequestContext';
import { Context as QrCodeScannerContext} from '../context/QrCodeScannerContext';
import { Context as GetDataContext} from '../context/GetDataContext';
import GetErrorMessages from "../variables/dataFieldNames";


const ItemRegister = ({navigation}) => {
  const {state, postData, clearErrorMessage } = useContext(PostContex);
  const QrContext = useContext(QrCodeScannerContext);
  const GetContext = useContext(GetDataContext);
  let qrHash = QrContext.state.qrCodeHash;

  const [type_item, setType] = useState(null);
  const [brand, setBrand] = useState(null);
  const [color, setColor] = useState('');
  const [dni, setDni] = useState('');
  const [reference, setReference] = useState('');
  const [description, setDescription] = useState('');

  const fetchTypeItemData = async () => {
    const company_id = await AsyncStorage.getItem('company_id');
    let url = '/items/companies/' + company_id +'/typeitem/';
    GetContext.getData(url, 'typeitem');
  };

  useEffect(() => {
    fetchTypeItemData();
  }, []);


  const typePlaceholder = {
    label: 'Tipo de elemento',
    value: null,
    color: '#9EA0A4',
  };

  const brandPlaceholder = {
    label: 'Marca',
    value: null,
    color: '#9EA0A4',
  };

    return (
      <KeyboardAwareScrollView extraScrollHeight={100} enableOnAndroid={true} 
          keyboardShouldPersistTaps='handled'>
        <Spacer>
        <Text h3>Registrar Objeto</Text>
        <Text style={styles.subtitleText}>Todos los campos exepto telefono son obligatorios</Text>
        </Spacer>

        <Button
          buttonStyle={{backgroundColor: 'black'}}
          title="Escanear Codigo Qr"
          onPress={() =>{navigation.navigate('BarCode');
          }}
        />
        <Input 
          inputStyle={styles.input}
          placeholder='Codigo Qr'
          disabled={true}
          autoCapitalize="none"
          value={qrHash}
          autoCorrect={false}
          />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
          {GetContext.state.getTypeSuccess  ? 
          <RNPickerSelect
              onValueChange={async (typeItemId) =>{
                const company_id = await AsyncStorage.getItem('company_id');
                let url = '/items/companies/' + company_id + '/typeitem/' + typeItemId + '/brand/';
                GetContext.getData(url, 'branditem');
                setType(typeItemId);
                // setBrand(typeItemId);
                // setBrand(null);
              }}
              placeholder={typePlaceholder}
              items={GetContext.state.typeData}
            />
          : GetContext.state.loadingGetType  ? 
          <ActivityIndicator size="large" color="#0000ff" />
          : GetContext.state.typeDataError ?
          <>
            <Text style={styles.errorMessage}>No se pudieron descargar los datos, posiblemente no hay internet</Text>
          </>
          : <Picker data={[]} label={'Tipo de elemento'}/> }


          {GetContext.state.getBrandSuccess  ? 
          <RNPickerSelect
              onValueChange={(brandItemId) =>{
                console.log(typeof brandItemId)
                setBrand(brandItemId);
              }}
              placeholder={brandPlaceholder}
              items={GetContext.state.brandData}
            />
          : GetContext.state.loadingGetBrand  ? 
          <ActivityIndicator size="large" color="#0000ff" />
          : GetContext.state.brandDataError ?
          <>
            <Text style={styles.errorMessage}>No se pudieron descargar los datos, posiblemente no hay internet</Text>
          </>
          : <Picker data={[]} label={'Marca del objeto'}/> }
      <Input 
          inputStyle={styles.input}
          placeholder='Color'
          onChangeText={(newColor) => setColor(newColor)}
          autoCapitalize="none"
          autoCorrect={false}
          />

      <Input 
          inputStyle={styles.input}
          placeholder='Referencia'
          onChangeText={(newReference) => setReference(newReference)}
          autoCapitalize="none"
          // value={qrHash}
          autoCorrect={false}
          />

      <Input 
          inputStyle={styles.input}
          placeholder='Descripcion'
          onChangeText={(newDescription) => setDescription(newDescription)}
          autoCapitalize="none"
          // value={qrHash}description
          autoCorrect={false}
          />
      <Input 
          keyboardType={'numeric'}
          inputStyle={styles.input}
          placeholder='Cedula/dni del propietario'
          onChangeText={(newDni) => setDni(newDni)}
          autoCapitalize="none"
          autoCorrect={false}
          />
      <Spacer />

      <Button
        title="Registrar Objeto"
        onPress={async () =>{
          let company_id = await AsyncStorage.getItem('company_id');
          let seat_id = await AsyncStorage.getItem('seat_id');
          let url = "/items/companies/" + company_id + "/seats/" + seat_id + "/registeritem/"
          postData({reference, color, description, type_item, code: qrHash,"owner": dni, brand},
            url=url)
          }}
        >
      </Button>
    </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
  subtitleText: {
      color: "gray"
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
    textAlign: 'center'
  },
  input: {
    marginTop: 10,
    marginHorizontal: 3
  },
});

ItemRegister.navigationOptions = ({navigation}) => {
  return {
  headerTitle: 

    <View style={{flex: 1, flexDirection: 'row', marginLeft: 16}}>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.openDrawer()}>
        <Ionicons name='ios-menu' size={30} />
      </TouchableOpacity>
  </View>
  }
};

export default ItemRegister;