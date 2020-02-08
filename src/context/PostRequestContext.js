import { AsyncStorage } from 'react-native';

import {navigate} from '../navigationRef';
import createDataContext from './createDataContext';
// import backendUrl from "../../variables/backendURL.js";
import backendUrl from "../variables/backendURL.js"

import axios from 'axios';


const authReducer = (state, action) => {
    switch (action.type) {
        case 'loading':
            return {...state, loading: true};
        case 'add_error':
            return {...state, errorMessage: action.payload, loading: false};
        case 'post_success':
             return {errorMessage: '', loading: false};
        case 'clear_error_message':
            return {...state, errorMessage: '', loading: false};
        default:
            return state;
    }

}

// const postData  = (dispatch) =>  ({data, url}) => {
const postData  = (dispatch) =>  (data, url) => {
    dispatch({type: 'loading'});

    const token = "66bd598f3289fde2b7633f8e65587ae1f5673788";
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token,
        'Accept-Language': 'es-ES,es;q=0.8',
        };
    axios.post(backendUrl + '/core/companies/1/visitors/', data, {headers})
        .then(res => {
            dispatch({type: 'post_success'});
        })
        .catch(err => {
            let error = err.response.data;
            dispatch({type: 'add_error', payload: error});
        })
}

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'})
};

export const { Provider, Context } = createDataContext(
    authReducer,
    {clearErrorMessage, postData},
    {errorMessage: null, loading: false}
);