import { AsyncStorage } from 'react-native';

import {navigate} from '../navigationRef';
import createDataContext from './createDataContext';
// import backendUrl from "../../variables/backendURL.js";
import backendUrl from "../variables/backendURL.js"

import axios from 'axios';


const authReducer = (state, action) => {
    switch (action.type) {
        case 'loading':
            return {...state, loading: true, patchDataSuccess: false, error: false};
        case 'patchDataSuccess':
            return {...state, loading: false, patchDataSuccess: true, data: action.payload, error: false};
        case 'error':
            return {...state, loading: false, patchDataSuccess: false, error: true};
        case 'clear_error_message':
            return {...state, errorMessage: '', loading: false, getSuccess: false};
        case 'saveData':
            return {...state, data: action.payload};
        default:
            return state;
    }

}

const patchData  = (dispatch) =>  async(url, data) => {

    let token = await AsyncStorage.getItem('token');
    dispatch({type: 'loading'});
    console.log("###################")
    console.log(11111111, data, url);
    console.log("###################")
    data = {"lost": true}

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token,
        'Accept-Language': 'es-ES,es;q=0.8',
        };
    axios.patch(backendUrl + url, data, {headers})
        .then(res => {
            // dispatch({type: 'post_success'});
            console.log("%%%%%%%%%%%%%%%%%%%%%")
            console.log(res.data)
            console.log("%%%%%%%%%%%%%%%%%%%%%")

            // console.log(res.data)
            dispatch({type: 'patchDataSuccess', payload: res.data});
        
        })
        .catch(err => {
            let error = err.response.data;
            console.log("/////////////////////")
            console.log(error)
            console.log("/////////////////////")
            dispatch({type: 'error'});
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
    }
);