import { AsyncStorage } from 'react-native';

import {navigate} from '../navigationRef';
import createDataContext from './createDataContext';
// import backendUrl from "../../variables/backendURL.js";
import backendUrl from "../variables/backendURL.js"

import axios from 'axios';


const authReducer = (state, action) => {
    switch (action.type) {
        case 'loading':
            return {...state, loading: true, getDataSuccess: false, error: false, data: null};
        case 'getDataSuccess':
            return {...state, loading: false, getDataSuccess: true, data: action.payload, error: false};
        case 'error':
            return {...state, loading: false, getDataSuccess: false, error: true, data: null};
        case 'clear_error_message':
            return {...state, errorMessage: '', loading: false, getSuccess: false, data: null,};
        default:
            return state;
    }

}

const getData  = (dispatch) =>  async(url) => {

    let token = await AsyncStorage.getItem('token');
    dispatch({type: 'loading'});

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token,
        'Accept-Language': 'es-ES,es;q=0.8',
        };
    axios.get(backendUrl + url, {headers})
        .then(res => {
            // dispatch({type: 'post_success'});
            let data = res.data;

            // console.log(res.data)

            if (type == "typeitem"){
                data = typeDataParser(data, type);
                dispatch({type: 'getTypeSuccess', payload: data});
            }
            else if (type == "branditem"){
                data = typeDataParser(data, type);
                dispatch({type: 'getBrandSuccess', payload: data});
            }
            else{
                dispatch({type: 'getDataSuccess', payload: data});
            }
        
        })
        .catch(err => {
            if (type == "typeitem"){
                dispatch({type: 'typeDataError'});
            }
            else if (type == "branditem"){
                dispatch({type: 'brandDataError'});
            }
            else{
                dispatch({type: 'error'});
            }
        })
}

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'})
};

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'})
};

export const { Provider, Context } = createDataContext(
    authReducer,
    {clearErrorMessage, getData},
    {   loading: false,
        getDataSuccess: false,
        data: null,
        error: false,
    }
);