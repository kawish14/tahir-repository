import {createStore, combineReducers,applyMiddleware} from 'redux';
import { Customer } from './south/customer';
import { CenterCustomer } from './central/centercustomer';
import {NorthCustomer} from './north/northcustomer'
import {AlarmInfo} from './alarmInfo/alarmInfo'
import{loginRole} from './mainReducer/login'
import thunk from 'redux-thunk';
import logger from 'redux-logger';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            customer: Customer,
            centerCustomer:CenterCustomer,
            northCustomer:NorthCustomer,
            login:loginRole,
            alarmInfo:AlarmInfo
        }),
        applyMiddleware(thunk, logger)
    );

    return store
}