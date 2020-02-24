import { AsyncStorage } from 'react-native';

import {navigate} from '../navigationRef';
import createDataContext from './createDataContext';
// import backendUrl from "../../variables/backendURL.js";
import backendUrl from "../variables/backendURL.js"

import axios from 'axios';


const authReducer = (state, action) => {
    switch (action.type) {
        case 'loadingGeType':
            return {...state, loadingGeType: true, getTypeSuccess: false, typeDataError: false, typeData: null};
        case 'getTypeSuccess':
            return {...state, loadingGeType: false, getTypeSuccess: true, typeData: action.payload};
        case 'typeDataError':
            return {...state, loadingGeType: false, getTypeSuccess: false, typeDataError: true, typeData: null};
        case 'clear_error_message':
            return {...state, errorMessage: '', loading: false, getSuccess: false};
        default:
            return state;
    }

}


const typeDataParser = (data) => {

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

    let token = await AsyncStorage.getItem('token');
    console.log("getDatagetDatagetDatagetData")
    console.log(type);

    if (type == "typeitem"){
        dispatch({type: 'loadingGeType'});
    }
    else if (type == "branditem"){
        console.log("branditem")
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

            if (type == "typeitem"){
                data = typeDataParser(data);
                dispatch({type: 'getTypeSuccess', payload: data});
            }
            else if (type == "branditem"){
                console.log(data);
            }
        
        })
        .catch(err => {
            console.log(err)
            console.log("eeeeeeeeeeeerrrrrrrrrrrorrrrrrrrrrrrrrrrrr")
            if (type == "typeitem"){
                dispatch({type: 'typeDataError'});
            }
            // else if (type == "branditem"){
            //     console.log(data);
            // }
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
    {typeErrorMessage: null,
        loading: false,
        loadingGeType: false,
        getBrandSuccess: false,
        typeData: null,
        getTypeSuccess: false,
        typeDataError: false,

    }
);