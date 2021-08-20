import * as ActionTypes from '../ActionTypes';

export const Customer = (state = { 
    isLoading: true,
    errMess: null,
    customer:[]
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_Customer:
            return {...state, isLoading: false, errMess: null, customer: action.payload};

        case ActionTypes.Customer_LOADING:
            return {...state, isLoading: true, errMess: null, customer: []}

        case ActionTypes.Customer_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};