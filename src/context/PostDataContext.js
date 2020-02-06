import { AsyncStorage } from 'react-native';

import {navigate} from '../navigationRef';
import createDataContext from './createDataContext';

import axios from 'axios';


const postDataReducer = (state, action) => {
    switch (action.type) {
        case 'loading':
            return {...state, loading: true};  
        default:
            return state;
    }

}


const postData  = (dispatch) =>  ({data, url}) => {
    // dispatch({type: 'loading'});
    console.log("postDatapostDatapostData")

        // const token = "";
        // const headers = {
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Token ' + token,
        //     'Accept-Language': 'es-ES,es;q=0.8',
        //   };
        // axios.post('https://cies.tech/core/login_token/', data, {headers})
        //     .then(res => {
        //         // dispatch(postDataSuccess());
        //         console.log("ssssss")
        //     })
        //     .catch(err => {
        //     //     dispatch(requestFail(err))]
        //         console.log(err.response.data)
        //     })
}

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'})
};

export const { Provider, Context } = createDataContext(
    postDataReducer,
    {postData, clearErrorMessage},
    {posted: false, errorMessage: '', loading: false}
);