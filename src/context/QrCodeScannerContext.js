import { AsyncStorage } from 'react-native';

import {navigate} from '../navigationRef';
import createDataContext from './createDataContext';
import backendUrl from "../variables/backendURL.js"

import axios from 'axios';


const authReducer = (state, action) => {
    switch (action.type) {
        case 'saveCode':
            return {qrCodeHash: action.payload};
        case 'deleteCode':
                return {qrCodeHash: ''};
        default:
            return state;
    }
}

const saveQrCodeHash = dispatch => (qrHash) => {
    dispatch({type: 'saveCode', payload: qrHash})
};

const deleteQrCodeHash = dispatch => () => {
    dispatch({type: 'deleteCode'})
};

export const { Provider, Context } = createDataContext(
    authReducer,
    {saveQrCodeHash},
    {qrCodeHash: '', }
);