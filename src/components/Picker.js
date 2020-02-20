import React from 'react';
import RNPickerSelect from 'react-native-picker-select';



const Picker = ({data, label}) => {
    // https://snack.expo.io/@lfkwtz/react-native-picker-select
    //https://www.npmjs.com/package/react-native-picker-select
  
    const placeholder = {
      label: label,
      value: null,
      color: '#9EA0A4',
    };
  
      return (
  
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              placeholder={placeholder}
              items={data}
            />
      );
  }

  export default Picker;