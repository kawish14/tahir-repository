import * as ActionTypes from '../ActionTypes';

export const CenterCustomer = (state = { 
    isLoading: true,
    errMess: null,
    centerCustomer:[]
}, action) => {
    switch (action.type) {
        case ActionTypes.CENTER_ADD_Customer:
            return {...state, isLoading: false, errMess: null, centerCustomer: action.payload};

        case ActionTypes.CENTER_Customer_LOADING:
            return {...state, isLoading: true, errMess: null, centerCustomer: []}

        case ActionTypes.CENTER_Customer_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};