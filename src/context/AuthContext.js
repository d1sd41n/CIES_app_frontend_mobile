import { AsyncStorage } from 'react-native';

import {navigate} from '../navigationRef';
import createDataContext from './createDataContext';

import axios from 'axios';


const authReducer = (state, action) => {
    switch (action.type) {
        case 'loading':
            return {...state, loading: true};
        case 'add_error':
            return {...state, errorMessage: action.payload, loading: false};
        case 'signin':
            return {errorMessage: '', token: action.payload, loading: false};
        case 'signout':
            return {errorMessage: '', token: null};
        case 'clear_error_message':
            return {...state, errorMessage: '', loading: false};
        default:
            return state;
    }

}

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if(token){
        dispatch({ type: 'signin', payload: token });
        navigate('TrackList');
    } else {
        navigate('loginFlow');
    }
}


const signin = (dispatch) =>  ({username, password}) => {
    dispatch({type: 'loading'});

    const headers = {
        'Content-Type': 'application/json',
        'Accept-Language': 'es-ES,es;q=0.8',
      };
    axios.post('https://cies.tech/core/login_token/', { //send the login to the server
        username: username,
        password: password
    }, {headers})
    .then(res => {
        const token = res.data.token;
        const name = res.data.name;
        const last_name = res.data.last_name;
        const user_id = res.data.user_id;
        const company_id = res.data.company;
        const seat_id = res.data.seat;
        const company_name = res.data.company_name;
        const seat_name = res.data.seat_name;
        const type = res.data.type; 

        AsyncStorage.setItem('token', token);
        dispatch({type: 'signin', payload: res.data.token});

        navigate('TrackList');

        // localStorage.setItem('token', token);
        // localStorage.setItem('expirationDate', expirationDate);
        // localStorage.setItem('name', name);
        // localStorage.setItem('last_name', last_name);
        // localStorage.setItem('user_id', user_id);
        // localStorage.setItem('company_id', company_id);
        // localStorage.setItem('seat_id', seat_id);
        // localStorage.setItem('company_name', company_name);
        // localStorage.setItem('seat_name', seat_name);
        // localStorage.setItem('type', type);

        // dispatch(authSuccess(token, name, last_name));
        // dispatch(checkAuthTimeout(3600));
    })
    .catch(err => {
        let errorMessage = null;
        if(err.response.data.non_field_errors || err.response.data.password){
            errorMessage = 'Las credenciales ingresadas son incorrectas';
        }
        else{
            errorMessage = "Ha ocurrido un error " + err.message;
        }


        dispatch({type: 'add_error', payload: errorMessage});
    })


}


const signout = dispatch => async() =>{
    await AsyncStorage.removeItem('token');
    dispatch({type: 'signout'});
    navigate('loginFlow');
};

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'})
};

export const { Provider, Context } = createDataContext(
    authReducer,
    {signin, signout, clearErrorMessage, tryLocalSignin},
    {token: null, errorMessage: '', loading: false}
);