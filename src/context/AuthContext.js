import { AsyncStorage } from 'react-native';

import {navigate} from '../navigationRef';
import createDataContext from './createDataContext';

import axios from 'axios';


const authReducer = (state, action) => {
    switch (action.type) {
        case 'loading':
            return {...state, loading: true, errorMessage: ''};
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
        navigate('visitorRegister');
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
    axios.post('http://YOUR_DOMAIN_BACKEND/core/login_token/', { //send the login to the server
        username: username,
        password: password
    }, {headers})
    .then(res => {
        const token = res.data.token;
        const name = res.data.name;
        const last_name = res.data.last_name;
        const user_id = res.data.user_id.toString();
        const company_id = res.data.company.toString();
        const seat_id = res.data.seat.toString();
        const company_name = res.data.company_name;
        const seat_name = res.data.seat_name;
        const type = res.data.type;

        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('name', name);
        AsyncStorage.setItem('last_name', last_name);
        AsyncStorage.setItem('user_id', user_id);
        AsyncStorage.setItem('company_id', company_id);
        AsyncStorage.setItem('seat_id', seat_id);
        AsyncStorage.setItem('company_name', company_name);
        AsyncStorage.setItem('seat_name', seat_name);
        AsyncStorage.setItem('type', type);

        dispatch({type: 'signin', payload: res.data.token});

        navigate('visitorRegister');
    })
    .catch(err => {
        let errorMessage = null;
        if (err.response){
            if(err.response.data.non_field_errors || err.response.data.password)
                errorMessage = 'Las credenciales ingresadas son incorrectas';
        }

        else if(err.message == "Network Error"){
            errorMessage = "Ojo, no hay coneccion a internet";
        }
        else
            errorMessage = "Ha ocurrido un error | " + err.message + " |";

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