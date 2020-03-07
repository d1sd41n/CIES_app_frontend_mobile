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

        case 'loadingGetType':
            return {...state, loadingGetType: true, getTypeSuccess: false, typeDataError: false, typeData: null};
        case 'getTypeSuccess':
            return {...state, loadingGetType: false, getTypeSuccess: true, typeData: action.payload, typeDataError: false};
        case 'typeDataError':
            return {...state, loadingGetType: false, getTypeSuccess: false, typeDataError: true, typeData: null};

        case 'getBrandSuccess':
            return {...state, loadingGetBrand: false, getBrandSuccess: true, brandData: action.payload, brandDataError: false};
        case 'loadingGetBrand':
            return {...state, loadingGetBrand: true, getBrandSuccess: false, brandDataError: false, brandData: null};
        case 'brandDataError':
            return {...state, loadingGetBrand: false, getBrandSuccess: false, brandDataError: true, brandData: null};

        case 'clear_error_message':
            return {...state, errorMessage: '', loading: false, getSuccess: false};
        default:
            return state;
    }

}


const typeDataParser = (data, type) => {

    let i;
    for(i = 0; i < data.length; i++){
        if (type == "typeitem"){
            data[i].label = data[i]['kind'];
            delete data[i].kind;
        }
        else if(type == "branditem"){
            data[i].label = data[i]['brand'];
            delete data[i].brand;
        }
        data[i].value = data[i]['id'];
        delete data[i].id;
    }
    return data;

}

const getData  = (dispatch) =>  async(url, type='') => {

    let token = await AsyncStorage.getItem('token');

    if (type == "typeitem"){
        dispatch({type: 'loadingGetType'});
    }
    else if (type == "branditem"){
        dispatch({type: 'loadingGetBrand'});
    }
    else{
        dispatch({type: 'loading'});
    }

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
    {   loading: false,
        getDataSuccess: false,
        data: null,
        error: false,

        getTypeSuccess: false,
        typeData: null,
        typeDataError: false,
        loadingGetType: false,

        loadingGetBrand: false,
        getBrandSuccess: false,
        brandData: null,
        brandDataError: false,
    }
);