import { AsyncStorage } from 'react-native';

import {navigate} from '../navigationRef';
import createDataContext from './createDataContext';
// import backendUrl from "../../variables/backendURL.js";
import backendUrl from "../variables/backendURL.js"

import axios from 'axios';


const authReducer = (state, action) => {
    switch (action.type) {
        case 'loading':
            return {...state, loading: true, patchDataSuccess: false, error: false, errorMessage: ""};
        case 'patchDataSuccess':
            return {...state, loading: false, patchDataSuccess: true, data: action.payload, error: false, errorMessage: ""};
        case 'error':
            return {...state, loading: false, patchDataSuccess: false, error: true, errorMessage: action.payload};
        case 'clear_error_message':
            return {...state, errorMessage: '', loading: false, patchDataSuccess: false, errorMessage: "", error: false};
        case 'saveData':
            return {...state, data: action.payload};
        default:
            return state;
    }

}

const patchData  = (dispatch) =>  async(url, data) => {

    let token = await AsyncStorage.getItem('token');
    dispatch({type: 'loading'});

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token,
        'Accept-Language': 'es-ES,es;q=0.8',
        };
    axios.patch(backendUrl + url, data, {headers})
        .then(res => {
            dispatch({type: 'patchDataSuccess', payload: res.data});
        })
        .catch(err => {
            let error = err.response.data;
            if (error == null)
                error = "";
            dispatch({type: 'error', payload: error});
        })
}

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'})
};

const saveData = dispatch => (data) => {
    dispatch({type: 'saveData', payload: data});
};


export const { Provider, Context } = createDataContext(
    authReducer,
    {clearErrorMessage, patchData, saveData},
    {   loading: false,
        patchDataSuccess: false,
        data: null,
        error: false,
        errorMessage: "",
    }
);