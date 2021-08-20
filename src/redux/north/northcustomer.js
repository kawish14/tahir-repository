import * as ActionTypes from '../ActionTypes';

export const NorthCustomer = (state = { 
    isLoading: true,
    errMess: null,
    northCustomer:[]
}, action) => {
    switch (action.type) {
        case ActionTypes.NORTH_ADD_Customer:
            return {...state, isLoading: false, errMess: null, northCustomer: action.payload};

        case ActionTypes.NORTH_Customer_LOADING:
            return {...state, isLoading: true, errMess: null, northCustomer: []}

        case ActionTypes.NORTH_Customer_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};