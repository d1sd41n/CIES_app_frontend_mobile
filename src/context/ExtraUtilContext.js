import { AsyncStorage } from 'react-native';

import {navigate} from '../navigationRef';
import createDataContext from './createDataContext';
import backendUrl from "../variables/backendURL.js"

import axios from 'axios';


const authReducer = (state, action) => {
    switch (action.type) {
        case 'saveCode':
            return {...state, qrCodeHash: action.payload};
        case 'deleteCode':
            return {...state, qrCodeHash: ''};
        case 'saveVisitor':
            return {...state, visitorData: action.payload};
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

const saveVisitorData = dispatch => (visitorData) => {
    dispatch({type: 'saveVisitor', payload: visitorData})
};


export const { Provider, Context } = createDataContext(
    authReducer,
    {saveQrCodeHash, saveVisitorData, deleteQrCodeHash},
    {qrCodeHash: '',
    visitorData: null}
);