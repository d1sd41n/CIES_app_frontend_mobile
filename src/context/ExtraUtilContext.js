import { AsyncStorage } from 'react-native';

import {navigate} from '../navigationRef';
import createDataContext from './createDataContext';
import backendUrl from "../variables/backendURL.js"

import axios from 'axios';


const authReducer = (state, action) => {
    switch (action.type) {
        case 'saveCode':
            return {...state, qrCodeHash: action.payload, qrScanned: true};
        case 'deleteCode':
            return {...state, qrCodeHash: '', qrScanned: false};
        case 'saveVisitor':
            return {...state, visitorData: action.payload};
        case 'delVisitor':
            return {...state, visitorData: null};
        case 'setTypeScan':
            return {...state, typeScan: action.payload};
        case 'setScannedTrue':
            return {...state, qrScanned: true};
        case 'saveData':
            return {...state, data: action.payload};
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

const setTypeScan = dispatch => (type = null) => {
    dispatch({type: 'setTypeScan', payload: type})
};

const setScannedTrue = dispatch => (type = null) => {
    dispatch({type: 'setScannedTrue'})
};

const delVisitorData = dispatch => (visitorData) => {
    dispatch({type: 'delVisitor'})
};

const saveData = dispatch => (Data) => {
    dispatch({type: 'saveData', payload: Data})
};


export const { Provider, Context } = createDataContext(
    authReducer,
    {saveQrCodeHash, saveVisitorData, deleteQrCodeHash,
     setTypeScan, delVisitorData, saveData},
    {qrCodeHash: '',
    typeScan: null,
    qrScanned: false,

    visitorData: null,
    data: null,
    }
);