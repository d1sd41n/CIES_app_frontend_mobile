import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import backendUrl from "../variables/backendURL.js"

import axios from 'axios';


const authReducer = (state, action) => {
    switch (action.type) {
        case 'loading':
            return {...state, loading: true, errorMessage: '', postSuccess: false, error: false,};
        case 'add_error':
            return {...state, errorMessage: action.payload, loading: false, error: true,};
        case 'post_success':
             return {...state, errorMessage: '', loading: false, postSuccess: true, error: false,};
        case 'get_res_data': 
             return {...state, errorMessage: '', loading: false, postSuccess: true, data: action.payload, error: false,};
        case 'clear_error_message':
            return {...state, errorMessage: '', loading: false, postSuccess: false, data: null, error: false,};
        default:
            return state;
    }
}


const postData  = (dispatch) =>  async (data, url, returnRes=false) => {

    dispatch({type: 'loading'});
    let token = await AsyncStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token,
        'Accept-Language': 'es-ES,es;q=0.8',
        };
    axios.post(backendUrl + url, data, {headers})
        .then(res => {
            let data = res.data;
            if(returnRes){
                dispatch({type: 'get_res_data', payload: data});
            }
            else
            {
                dispatch({type: 'post_success'});
            }
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
    {errorMessage: null,
     loading: false,
     postSuccess: false,
     data: null,
     error: false,
    }
);