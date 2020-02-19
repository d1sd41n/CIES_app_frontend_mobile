import { AsyncStorage } from 'react-native';

import {navigate} from '../navigationRef';
import createDataContext from './createDataContext';
// import backendUrl from "../../variables/backendURL.js";
import backendUrl from "../variables/backendURL.js"

import axios from 'axios';


const authReducer = (state, action) => {
    switch (action.type) {
        case 'loading':
            return {...state, loading: true, errorMessage: '', getSuccess: false};
        case 'add_error':
            return {...state, errorMessage: action.payload, loading: false};
        case 'getTypeSuccess':
             return {errorMessage: '', loading: false, getSuccess: true, data: action.payload};
        case 'clear_error_message':
            return {...state, errorMessage: '', loading: false, getSuccess: false};
        default:
            return state;
    }

}


const typeDataParser = (data) => {
    console.log("typeDataPrsertypeDataPrsertypeDataPrsertypeDataPrsertypeDataPrsertypeDataPrser")

    let i;
    for(i = 0; i < data.length; i++){
        data[i].label = data[i]['kind'];
        data[i].value = data[i]['id'];
        delete data[i].kind;
        delete data[i].id;
    }
    return data;

}

const getData  = (dispatch) =>  async(url, type='') => {
    // dispatch({type: 'loading'});
    let token = await AsyncStorage.getItem('token');

    // let token = await AsyncStorage.getItem('token');

    // const token = "66bd598f3289fde2b7633f8e65587ae1f5673788";

    // console.log("getDatagetDatagetDatagetData")
    // console.log(backendUrl)

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token,
        'Accept-Language': 'es-ES,es;q=0.8',
        };
    axios.get(backendUrl + url, {headers})
        .then(res => {
            // dispatch({type: 'post_success'});
            let data = res.data;
            data = typeDataParser(data);
            dispatch({type: 'getTypeSuccess', payload: data});
        })
        .catch(err => {
            console.log(err)
            console.log("eeeeeeeeeeeerrrrrrrrrrrorrrrrrrrrrrrrrrrrr")
            // let error = err.response.data;
            // console.log(err)
            // console.log(err.response);
            // dispatch({type: 'add_error', payload: error});
        })
}

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'})
};

export const { Provider, Context } = createDataContext(
    authReducer,
    {clearErrorMessage, getData},
    {errorMessage: null,
        loading: false,
        getBrandSuccess: false,
        typeData: null,
        getTypeSuccess: false,
        typeData: null
    }
);