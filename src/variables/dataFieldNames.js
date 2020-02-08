import React from "react";
import { StyleSheet, View} from 'react-native';
import { Text} from 'react-native-elements';

var dataFieldNames = {
    "username": "Nombre de usuario",
    "first_name": "Nombre",
    "last_name": "Apellido",
    "email": "Email",
    "password": "Contraceña",
    "type": "Tipo de usuario",
    "dni": "Cedula"
    };


export default function GetErrorMessages(props){
    let data = Object.entries(props.data);
    const errorMessage = (
        <View>
            <Text style={{color:"red"}}>Atencion!, los siguientes campos son incorrectos:</Text>
            {data.map((item, key) => {
                const dataField= dataFieldNames[item[0]]+ ": ";
                const text = item[1][0];
                return (
                <Text style={{color:"blue"}} key={key}>
                    <Text style={{fontWeight: "bold", color:"black"}}>{dataField}</Text>
                    <Text>{text}</Text>
                </Text>
                );
            })}
        </View>
        );
    return errorMessage;
}


